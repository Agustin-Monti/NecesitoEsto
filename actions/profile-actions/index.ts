"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: FormData): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();

  // Obtener el usuario actual desde la sesión
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    const errorMsg = "Usuario no autenticado";
    console.error("Error fetching user:", userError);
    return { success: false, message: errorMsg };
  }

  // Extraer los datos del formulario
  const updates = {
    nombre: formData.get("nombre") as string,
    apellido: formData.get("apellido") as string,
    provincia: formData.get("provincia") as string,
    municipio: formData.get("municipio") as string,
    localidad: formData.get("localidad") as string,
    codigo_postal: formData.get("codigo_postal") as string,
    direccion: formData.get("direccion") as string,
    telefono: formData.get("telefono") as string,
    empresa: formData.get("empresa") as string,
    pais_id: formData.get("pais_id") as string,
  };

  try {
    // Actualizar el perfil del usuario
    const { error } = await supabase
      .from("profile")
      .update(updates)
      .eq("id", user?.id);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: error.message };
    }

    console.log("Perfil actualizado con éxito");
    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Error desconocido al actualizar perfil" 
    };
  }
}

export async function getPaises() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pais") // Nombre de la tabla en tu base de datos
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}


export const fetchProfile = async (userId: string) => {
  // Usa await para resolver el Promise y obtener el cliente de Supabase
  const supabase = await createClient();

  try {
    // Obtener los datos del perfil
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw new Error("No se pudo obtener el perfil");
  }
};
