import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'

// Desactivar el bodyParser por defecto de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' })
  }

  try {
    // Crear cliente Supabase Admin con service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Variables de entorno faltantes')
      return res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor'
      })
    }

    // Parsear FormData
    const form = formidable({
      maxFiles: 2,
      maxFileSize: 5 * 1024 * 1024, // 5MB por archivo
      multiples: true,
    })

    const [fields, files] = await form.parse(req)
    
    // Obtener el token de autorización del header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de autorización requerido' 
      })
    }

    const token = authHeader.split('Bearer ')[1]

    // Verificar el token con Supabase Admin
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Error de autenticación:', authError)
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      })
    }

    console.log('Usuario autenticado:', user.email)

    // Obtener datos de la demanda
    const demandData = JSON.parse(fields.demandData?.[0] || '{}')
    const imageFiles = files.images || []

    console.log('Datos recibidos:', {
      demandData,
      imageCount: imageFiles.length
    })

    const {
      empresa,
      responsable_solicitud,
      email_contacto,
      telefono,
      id_categoria,
      detalle,
      pais_id,
      rubro,
    } = demandData

    let categoria_id
    let rubro_id

    // Procesar categoría
    if (isNaN(Number(id_categoria))) {
      const { data: newCategoria, error: newCategoriaError } = await supabaseAdmin
        .from("categorias")
        .insert({ categoria: id_categoria })
        .select("id")
        .single()

      if (newCategoriaError) {
        console.error("Error creating categoria:", newCategoriaError)
        return res.status(400).json({
          success: false, 
          message: `Error creando categoría: ${newCategoriaError.message}`
        })
      }
      categoria_id = newCategoria.id
    } else {
      categoria_id = id_categoria
    }

    // Procesar rubro
    if (isNaN(Number(rubro))) {
      const { data: newRubro, error: newRubroError } = await supabaseAdmin
        .from("rubros")
        .insert({ 
          nombre: rubro, 
          categoria_id: categoria_id
        })
        .select("id")
        .single()

      if (newRubroError) {
        console.error("Error creating rubro:", newRubroError)
        return res.status(400).json({
          success: false, 
          message: `Error creando rubro: ${newRubroError.message}`
        })
      }
      rubro_id = newRubro.id
    } else {
      rubro_id = rubro
    }

    // Insertar la demanda
    const { data: demand, error: demandaError } = await supabaseAdmin
      .from("demandas")
      .insert({
        empresa,
        responsable_solicitud,
        email_contacto,
        telefono,
        id_categoria: categoria_id,
        pais_id,
        detalle,
        profile_id: user.id,
        rubro_id,
        estado: "pendiente",
      })
      .select("id")
      .single()

    if (demandaError) {
      console.error("Error creating demand:", demandaError)
      return res.status(400).json({
        success: false, 
        message: `Error creando demanda: ${demandaError.message}`
      })
    }

    const demandId = demand.id
    console.log('Demanda creada con ID:', demandId)

    // Subir imágenes si existen
    const uploadedImages = []
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i]
        
        const fileName = `image_${Date.now()}_${i}.${getFileExtension(imageFile.originalFilename || 'jpg')}`
        const filePath = `${demandId}/${fileName}`

        console.log('Subiendo imagen:', fileName)

        // Leer el archivo temporal
        const fileBuffer = fs.readFileSync(imageFile.filepath)

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('demandas')
          .upload(filePath, fileBuffer, {
            contentType: imageFile.mimetype || 'image/jpeg'
          })

        if (uploadError) {
          console.error('Error subiendo imagen:', uploadError)
          continue
        }

        // Obtener URL pública
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('demandas')
          .getPublicUrl(filePath)

        uploadedImages.push({
          fileName,
          filePath,
          publicUrl: publicUrlData.publicUrl,
          size: imageFile.size,
          type: imageFile.mimetype
        })

        // Limpiar archivo temporal
        fs.unlinkSync(imageFile.filepath)
      }
    }

    return res.status(200).json({
      success: true,
      message: "Demanda creada correctamente.",
      demandId: demandId,
      uploadedImages: uploadedImages,
      imagesCount: uploadedImages.length
    })

  } catch (error) {
    console.error('Error en API:', error)
    return res.status(500).json({
      success: false, 
      message: 'Error interno del servidor'
    })
  }
}

// Función para obtener extensión del archivo
function getFileExtension(filename: string): string {
  return filename.split('.').pop() || 'jpg'
}
