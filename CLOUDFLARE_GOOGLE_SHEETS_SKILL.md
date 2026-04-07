# Skill: Cloudflare Pages + Google Sheets + Turnstile Integration

Este recurso proporciona una implementación robusta y paso a paso para conectar un formulario web (Astro/Cloudflare) con una hoja de cálculo de Google. Utiliza directamente la API REST de Google Sheets (sin librerías pesadas) y Cloudflare Turnstile para la seguridad.

## 1. Configuración en Google Cloud Platform (GCP)

### 1.1 Crear una Cuenta de Servicio
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto o selecciona uno existente.
3. Ve a **IAM y administración > Cuentas de servicio**.
4. Haz clic en **Crear cuenta de servicio**. Dale un nombre (ej. `sheets-bot`).
5. En el paso de "Otorgar acceso", puedes saltar los roles o dar "Editor" (aunque el compartido a nivel de hoja es preferible).
6. Una vez creada, haz clic en la cuenta y ve a la pestaña **Claves**.
7. Haz clic en **Agregar clave > Crear clave nueva > JSON**.
8. **Guarda este archivo de forma segura.** Necesitarás `client_email` y `private_key`.

### 1.2 Habilitar Google Sheets API
1. En la consola de GCP, ve a **APIs y servicios > Biblioteca**.
2. Busca "Google Sheets API" y haz clic en **Habilitar**.

---

## 2. Preparación de la Hoja de Google

1. **Crear la Hoja**: Crea una nueva Google Sheet.
2. **Nombre de la Pestaña**: Asegúrate de que la pestaña tenga un nombre exacto (ej. `Contact Form`).
3. **Compartir Acceso**: 
   - Abre el menú **Compartir** en la hoja de cálculo.
   - Agrega el `client_email` de tu archivo JSON como **Editor**.
4. **Obtener el ID de la Hoja**: 
   - Extrae el ID de la URL: `https://docs.google.com/spreadsheets/d/ID_DE_LA_HOJA/edit`.

---

## 3. Seguridad: Configuración de Cloudflare Turnstile

1. Ve al **Dashboard de Cloudflare** > **Turnstile**.
2. Agrega un nuevo sitio. Configura el dominio (o `localhost` para pruebas).
3. Obtén tu **Site Key** (público) y **Secret Key** (secreto).

---

## 4. Variables de Entorno

Configúralas en tu `.env` (local) y en **Cloudflare Pages > Settings > Environment Variables** (producción).

| Variable | Descripción | Seguridad |
| :--- | :--- | :--- |
| `GOOGLE_SHEET_ID` | El ID extraído de la URL de la hoja. | Plain/Encrypted |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | El `client_email` del archivo JSON. | Encrypted |
| `GOOGLE_PRIVATE_KEY` | El `private_key` del archivo JSON (completo). | Encrypted |
| `TURNSTILE_SECRET_KEY` | El Secret Key de Turnstile. | Encrypted |
| `PUBLIC_TURNSTILE_SITE_KEY` | El Site Key de Turnstile. | Plain Text |

> [!IMPORTANT]
> Al agregar `GOOGLE_PRIVATE_KEY` en Cloudflare, asegúrate de incluir todo el string, incluyendo los bloques `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`.

---

## 5. Implementación: La Lógica (Astro / TypeScript)

### 5.1 Utilidad: `src/utils/google-sheets.ts`
Esta utilidad maneja la firma del JWT (usando la librería ligera `jose`) y las llamadas a la API REST.

```typescript
import { SignJWT } from "jose";

export async function appendToSheet(data: any, env: any) {
  const SHEET_ID = env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

  // Lógica de JWT (Compatible con Web Crypto API de Cloudflare)
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  let cleanKey = PRIVATE_KEY.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(cleanKey), c => c.charCodeAt(0));
  
  const privateKey = await crypto.subtle.importKey(
    "pkcs8", binaryDer, 
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, 
    false, ["sign"]
  );

  const jwt = await new SignJWT({
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);

  // Obtener Access Token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenRes.json();

  // Insertar Fila en el Índice 1 (Fila 2 de la tabla)
  // Esto mantiene los nuevos registros siempre arriba.
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        { 
          insertDimension: { 
            range: { sheetId: 0, dimension: "ROWS", startIndex: 1, endIndex: 2 }, 
            inheritFromBefore: false // Hereda estilo de la fila de abajo (no negrita)
          } 
        },
        { 
          updateCells: { 
            range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 5 },
            rows: [{ values: [
              { userEnteredValue: { stringValue: data.name } },
              { userEnteredValue: { stringValue: data.email } },
              { userEnteredValue: { stringValue: data.message } }
            ]}],
            fields: "userEnteredValue"
          }
        }
      ]
    })
  });
}
```

### 5.2 Endpoint API: `src/pages/api/contact.ts`
El servidor valida el CAPTCHA antes de guardar en Google.

```typescript
export const POST: APIRoute = async ({ request, locals }) => {
  const runtimeEnv = (locals as any).runtime?.env || import.meta.env;
  const { name, email, message, 'cf-turnstile-response': token } = await request.json();

  // 1. Verificar Turnstile (Backend)
  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: `secret=${runtimeEnv.TURNSTILE_SECRET_KEY}&response=${token}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  const { success } = await verify.json();
  if (!success) return new Response(JSON.stringify({ error: "Captcha Inválido" }), { status: 400 });

  // 2. Guardar en Sheets
  await appendToSheet({ name, email, message }, runtimeEnv);
  return new Response(JSON.stringify({ success: true }));
};
```

---

## 6. Frontend: `src/pages/contact.astro`

### Estrategia de Renderizado Explícito
Astro carga los scripts como módulos diferidos. Para asegurar que Turnstile cargue bien:

```html
<!-- Script inline para definir el callback ANTES de cargar la API -->
<script is:inline define:vars={{ SITE_KEY }}>
  window.onloadTurnstileCallback = function() {
    window.turnstile.render('#captcha-container', { sitekey: SITE_KEY, theme: 'dark' });
  };
</script>

<!-- Carga de la API de Turnstile -->
<script is:inline src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit" async defer></script>
```

---

## 7. Solución de Problemas Comunes

- **Error 403 Forbidden**: Asegúrate de haber compartido la hoja con el email de la cuenta de servicio como "Editor".
- **JWT Inválido**: Generalmente por el formato de la `PRIVATE_KEY`. Utiliza `.replace(/\\n/g, "\n")` para corregir escapes literales.
- **Fila en Blanco / Estilo Incorrecto**: El uso de `inheritFromBefore: false` en `insertDimension` obliga a la nueva fila a copiar el formato de la fila de abajo (normal) en lugar del encabezado (negrita).
- **Turnstile no aparece**: Verifica que el dominio esté autorizado en el panel de Cloudflare.
