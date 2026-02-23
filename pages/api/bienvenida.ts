// pages/api/bienvenida.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Faltan datos del usuario' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.error('Faltan configurar las credenciales de Gmail.');
    return res.status(500).json({ message: 'Error de configuración del servidor' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Necesito Esto™" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '🎉 ¡Bienvenido a Necesito Esto™!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Bienvenido a Necesito Esto!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
        
        <!-- Contenedor principal -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f9fc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <!-- Tarjeta principal -->
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); overflow: hidden;">
                
                <!-- Header con gradiente y texto del logo -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                    
                    <!-- TEXTO DEL LOGO ESTILIZADO (SIN IMAGEN) -->
                    <div style="margin-bottom: 20px;">
                      <span style="font-size: 48px; font-weight: 800; letter-spacing: -1px; display: inline-block;">
                        <span style="color: #ffffff;">Necesito</span>
                        <span style="color: #ffffff; position: relative; display: inline-block; margin-left: 4px;">
                          <span style="color: #ffffff; position: relative; z-index: 10;">Esto!</span>
                        </span>
                      </span>
                    </div>
                    
                    <h1 style="color: #ffffff; margin: 10px 0 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px;">¡Bienvenido!</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px;">${nombre}, nos alegra tenerte</p>
                  </td>
                </tr>
                
                <!-- Contenido principal -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Mensaje de bienvenida -->
                    <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Hola ${nombre},</h2>
                    
                    <p style="color: #475569; line-height: 1.6; margin: 0 0 25px; font-size: 16px;">
                      ¡Gracias por unirte a <strong style="color: #2563eb;">Necesito Esto™</strong>! Estamos felices de tenerte a bordo y queremos que comiences con el pie derecho.
                    </p>
                    
                    <!-- Tarjeta de obsequio especial -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 20px; padding: 25px; margin-bottom: 30px;">
                      <tr>
                        <td>
                          <div style="text-align: center; margin-bottom: 15px;">
                            <span style="font-size: 48px;">🎁</span>
                          </div>
                          <h3 style="color: #0369a1; margin: 0 0 15px; font-size: 20px; text-align: center;">Tu obsequio especial de bienvenida</h3>
                          
                          <!-- Beneficios en tarjetas -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="48%" style="background-color: #ffffff; border-radius: 16px; padding: 20px;" align="center">
                                <div style="font-size: 32px; margin-bottom: 10px;">📢</div>
                                <h4 style="color: #0f172a; margin: 0 0 8px; font-size: 16px;">Publicación gratuita</h4>
                                <p style="color: #475569; margin: 0; font-size: 14px;">Todas tus demandas sin costo</p>
                              </td>
                              <td width="4%"></td>
                              <td width="48%" style="background-color: #ffffff; border-radius: 16px; padding: 20px;" align="center">
                                <div style="font-size: 32px; margin-bottom: 10px;">🤝</div>
                                <h4 style="color: #0f172a; margin: 0 0 8px; font-size: 16px;">Contacto ilimitado</h4>
                                <p style="color: #475569; margin: 0; font-size: 14px;">Conecta con clientes gratis</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Mensaje de oportunidad -->
                    <p style="color: #475569; line-height: 1.6; margin: 0 0 20px; font-size: 16px;">
                      Es una gran oportunidad para hacer crecer tu negocio y conectar con nuevos clientes de forma fácil y segura. 
                      Nuestra plataforma está diseñada para impulsar tu éxito.
                    </p>
                    
                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" 
                             style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1e40af); 
                                    color: #ffffff; text-decoration: none; padding: 16px 40px; 
                                    border-radius: 50px; font-weight: 600; font-size: 18px;
                                    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);">
                            🚀 Comenzar ahora
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Frase inspiradora -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left: 4px solid #2563eb; background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 30px 0;">
                      <tr>
                        <td>
                          <p style="color: #334155; font-style: italic; margin: 0; font-size: 16px;">
                            "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. 
                            Si amas lo que haces, tendrás éxito." - Albert Schweitzer
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Despedida -->
                    <p style="color: #475569; line-height: 1.6; margin: 30px 0 0; font-size: 16px;">
                      Desde ya, te deseamos mucho éxito en tu camino con nosotros.
                    </p>
                    
                    <p style="color: #475569; line-height: 1.6; margin: 20px 0 0; font-size: 16px;">
                      <em>El equipo de Necesito Esto™</em>
                    </p>
                    
                  </td>
                </tr>
                
                <!-- Footer con información de contacto -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 30px; border-top: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <!-- TEXTO DEL LOGO EN FOOTER (versión más pequeña) -->
                          <span style="font-size: 24px; font-weight: 700; color: #1e293b; letter-spacing: -0.5px;">
                            Necesito <span style="color: #2563eb;">Esto!</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="color: #64748b; font-size: 14px; line-height: 1.5;">
                          <p style="margin: 0 0 10px;">
                            📍 <a href="https://www.necesitoesto.com" style="color: #2563eb; text-decoration: none;">www.necesitoesto.com</a>
                          </p>
                          <p style="margin: 0 0 10px;">
                            📧 <a href="mailto:necesito.esto.2024@gmail.com" style="color: #2563eb; text-decoration: none;">necesito.esto.2024@gmail.com</a>
                          </p>
                          <p style="margin: 0;">
                            📱 Síguenos en redes
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="color: #94a3b8; font-size: 12px; padding-top: 20px; border-top: 1px solid #cbd5e1;">
                          <p style="margin: 0 0 5px;">
                            Por favor, no respondas este correo. Si tienes dudas, contáctanos al email de arriba.
                          </p>
                          <p style="margin: 0;">
                            © ${new Date().getFullYear()} Necesito Esto™. Todos los derechos reservados.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de bienvenida enviado a ${email}`);
    return res.status(200).json({ message: 'Correo de bienvenida enviado con éxito' });
  } catch (error) {
    console.error(`Error al enviar el correo de bienvenida:`, error);
    return res.status(500).json({ message: 'Error al enviar el correo de bienvenida', error });
  }
}
