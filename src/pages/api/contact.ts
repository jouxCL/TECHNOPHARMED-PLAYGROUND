import type { APIRoute } from 'astro';
import { appendToSheet } from '../../utils/google-sheets';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any).runtime?.env || import.meta.env;
    const { name, email, phone, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios: nombre, email o mensaje" }), { status: 400 });
    }

    // Sanitización básica
    const sanitizedName = name.toString().trim().substring(0, 100);
    const sanitizedEmail = email.toString().trim().toLowerCase().substring(0, 100);
    const sanitizedPhone = phone ? phone.toString().trim().substring(0, 20) : '';
    const sanitizedMessage = message.toString().trim().substring(0, 1000);

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return new Response(JSON.stringify({ error: "Formato de email inválido" }), { status: 400 });
    }

    // Validación de longitud
    if (sanitizedName.length < 2) {
      return new Response(JSON.stringify({ error: "El nombre debe tener al menos 2 caracteres" }), { status: 400 });
    }

    if (sanitizedMessage.length < 10) {
      return new Response(JSON.stringify({ error: "El mensaje debe tener al menos 10 caracteres" }), { status: 400 });
    }

    // Guardar en Sheets
    await appendToSheet({ 
      name: sanitizedName, 
      email: sanitizedEmail, 
      phone: sanitizedPhone, 
      message: sanitizedMessage 
    }, runtimeEnv);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error en el endpoint de contacto:", error);
    
    // Mensajes de error más específicos
    let errorMessage = "Error interno del servidor";
    if (error.message.includes("Google") || error.message.includes("sheet")) {
      errorMessage = "Error al guardar en la base de datos. Por favor intente más tarde.";
    } else if (error.message.includes("network") || error.message.includes("fetch")) {
      errorMessage = "Error de conexión. Verifique su conexión a internet.";
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};
