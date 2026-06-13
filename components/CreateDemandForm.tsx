"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getCategorias, getPaises, getRubros } from "@/actions/demanda-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { Alert } from "@/components/ui/alert";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { X, Upload, Image as ImageIcon } from "lucide-react";

// Carga dinámica del DatePicker para evitar problemas SSR
const DatePicker = dynamic(
  () => import('react-date-picker').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <input type="text" className="border p-2" disabled value="Cargando selector de fecha..." />
  }
);

type CreateDemandResponse = {
  success: boolean;
  message: string;
};

type ImageFile = {
  file: File;
  preview: string;
  id: string;
};

export function CreateDemandForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);
  const [rubros, setRubros] = useState<any[]>([]);
  const [demand, setDemand] = useState<any>({
    empresa: "",
    responsable_solicitud: "",
    email_contacto: "",
    telefono: "",
    fecha_inicio: "",
    fecha_vencimiento: "",
    detalle: "",
    profile_id: "",
    id_categoria: "",
    pais_id: "",
    rubro: "",
  });
  const [loading, setLoading] = useState(true);
  const [customCategoria, setCustomCategoria] = useState("");
  const [isCustomCategoria, setIsCustomCategoria] = useState(false);
  const [customRubro, setCustomRubro] = useState("");
  const [isCustomRubro, setIsCustomRubro] = useState(false);
  const [checkedTerminos, setCheckedTerminos] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Función para obtener la fecha actual en Argentina (solución directa)
  const obtenerFechaArgentina = () => {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    
    return `${año}-${mes}-${dia}`;
  };

  // Función para calcular fechas automáticamente
 

  useEffect(() => {
    console.log("Estado actualizado:", status, success);
  }, [status, success]);

  useEffect(() => {
    if (searchParams) {
      const statusParam = searchParams.get("status");
      const successParam = searchParams.get("success");

      if (statusParam && successParam) {
        setStatus(statusParam);
        setSuccess(decodeURIComponent(successParam));
      }
    }
  }, [searchParams]);

  // Cleanup de URLs de preview
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
  
      if (error) {
        return (
          <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
            {error.message}
          </div>
        );
      }
  
      if (user) {
        // 1. Obtener el perfil (incluyendo pais_id)
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();
  
        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setProfile(profileData || {});

          // Verificar el estado de los términos y condiciones
          const isTerminosAceptados = profileData?.terminos === true;
          setCheckedTerminos(isTerminosAceptados);

          // Calcular fechas automáticamente
  
          // 2. Obtener el nombre del país SOLO si el perfil tiene pais_id
          let nombrePais = "País no especificado";
          if (profileData?.pais_id) {
            const { data: paisData, error: paisError } = await supabase
              .from("pais")
              .select("nombre")
              .eq("id", profileData.pais_id)
              .single();
            
            if (!paisError && paisData) {
              nombrePais = paisData.nombre;
            }
          }
  
          // 3. Actualizar el estado "demand" con todos los datos
          setDemand((prev: any) => ({
            ...prev,
            profile_id: user.id,
            responsable_solicitud: `${profileData.nombre || ""} ${profileData.apellido || ""}`.trim(),
            email_contacto: profileData.email || "",
            telefono: profileData.telefono || "",
            empresa: profileData.empresa || "",
            pais_id: profileData.pais_id || "",
            nombre_pais: nombrePais,
          }));

        }
        setUser(user);
      }
      setLoading(false);
    };

    const fetchPaises = async () => {
      try {
        const paisesData = await getPaises();
        setPaises(paisesData);
      } catch (error) {
        console.error("Error al obtener países:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        const categoriasOrdenadas = categoriasData.sort((a, b) =>
          a.categoria.localeCompare(b.categoria)
        );
        setCategorias(categoriasOrdenadas);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    

    const fetchRubros = async () => {
      try {
        const rubrosData = await getRubros();
        const rubrosOrdenados = rubrosData.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setRubros(rubrosOrdenados);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    };
    

    fetchRubros();
    fetchPaises();
    fetchCategorias();
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Cargando formulario...</p>
          <p className="text-lg font-medium text-gray-600">No Podras Crear Una Demanda Si no tienes una cuenta e iniciado sesión.</p>
        </div>
      </div>
    );
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTerminos(e.target.checked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDemand((prev: any) => ({
      ...prev,
      [name]: name === "id_categoria" || name === "pais_id" ? parseInt(value) : value,
    }));
  };

  const handleDemandChange = (key: string, value: any) => {
    let formattedValue = value;

    if (value instanceof Date) {
      formattedValue = value.toISOString().split("T")[0];
    }

    setDemand((prev: any) => ({
      ...prev,
      [key]: formattedValue,
    }));
  };

  // Manejo de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      if (images.length + newImages.length >= 2) {
        setStatus("error");
        setSuccess("Máximo 2 imágenes permitidas");
        break;
      }

      const file = files[i];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setStatus("error");
        setSuccess("Solo se permiten archivos de imagen");
        continue;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus("error");
        setSuccess("Las imágenes no deben superar los 5MB");
        continue;
      }

      const preview = URL.createObjectURL(file);
      newImages.push({
        file,
        preview,
        id: Math.random().toString(36).substr(2, 9)
      });
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      setStatus(null);
      setSuccess(null);
    }

    // Limpiar input
    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // En el handleSubmit del componente:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSuccess(null);

    // Validación de términos y condiciones
    if (!checkedTerminos) {
      setStatus("error");
      setSuccess("Debes aceptar los términos y condiciones para poder crear la demanda.");
      return;
    }

    // Validaciones de campos obligatorios
    if (!demand.id_categoria) {
      setStatus("error");
      setSuccess("Debes seleccionar o crear una categoría para la demanda.");
      return;
    }

    if (!demand.rubro) {
      setStatus("error");
      setSuccess("Debes seleccionar o crear un rubro para la demanda.");
      return;
    }

    if (!demand.detalle || demand.detalle.trim() === '') {
      setStatus("error");
      setSuccess("Debes completar el detalle de la demanda.");
      return;
    }

    // Validar longitud mínima del detalle
    if (demand.detalle.trim().length < 10) {
      setStatus("error");
      setSuccess("El detalle de la demanda debe tener al menos 10 caracteres.");
      return;
    }

    setIsUploading(true);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No hay sesión activa');
      }
      
      const formData = new FormData();
      
      // Agregar datos de la demanda como string
      formData.append('demandData', JSON.stringify(demand));
      
      // Agregar imágenes como archivos (si decides usarlas después)
      images.forEach((image) => {
        formData.append('images', image.file);
      });

      console.log('Enviando formulario con:', {
        demand,
        imageCount: images.length
      });

      const response = await fetch('/api/crear-demanda', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData,
      });

      const result = await response.json();

      console.log('Respuesta del servidor:', result);

      if (result.success) {
        setStatus("success");
        setSuccess(
          `Su demanda fue creada correctamente y pasará a evaluarse. ` +
          `Se subieron ${result.imagesCount} imágenes. ` +
          `En unos minutos recibirá un correo electrónico con el resultado de la evaluación.`
        );

        // Limpiar imágenes después de subir exitosamente
        images.forEach(image => URL.revokeObjectURL(image.preview));
        setImages([]);

        setTimeout(() => {
          router.push("/demandas");
        }, 3000);
      } else {
        setStatus("error");
        setSuccess(result.message || "Error al crear la demanda.");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setStatus("error");
      setSuccess("Hubo un problema al procesar la solicitud.");
    } finally {
      setIsUploading(false);
    }
  };

  // Función para formatear fecha en formato argentino
  const formatearFecha = (fecha: string) => {
    const [año, mes, dia] = fecha.split('-');
    const fechaObj = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
    
    return fechaObj.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Configuración de estilos para react-select
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "4px 8px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6"
      },
      "&:focus-within": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)"
      }
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#f1f5f9" : "white",
      color: state.isSelected ? "white" : "#334155",
      "&:active": {
        backgroundColor: "#3b82f6",
        color: "white"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mt-20 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nueva Demanda</h1>
          <p className="text-gray-600">Complete el formulario para registrar su necesidad</p>
        </div>

        {/* Alertas */}
        {status && success && (
          <div className="mb-6">
            <Alert
              variant={status === "success" ? "success" : "destructive"}
              title={status === "success" ? "Éxito" : "Error"}
              description={success}
              onClose={() => {
                setStatus(null);
                setSuccess(null);
                setDemand({
                  empresa: "",
                  responsable_solicitud: "",
                  email_contacto: "",
                  telefono: "",
                  fecha_inicio: "",
                  fecha_vencimiento: "",
                  detalle: "",
                  profile_id: user?.id || "",
                  id_categoria: "",
                  pais_id: "",
                  rubro: "",
                });
                setCustomRubro("");
                setIsCustomRubro(false);
                setCustomCategoria("");
                setIsCustomCategoria(false);
              }}
            />
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Información de la Empresa */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Información de la Empresa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-sm font-medium text-gray-700">
                    Empresa
                  </Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={demand.empresa || "Completar datos de perfil para que aparezcan aquí"}
                    readOnly
                    className="w-full bg-gray-50 border-gray-200 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pais" className="text-sm font-medium text-gray-700">
                    País
                  </Label>
                  <Input
                    id="pais"
                    name="pais"
                    value={demand.nombre_pais || "Cargando..."}
                    readOnly
                    className="w-full bg-gray-50 border-gray-200 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsable_solicitud" className="text-sm font-medium text-gray-700">
                    Responsable de la solicitud
                  </Label>
                  <Input
                    id="responsable_solicitud"
                    name="responsable_solicitud"
                    value={demand.responsable_solicitud || "Completar datos de perfil para que aparezcan aquí"}
                    readOnly
                    className="w-full bg-gray-50 border-gray-200 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email_contacto" className="text-sm font-medium text-gray-700">
                    Email de contacto
                  </Label>
                  <Input
                    id="email_contacto"
                    name="email_contacto"
                    type="email"
                    value={profile?.email || "Completar datos de perfil para que aparezcan aquí"}
                    readOnly
                    className="w-full bg-gray-50 border-gray-200 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                    Teléfono de contacto
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={demand.telefono || "Completar datos de perfil para que aparezcan aquí"}
                    readOnly
                    className="w-full bg-gray-50 border-gray-200 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Fechas Automáticas */}
            <div className="mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-4 text-lg">Fechas de la Demanda</h3>
                
                {/* Mensaje informativo sobre el proceso */}
                <div className="bg-white border border-blue-100 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium text-blue-800 mb-1">Proceso de validación y duración de la demanda</p>
                      <p className="mb-2">
                        Las demandas tienen una duración de <span className="font-semibold">7 días corridos</span> a partir de su 
                        <span className="font-semibold text-blue-600"> aprobación por parte de nuestro equipo</span>. 
                        El proceso de revisión y validación puede demorar entre 24 y 48 horas hábiles.
                      </p>
                      <div className="flex items-start space-x-2 text-xs text-gray-500 mt-3 bg-gray-50 rounded-lg p-3">
                        <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01M12 3l9.66 4.79a2 2 0 011.34 1.83V16a2 2 0 01-2 2H3a2 2 0 01-2-2V9.62a2 2 0 011.34-1.83L12 3z" />
                        </svg>
                        <p>
                          <span className="font-medium">Importante:</span> El contador de los 7 días comenzará automáticamente cuando nuestro equipo apruebe su demanda. 
                          Recibirá una notificación por correo electrónico con la fecha exacta de inicio y vencimiento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline visual del proceso */}
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <p className="text-sm font-medium text-blue-700 mb-3">Flujo del proceso:</p>
                  <div className="flex items-center justify-between text-xs text-blue-600">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-1">1</div>
                      <span>Creación</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-blue-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold mb-1">2</div>
                      <span>Revisión</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-blue-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold mb-1">3</div>
                      <span>Aprobación</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-blue-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-1">4</div>
                      <span>7 días activa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categoría y Rubro */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Detalles de la Demanda
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <div className="space-y-2">
                  <Label htmlFor="id_categoria" className="text-sm font-medium text-gray-700">
                    Categoría <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs">(Selecciona o crea una nueva)</span>
                  </Label>
                  <Select
                    id="id_categoria"
                    name="id_categoria"
                    options={[
                      ...categorias.map((categoria) => ({ 
                        value: categoria.id, 
                        label: categoria.categoria 
                      })),
                      { value: "otro", label: "Otro (Agregar nueva categoría)" },
                    ]}
                    onChange={(selectedOption) => {
                      if (selectedOption?.value === "otro") {
                        setIsCustomCategoria(true);
                        setCustomCategoria("");
                        handleDemandChange("id_categoria", "");
                      } else {
                        setIsCustomCategoria(false);
                        setCustomCategoria("");
                        handleDemandChange("id_categoria", selectedOption?.value ?? "");
                      }
                    }}
                    styles={selectStyles}
                    placeholder="Selecciona una categoría"
                    className="text-sm"
                  />
                  
                  {/* Campo para nueva categoría */}
                  {isCustomCategoria && (
                    <div className="mt-2 space-y-2">
                      <Label htmlFor="customCategoria" className="text-sm font-medium text-gray-700">
                        Nueva Categoría <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customCategoria"
                        name="customCategoria"
                        value={customCategoria}
                        onChange={(e) => {
                          setCustomCategoria(e.target.value);
                          handleDemandChange("id_categoria", e.target.value);
                        }}
                        placeholder="Escribe la nueva categoría"
                        className="w-full"
                      />
                      {!customCategoria && (
                        <p className="text-red-500 text-xs mt-1">* Debes escribir una nueva categoría</p>
                      )}
                    </div>
                  )}
                  
                  {!demand.id_categoria && (
                    <p className="text-red-500 text-xs mt-1">* La categoría es obligatoria</p>
                  )}
                </div>

                {/* Rubro */}
                <div className="space-y-2">
                  <Label htmlFor="rubro" className="text-sm font-medium text-gray-700">
                    Rubro <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs">(Escribe tu rubro para buscar el adecuado)</span>
                  </Label>
                  <Select
                    id="rubro"
                    name="rubro"
                    options={[
                      ...rubros.map((rubro) => ({ value: rubro.id, label: rubro.nombre })),
                      { value: "otro", label: "Otro (Agregar nuevo rubro)" },
                    ]}
                    onChange={(selectedOption) => {
                      if (selectedOption?.value === "otro") {
                        setIsCustomRubro(true);
                        setCustomRubro("");
                        handleDemandChange("rubro", "");
                      } else {
                        setIsCustomRubro(false);
                        setCustomRubro("");
                        handleDemandChange("rubro", selectedOption?.value ?? "");
                      }
                    }}
                    styles={selectStyles}
                    placeholder="Selecciona un rubro"
                    className="text-sm"
                  />
                  
                  {/* Campo para nuevo rubro */}
                  {isCustomRubro && (
                    <div className="mt-2 space-y-2">
                      <Label htmlFor="customRubro" className="text-sm font-medium text-gray-700">
                        Nuevo Rubro <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customRubro"
                        name="customRubro"
                        value={customRubro}
                        onChange={(e) => {
                          setCustomRubro(e.target.value);
                          handleDemandChange("rubro", e.target.value);
                        }}
                        placeholder="Escribe el nuevo rubro"
                        className="w-full"
                      />
                      {!customRubro && (
                        <p className="text-red-500 text-xs mt-1">* Debes escribir un nuevo rubro</p>
                      )}
                    </div>
                  )}
                  
                  {!demand.rubro && (
                    <p className="text-red-500 text-xs mt-1">* El rubro es obligatorio</p>
                  )}
                </div>
              </div>
            </div>

            {/* Detalle */}
            <div className="space-y-2">
              <Label htmlFor="detalle" className="text-sm font-medium text-gray-700">
                Detalle de la demanda <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="detalle"
                name="detalle"
                placeholder="Describa el detalle de la demanda..."
                required
                value={demand.detalle}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors bg-white ${
                  !demand.detalle ? 'border-red-300' : 'border-gray-200'
                }`}
                rows={5}
              />
              {!demand.detalle && (
                <p className="text-red-500 text-xs mt-1">El detalle es obligatorio</p>
              )}
              {demand.detalle && demand.detalle.trim().length < 10 && (
                <p className="text-orange-500 text-xs mt-1">* El detalle debe tener al menos 10 caracteres</p>
              )}
            </div>

            {/* Subida de Imágenes */}
            {/* <div className="mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    Imágenes de referencia
                  </Label>
                  <span className="text-xs text-gray-500">
                    {images.length}/2 imágenes
                  </span>
                </div>

                {/* Botón de subida */}
                {/* <div className="flex flex-col items-center justify-center">
                  <label
                    htmlFor="image-upload"
                    className={`w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
                      images.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={images.length >= 2}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">
                      {images.length >= 2 ? 'Máximo de imágenes alcanzado' : 'Haga clic para agregar imágenes'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG hasta 5MB • Máximo 2 imágenes
                    </p>
                  </label>
                </div> */}

                {/* Vista previa de imágenes */}
                {/* {images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                      >
                        <img
                          src={image.preview}
                          alt="Vista previa"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="p-2 bg-white border-t border-gray-200">
                          <p className="text-xs text-gray-600 truncate">
                            {image.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(image.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div> */} 

            {/* Términos y Condiciones */}
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 mt-5 mb-8">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terminos"
                    disabled={profile?.terminos === true}
                    checked={checkedTerminos}
                    onChange={handleCheckboxChange}
                    className="sr-only" // Oculta el checkbox nativo
                  />
                  <div className={`
                    w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
                    ${checkedTerminos 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white border-gray-300'
                    }
                    ${profile?.terminos === true ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}>
                    {checkedTerminos && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <span className="text-sm text-gray-700">
                  Acepto los{" "}
                  <a 
                    href="/terminos" 
                    className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors" 
                    target="_blank"
                  >
                    Términos y Condiciones
                  </a>
                  {profile?.terminos === true && (
                    <span className="text-green-600 text-xs ml-2">✓ Ya aceptados anteriormente</span>
                  )}
                </span>
              </label>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={!checkedTerminos || isUploading}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando...
                  </>
                ) : (
                  'Crear Demanda'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
