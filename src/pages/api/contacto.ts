// src/pages/api/contacto.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  // 1. Recibimos los datos del formulario frontend
  const data = await request.formData();
  const name = data.get("name") as string;
  const phone = data.get("phone") as string; 
  const email = data.get("email") as string;
  const message = data.get("message") as string;

  // 2. Validación básica de seguridad
  if (!name || !email || !message || !phone) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400 },
    );
  }

  try {
    // 3. Enviamos el correo a través de Resend
    const data = await resend.emails.send({
      from: "KNARQ Web <hola@knarq.com>", // Cambia esto por hola@knarq.mx cuando verifiques tu dominio
      to: "geragnzv@gmail.com", // Tu correo donde quieres recibir los mensajes
      subject: `Nuevo proyecto de: ${name}`,
      html: `
        <h2>Nuevo contacto desde la página web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Telefono:</strong> ${phone}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/> ${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al enviar el correo" }),
      { status: 500 },
    );
  }
};
