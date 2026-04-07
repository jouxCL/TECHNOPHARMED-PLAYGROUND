import { SignJWT } from "jose";

export async function appendToSheet(data: any, env: any) {
  // Verificar variables de entorno
  if (!env.GOOGLE_SHEET_ID || !env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
    console.error('ERROR: Variables de entorno de Google Sheets no configuradas.');
    console.error('GOOGLE_SHEET_ID:', !!env.GOOGLE_SHEET_ID);
    console.error('GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.error('GOOGLE_PRIVATE_KEY:', !!env.GOOGLE_PRIVATE_KEY);
    throw new Error('Configuración de Google Sheets incompleta');
  }

  const SHEET_ID = env.GOOGLE_SHEET_ID;
  const CLIENT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;

  // Debug: Verificar formato de la clave
  console.log('Clave privada recibida (primeros 100 chars):', PRIVATE_KEY.substring(0, 100));
  console.log('¿Contiene \\n?:', PRIVATE_KEY.includes('\\n'));
  console.log('¿Contiene saltos de línea reales?:', PRIVATE_KEY.includes('\n'));

  // Reemplazar \n por saltos de línea reales si es necesario
  if (PRIVATE_KEY.includes('\\n')) {
    PRIVATE_KEY = PRIVATE_KEY.replace(/\\n/g, "\n");
  }

  // JWT Logic (Web Crypto API compliant)
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  let cleanKey = PRIVATE_KEY.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
  
  // Debug: Verificar clave limpia
  console.log('Clave limpia (primeros 50 chars):', cleanKey.substring(0, 50));
  
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

  // Get Access Token
  console.log('Generando JWT...');
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  
  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    console.error('Error obteniendo token de acceso:', errorText);
    throw new Error(`Error de autenticación con Google: ${tokenRes.status}`);
  }
  
  const tokenData = await tokenRes.json();
  const { access_token } = tokenData;
  
  if (!access_token) {
    console.error('No se recibió access_token:', tokenData);
    throw new Error('No se pudo obtener token de acceso de Google');
  }

  console.log('Token obtenido, enviando datos a Sheets...');
  
  // Append row
  const sheetsResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${access_token}`, 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      requests: [
        { 
          insertDimension: { 
            range: { sheetId: 0, dimension: "ROWS", startIndex: 1, endIndex: 2 }, 
            inheritFromBefore: false 
          } 
        },
        { 
          updateCells: { 
            range: { sheetId: 0, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 4 },
            rows: [{ values: [
              { userEnteredValue: { stringValue: data.name } },
              { userEnteredValue: { stringValue: data.email } },
              { userEnteredValue: { stringValue: data.phone || '' } },
              { userEnteredValue: { stringValue: data.message } },
            ]}],
            fields: "userEnteredValue"
          }
        }
      ]
    })
  });

  if (!sheetsResponse.ok) {
    const sheetsError = await sheetsResponse.text();
    console.error('Error de Google Sheets:', sheetsError);
    throw new Error(`Error de Google Sheets: ${sheetsResponse.status}`);
  }

  console.log('Datos guardados exitosamente en Google Sheets');
}
