export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }

    const data = await resend.emails.send({
      from: "KNARQ Web <hola@knarq.com>", 
      to: "knarq.proyectos@gmail.com", 
      subject: `Nuevo proyecto de: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1B1C; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <div style="border-bottom: 1px solid #E5E7EB; padding-bottom: 24px; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 0.3em; margin: 0; color: #1A1B1C;">KNARQ_</h1>
            <p style="font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.2em; margin-top: 8px;">Nuevo Contacto Web</p>
          </div>
          
          <div style="background-color: #F9FAFB; padding: 32px; border-radius: 8px;">
            
            <p style="margin-top: 0; margin-bottom: 20px;">
              <strong style="font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9CA3AF;">Nombre del prospecto</strong><br/> 
              <span style="font-size: 18px; color: #1A1B1C;">${name}</span>
            </p>
            
            <div style="margin-bottom: 24px;">
              <strong style="font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9CA3AF;">Datos de contacto</strong><br/> 
              <a href="mailto:${email}" style="color: #1A1B1C; text-decoration: none; display: block; margin-top: 4px;">✉️ ${email}</a>
              <a href="tel:${phone}" style="color: #1A1B1C; text-decoration: none; display: block; margin-top: 4px;">📞 ${phone || 'No proporcionado'}</a>
            </div>
            
            <p style="margin-bottom: 8px;">
              <strong style="font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9CA3AF;">Detalles del proyecto</strong>
            </p>
            
            <div style="background-color: #FFFFFF; padding: 20px; border-left: 2px solid #1A1B1C; border-radius: 0 4px 4px 0;">
              <p style="margin: 0; font-style: italic; color: #374151; white-space: pre-wrap;">"${message}"</p>
            </div>

          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="font-size: 11px; color: #9CA3AF; letter-spacing: 0.05em;">Este mensaje fue enviado desde el formulario oficial de knarq.mx</p>
          </div>

        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  } catch (error) {
    console.error("Error en Resend:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
};