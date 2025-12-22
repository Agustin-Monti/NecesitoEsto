import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método no permitido' 
    });
  }

  const supabase = await createClient();

  try {
    // Parsear el cuerpo de la solicitud
    const { demanda_id, correo_pagador, nombre_pagador } = req.body;

    if (!demanda_id || !correo_pagador || !nombre_pagador) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos necesarios.'
      });
    }

    // Obtener los datos de la demanda desde Supabase
    const { data: demanda, error } = await supabase
      .from('demandas')
      .select('*')
      .eq('id', demanda_id)
      .single();

    if (error || !demanda) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la demanda.'
      });
    }

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Crear y enviar el correo al pagador
    const mailResponse = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: correo_pagador,
      subject: `Detalles de la demanda: ${demanda.titulo}`,
      text: `Hola ${nombre_pagador},\n\nAquí están los detalles de la demanda:\n\n${JSON.stringify(
        demanda,
        null,
        2
      )}\n\nGracias por usar nuestro servicio.`,
    });

    return res.status(200).json({
      success: true,
      message: 'Correo enviado correctamente.',
      emailResponse: mailResponse,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error en el servidor.'
    });
  }
}