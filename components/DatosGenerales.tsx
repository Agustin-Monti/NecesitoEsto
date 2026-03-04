"use client";

import { useState, useEffect } from "react";
import { updateProfileAction } from "@/actions/profile-actions";
import { createClient } from "@/utils/supabase/client";
import Alerta from "@/components/Alerta";

interface Profile {
  id?: string;
  nombre: string;
  apellido: string;
  provincia: string;
  municipio: string;
  localidad: string;
  direccion: string;
  codigo_postal: string;
  created_at: string;
  telefono: string;
  empresa: string; 
  pais_id: string; 
  id_categoria: string;
  rubro_id: string;
}

interface DatosGeneralesProps {
  data: Profile;
}

const DatosGenerales: React.FC<DatosGeneralesProps> = ({ data }) => {
  const sanitizedData = {
    ...data,
    pais_id: data.pais_id ?? "",
    id_categoria: data.id_categoria ?? "", 
    rubro_id: data.rubro_id ?? "",
    provincia: data.provincia ?? "",
    municipio: data.municipio ?? "",
    localidad: data.localidad ?? "",
    direccion: data.direccion ?? "",
    codigo_postal: data.codigo_postal ?? "",
    telefono: data.telefono ?? "",
    empresa: data.empresa ?? "",
  };

  const [profile, setProfile] = useState<Profile>(sanitizedData);
  const [alerta, setAlerta] = useState<{
    visible: boolean;
    tipo: 'success' | 'error' | 'warning' | 'info';
    mensaje: string;
  }>({
    visible: false,
    tipo: 'success',
    mensaje: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formattedFecha, setFormattedFecha] = useState<string>("");
  const [paises, setPaises] = useState<{ id: string; nombre: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: string; categoria: string }[]>([]);
  const [rubros, setRubros] = useState<{ id: string; nombre: string }[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [mostrarInputCategoria, setMostrarInputCategoria] = useState(false);
  const [nuevoRubro, setNuevoRubro] = useState("");
  const [mostrarInputRubro, setMostrarInputRubro] = useState(false);
  const [nuevoPais, setNuevoPais] = useState("");
  const [mostrarInputPais, setMostrarInputPais] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormattedFecha(formatFecha(profile.created_at));
  }, [profile.created_at]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("pais").select("id, nombre");
        if (!error) setPaises(data || []);
      } catch (err: any) {
        console.error("Error al obtener países:", err.message);
      }
    };

    const fetchCategorias = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("categorias").select("id, categoria");
        if (!error) setCategorias(data || []);
      } catch (err: any) {
        console.error("Error al obtener categorias:", err.message);
      }
    };

    const fetchRubros = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("rubros").select("id, nombre");
        if (!error) setRubros(data || []);
      } catch (err: any) {
        console.error("Error al obtener rubros:", err.message);
      }
    };
  
    fetchPaises();
    fetchCategorias();
    fetchRubros();
  }, []);

  const mostrarAlerta = (tipo: 'success' | 'error' | 'warning' | 'info', mensaje: string) => {
    setAlerta({ visible: true, tipo, mensaje });
  };

  const ocultarAlerta = () => {
    setAlerta(prev => ({ ...prev, visible: false }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const supabase = createClient();

      if (mostrarInputPais && nuevoPais.trim() !== "") {
        const { data: nuevoPaisData, error: errorInsertPais } = await supabase
          .from("pais")
          .insert({ nombre: nuevoPais.trim() })
          .select("id")
          .single();

        if (errorInsertPais) {
          mostrarAlerta('error', "Error al insertar nuevo país: " + errorInsertPais.message);
          return;
        }
        setProfile((prev) => ({ ...prev, pais_id: nuevoPaisData.id }));
      }

      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key !== "fecha_creacion" && key !== "id") formData.append(key, value as string);
      });

      if (mostrarInputCategoria) formData.append("nueva_categoria", nuevaCategoria);
      if (mostrarInputRubro) formData.append("nuevo_rubro", nuevoRubro);

      const result = await updateProfileAction(formData);

      if (result.success) {
        mostrarAlerta('success', 'Perfil actualizado exitosamente');
      } else {
        mostrarAlerta('error', result.message || "Error al actualizar el perfil");
      }
    } catch (err: any) {
      mostrarAlerta('error', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const formatFecha = (fecha: string | undefined | null): string => {
    if (!fecha) return "Fecha no disponible";
    try {
      const fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) return "Fecha inválida";
      const dia = fechaObj.getUTCDate().toString().padStart(2, "0");
      const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0");
      const anio = fechaObj.getUTCFullYear();
      return `${dia}/${mes}/${anio}`;
    } catch (error) {
      return "Fecha inválida";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alerta */}
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        visible={alerta.visible}
        onClose={ocultarAlerta}
        autoCerrar={true}
        duracion={5000}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mt-16">
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Datos Generales</h1>
          <p className="text-gray-600">Actualiza tu información personal y profesional</p>
        </div>

        {/* Alertas */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Perfil actualizado con éxito
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                  Información Personal
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={profile.nombre}
                      onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      value={profile.apellido}
                      onChange={(e) => setProfile({ ...profile, apellido: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu apellido"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="text"
                      value={profile.telefono}
                      onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>
              </div>

              {/* Información Profesional */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                  Información Profesional
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <input
                      type="text"
                      value={profile.empresa}
                      onChange={(e) => setProfile({ ...profile, empresa: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                    <select
                      value={profile.pais_id}
                      onChange={(e) => {
                        if (e.target.value === "nueva") {
                          setMostrarInputPais(true);
                          setProfile({ ...profile, pais_id: "" });
                        } else {
                          setMostrarInputPais(false);
                          setProfile({ ...profile, pais_id: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Seleccione un país</option>
                      {paises.map((pais) => (
                        <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                      ))}
                      <option value="nueva">+ Agregar nuevo país</option>
                    </select>
                    {mostrarInputPais && (
                      <input
                        type="text"
                        value={nuevoPais}
                        onChange={(e) => setNuevoPais(e.target.value)}
                        placeholder="Ingresa el nuevo país"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                  Ubicación
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                    <input
                      type="text"
                      value={profile.provincia}
                      onChange={(e) => setProfile({ ...profile, provincia: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu provincia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Municipio</label>
                    <input
                      type="text"
                      value={profile.municipio}
                      onChange={(e) => setProfile({ ...profile, municipio: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu municipio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localidad</label>
                    <input
                      type="text"
                      value={profile.localidad}
                      onChange={(e) => setProfile({ ...profile, localidad: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu localidad"
                    />
                  </div>
                </div>
              </div>

              {/* Dirección y Categorías */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                  Detalles Adicionales
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={profile.direccion}
                      onChange={(e) => setProfile({ ...profile, direccion: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu dirección completa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                    <input
                      type="text"
                      value={profile.codigo_postal}
                      onChange={(e) => setProfile({ ...profile, codigo_postal: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tu código postal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select
                      value={profile.id_categoria}
                      onChange={(e) => {
                        if (e.target.value === "nueva") {
                          setMostrarInputCategoria(true);
                          setProfile({ ...profile, id_categoria: "" });
                        } else {
                          setMostrarInputCategoria(false);
                          setProfile({ ...profile, id_categoria: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias
                        .sort((a, b) => a.categoria.localeCompare(b.categoria))
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.categoria}</option>
                      ))}
                      <option value="nueva">+ Agregar nueva categoría</option>
                    </select>
                    {mostrarInputCategoria && (
                      <input
                        type="text"
                        placeholder="Nueva categoría"
                        value={nuevaCategoria}
                        onChange={(e) => setNuevaCategoria(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rubro</label>
                    <select
                      value={profile.rubro_id}
                      onChange={(e) => {
                        if (e.target.value === "nuevo") {
                          setMostrarInputRubro(true);
                          setProfile({ ...profile, rubro_id: "" });
                        } else {
                          setMostrarInputRubro(false);
                          setProfile({ ...profile, rubro_id: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Seleccione un rubro</option>
                      {rubros
                        .sort((a, b) => a.nombre.localeCompare(b.nombre))
                        .map((rubro) => (
                          <option key={rubro.id} value={rubro.id}>{rubro.nombre}</option>
                      ))}
                      <option value="nuevo">+ Agregar nuevo rubro</option>
                    </select>
                    {mostrarInputRubro && (
                      <input
                        type="text"
                        placeholder="Nuevo rubro"
                        value={nuevoRubro}
                        onChange={(e) => setNuevoRubro(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fecha de creación */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Creación
                  </label>
                  <p className="text-gray-600">{formattedFecha}</p>
                </div>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosGenerales;
