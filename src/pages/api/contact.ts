import type { APIRoute } from 'astro';
import { appendToSheet } from '../../utils/google-sheets';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any).runtime?.env || import.meta.env;
    const { name, email, phone, message } = await request.json();

    // Validacion basica
    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }

    // Guardar en Sheets
    await appendToSheet({ name, email, phone, message }, runtimeEnv);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error en el endpoint de contacto:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
