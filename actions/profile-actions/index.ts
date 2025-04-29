"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: FormData): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, message: "Usuario no autenticado" };
  }

  // Procesar categoría
  let categoria_id = formData.get("id_categoria") as string;
  if (categoria_id && isNaN(Number(categoria_id))) {
    const { data: newCategoria, error: newCategoriaError } = await supabase
      .from("categorias")
      .insert({ categoria: categoria_id })
      .select("id")
      .single();

    if (newCategoriaError) {
      return { success: false, message: newCategoriaError.message };
    }

    categoria_id = newCategoria.id;
  }

  // Procesar rubro
  let rubro = formData.get("rubro") as string;
  let rubro_id = rubro;
  if (rubro && isNaN(Number(rubro))) {
    const { data: newRubro, error: newRubroError } = await supabase
      .from("rubros")
      .insert({ nombre: rubro, categoria_id: categoria_id })
      .select("id")
      .single();

    if (newRubroError) {
      return { success: false, message: newRubroError.message };
    }

    rubro_id = newRubro.id;
  }

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
    id_categoria: categoria_id,
    rubro_id: rubro_id,
  };

  try {
    const { error } = await supabase
      .from("profile")
      .update(updates)
      .eq("id", user?.id);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al actualizar perfil",
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


export async function getCategorias() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categorias") // Nombre de la tabla en tu base de datos
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}


export async function getRubros() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rubros") // Nombre de la tabla en tu base de datos
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}
