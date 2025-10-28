import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  XMarkIcon, 
  PhotoIcon, 
  CalendarIcon, 
  BuildingOfficeIcon, 
  PhoneIcon,
  MapPinIcon,
  TagIcon,
  BriefcaseIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export interface Demanda {
  id: number;
  detalle: string;
  rubro_id: string;
  empresa: string;
  telefono: string;
  pais_id: string;
  id_categoria: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  pais: { nombre: string; bandera_url: string };
  categorias: { id: string; categoria: string };
  rubros: { id: string; nombre: string };
}

interface ModalDemandaUsuarioProps {
  demanda: Demanda;
  closeModal: () => void;
}

interface ImageData {
  name: string;
  url: string;
}

const ModalDemandaUsuario: React.FC<ModalDemandaUsuarioProps> = ({ demanda, closeModal }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [isRenovando, setIsRenovando] = useState(false);

  // Cargar imágenes de la demanda
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = createClient();
        const { data: files, error } = await supabase.storage
          .from('demandas')
          .list(demanda.id.toString());

        if (error) {
          console.error('Error al cargar imágenes:', error);
          return;
        }

        if (files && files.length > 0) {
          const imageUrls = await Promise.all(
            files.map(async (file) => {
              const { data: urlData } = supabase.storage
                .from('demandas')
                .getPublicUrl(`${demanda.id}/${file.name}`);
              
              return {
                name: file.name,
                url: urlData.publicUrl
              };
            })
          );
          setImages(imageUrls);
        }
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [demanda.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener fecha actual en formato Argentina (YYYY-MM-DD)
  const getFechaActualArgentina = () => {
    const ahora = new Date();
    // Ajustar a horario Argentina (UTC-3)
    const offsetArgentina = -3;
    const ahoraArgentina = new Date(ahora.getTime() + (offsetArgentina * 60 * 60 * 1000));
    
    return ahoraArgentina.toISOString().split('T')[0];
  };

  // Función para calcular fecha de vencimiento (1 semana después)
  const getFechaVencimientoArgentina = () => {
    const ahora = new Date();
    // Ajustar a horario Argentina (UTC-3)
    const offsetArgentina = -3;
    const ahoraArgentina = new Date(ahora.getTime() + (offsetArgentina * 60 * 60 * 1000));
    
    // Sumar 7 días
    const vencimiento = new Date(ahoraArgentina);
    vencimiento.setDate(vencimiento.getDate() + 7);
    
    return vencimiento.toISOString().split('T')[0];
  };

  // Calcular días restantes CORREGIDO para Argentina
  const calcularDiasRestantes = () => {
    // Crear fechas en horario argentina (UTC-3)
    const fechaVencimiento = new Date(demanda.fecha_vencimiento);
    const hoy = new Date();
    
    // Ajustar a horario argentina
    const offsetArgentina = -3; // UTC-3
    const hoyArgentina = new Date(hoy.getTime() + (offsetArgentina * 60 * 60 * 1000));
    const vencimientoArgentina = new Date(fechaVencimiento.getTime() + (offsetArgentina * 60 * 60 * 1000));
    
    // Calcular diferencia en días (solo fecha, sin hora)
    const vencimientoSinHora = new Date(vencimientoArgentina.getFullYear(), vencimientoArgentina.getMonth(), vencimientoArgentina.getDate());
    const hoySinHora = new Date(hoyArgentina.getFullYear(), hoyArgentina.getMonth(), hoyArgentina.getDate());
    
    const diferenciaMs = vencimientoSinHora.getTime() - hoySinHora.getTime();
    const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    
    if (diferenciaDias < 0) {
      return { texto: `Vencida hace ${Math.abs(diferenciaDias)} día${Math.abs(diferenciaDias) !== 1 ? 's' : ''}`, tipo: 'vencida' };
    } else if (diferenciaDias === 0) {
      return { texto: 'Vence hoy', tipo: 'hoy' };
    } else if (diferenciaDias <= 2) {
      return { texto: `Vence en ${diferenciaDias} día${diferenciaDias !== 1 ? 's' : ''}`, tipo: 'proximo' };
    } else {
      return { texto: `Vence en ${diferenciaDias} días`, tipo: 'activa' };
    }
  };

  // Función para renovar la demanda con SweetAlert2
  const handleRenovarDemanda = async () => {
    // Confirmación antes de renovar
    const result = await Swal.fire({
      title: '¿Renovar demanda?',
      html: `
        <div class="text-left">
          <p class="mb-2">¿Estás seguro de que deseas renovar esta demanda?</p>
          <div class="bg-blue-50 p-3 rounded-lg mt-3">
            <p class="text-sm text-blue-700"><strong>Nueva fecha de inicio:</strong> ${formatDate(getFechaActualArgentina())}</p>
            <p class="text-sm text-blue-700"><strong>Nueva fecha de vencimiento:</strong> ${formatDate(getFechaVencimientoArgentina())}</p>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, renovar',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      color: '#374151',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'px-4 py-2 rounded-lg font-medium',
        cancelButton: 'px-4 py-2 rounded-lg font-medium'
      }
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsRenovando(true);
    
    try {
      const supabase = createClient();
      
      const fechaInicio = getFechaActualArgentina();
      const fechaVencimiento = getFechaVencimientoArgentina();
      
      const { error } = await supabase
        .from('demandas')
        .update({
          fecha_inicio: fechaInicio,
          fecha_vencimiento: fechaVencimiento
        })
        .eq('id', demanda.id);

      if (error) {
        console.error('Error al renovar demanda:', error);
        throw error;
      }

      // Mostrar mensaje de éxito con SweetAlert2
      await Swal.fire({
        title: '¡Éxito!',
        text: 'La demanda ha sido renovada correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        background: '#fff',
        color: '#374151',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-4 py-2 rounded-lg font-medium'
        }
      });
      
      // Cerrar modal y recargar
      closeModal();
      
    } catch (error) {
      console.error('Error al renovar demanda:', error);
      
      // Mostrar error con SweetAlert2
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al renovar la demanda. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Entendido',
        background: '#fff',
        color: '#374151',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-4 py-2 rounded-lg font-medium'
        }
      });
    } finally {
      setIsRenovando(false);
    }
  };

  const diasInfo = calcularDiasRestantes();

  // Verificar si muestra botón de renovar (vencida o por vencer)
  const mostrarBotonRenovar = diasInfo.tipo === 'vencida' || diasInfo.tipo === 'proximo' || diasInfo.tipo === 'hoy';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal responsive */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-auto">
        {/* Header más compacto */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <BriefcaseIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gray-900 truncate">Detalles de la Demanda</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                <p className="text-sm text-gray-600 flex-shrink-0">ID: {demanda.id}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                  diasInfo.tipo === 'vencida' ? 'bg-red-100 text-red-700 border border-red-200' :
                  diasInfo.tipo === 'hoy' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                  diasInfo.tipo === 'proximo' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                  'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {diasInfo.texto}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Información Principal en 2 columnas en desktop, 1 en mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Columna Izquierda - Información Principal */}
              <div className="space-y-6">
                {/* Descripción de la Demanda */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TagIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Descripción de la Demanda
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700 leading-relaxed text-base">{demanda.detalle}</p>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BuildingOfficeIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BuildingOfficeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500">Empresa</p>
                        <p className="text-gray-900 font-medium truncate">{demanda.empresa}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500">Teléfono</p>
                        <p className="text-gray-900 font-medium">{demanda.telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha - Categorías y Fechas */}
              <div className="space-y-6">
                {/* Categorización */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Categorización
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 mb-1">País</p>
                      <p className="text-blue-900 font-medium">{demanda.pais.nombre}</p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-xs font-medium text-green-600 mb-1">Categoría</p>
                      <p className="text-green-900 font-medium">{demanda.categorias.categoria}</p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-xs font-medium text-purple-600 mb-1">Rubro</p>
                      <p className="text-purple-900 font-medium">{demanda.rubros.nombre}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas - Solo lectura */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Fechas de la Demanda
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-1">Fecha de Inicio</p>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-900 font-medium">{formatDate(demanda.fecha_inicio)}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-1">Fecha de Vencimiento</p>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-900 font-medium">{formatDate(demanda.fecha_vencimiento)}</p>
                      </div>
                    </div>

                    {/* Botón de Renovar */}
                    {mostrarBotonRenovar && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                        <p className="text-xs font-medium text-blue-700 mb-2">
                          {diasInfo.tipo === 'vencida' 
                            ? 'Esta demanda ha vencido. ¿Deseas renovarla?' 
                            : 'Esta demanda está por vencer. ¿Deseas renovarla?'}
                        </p>
                        <button
                          onClick={handleRenovarDemanda}
                          disabled={isRenovando}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowPathIcon className="w-4 h-4" />
                          {isRenovando ? 'Renovando...' : 'Renovar Demanda'}
                        </button>
                        <p className="text-xs text-blue-600 mt-2 text-center">
                          Nueva fecha de vencimiento: {formatDate(getFechaVencimientoArgentina())}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Cerrar */}
            <div className="flex justify-center pt-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
              >
                Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDemandaUsuario;
