// pages/api/enviar-soporte.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { asunto, descripcion, email } = req.body;

  // Validación básica
  if (!asunto || !descripcion) {
    return res.status(400).json({ 
      message: 'Asunto y descripción son requeridos' 
    });
  }

  try {
    // Configurar el transporter de Nodemailer para Gmail
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
        auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
        },
    });

    // Verificar la configuración de conexión
    await transporter.verify();

    // Configurar el contenido del email
    const mailOptions = {
      from: `"Soporte Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Se envía a tu mismo email
      replyTo: email || process.env.GMAIL_USER, // Para que puedas responder directamente al usuario
      subject: `📧 Soporte: ${asunto}`,
      html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                        .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
                        .field { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }
                        .footer { margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 5px; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>🆕 Nueva Solicitud de Soporte</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <h3>👤 Información del Contacto</h3>
                            <p><strong>Email del usuario:</strong> ${email || 'No proporcionado'}</p>
                            <p><strong>Asunto:</strong> ${asunto}</p>
                            <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
                        </div>
                        
                        <div class="field">
                            <h3>📝 Descripción del Problema</h3>
                            <p style="white-space: pre-wrap; background: #f1f5f9; padding: 15px; border-radius: 5px; margin: 10px 0;">
                                ${descripcion}
                            </p>
                        </div>
                        
                        <div class="footer">
                            <p><strong>💡 Este email fue enviado automáticamente desde el formulario de soporte de tu sitio web.</strong></p>
                            <p>Puedes responder directamente a este email para contactar al usuario.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
      // También incluir versión de texto plano por si acaso
      text: `
            Nueva Solicitud de Soporte

            Información del Contacto:
            Email: ${email || 'No proporcionado'}
            Asunto: ${asunto}
            Fecha: ${new Date().toLocaleString('es-ES')}

            Descripción:
            ${descripcion}

            ---
            Este email fue enviado desde el formulario de soporte de tu sitio web.
         `
    };

    // Enviar el email
    const result = await transporter.sendMail(mailOptions);

    console.log('Email enviado:', result.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Solicitud enviada correctamente. Te contactaremos pronto.' 
    });

  } catch (error) {
    console.error('Error detallado enviando email:', error);
    
    // Mensaje de error más específico
    let errorMessage = 'Error al enviar la solicitud. Por favor, inténtalo de nuevo.';
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Error de configuración del email. Por favor, contacta al administrador.';
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }
    }

    res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
}