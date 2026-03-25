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
  ArrowPathIcon,
  ClockIcon,
  GlobeAltIcon
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
    const offsetArgentina = -3;
    const ahoraArgentina = new Date(ahora.getTime() + (offsetArgentina * 60 * 60 * 1000));
    return ahoraArgentina.toISOString().split('T')[0];
  };

  // Función para calcular fecha de vencimiento (1 semana después)
  const getFechaVencimientoArgentina = () => {
    const ahora = new Date();
    const offsetArgentina = -3;
    const ahoraArgentina = new Date(ahora.getTime() + (offsetArgentina * 60 * 60 * 1000));
    const vencimiento = new Date(ahoraArgentina);
    vencimiento.setDate(vencimiento.getDate() + 7);
    return vencimiento.toISOString().split('T')[0];
  };

  // Calcular días restantes CORREGIDO para Argentina
  const calcularDiasRestantes = () => {
    const fechaVencimiento = new Date(demanda.fecha_vencimiento);
    const hoy = new Date();
    const offsetArgentina = -3;
    const hoyArgentina = new Date(hoy.getTime() + (offsetArgentina * 60 * 60 * 1000));
    const vencimientoArgentina = new Date(fechaVencimiento.getTime() + (offsetArgentina * 60 * 60 * 1000));
    
    const vencimientoSinHora = new Date(vencimientoArgentina.getFullYear(), vencimientoArgentina.getMonth(), vencimientoArgentina.getDate());
    const hoySinHora = new Date(hoyArgentina.getFullYear(), hoyArgentina.getMonth(), hoyArgentina.getDate());
    
    const diferenciaMs = vencimientoSinHora.getTime() - hoySinHora.getTime();
    const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    
    if (diferenciaDias < 0) {
      return { texto: `Vencida hace ${Math.abs(diferenciaDias)} día${Math.abs(diferenciaDias) !== 1 ? 's' : ''}`, tipo: 'vencida', dias: diferenciaDias };
    } else if (diferenciaDias === 0) {
      return { texto: 'Vence hoy', tipo: 'hoy', dias: 0 };
    } else if (diferenciaDias <= 2) {
      return { texto: `Vence en ${diferenciaDias} día${diferenciaDias !== 1 ? 's' : ''}`, tipo: 'proximo', dias: diferenciaDias };
    } else {
      return { texto: `Vence en ${diferenciaDias} días`, tipo: 'activa', dias: diferenciaDias };
    }
  };

  // Función para renovar la demanda con SweetAlert2
  const handleRenovarDemanda = async () => {
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
    });

    if (!result.isConfirmed) return;

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

      if (error) throw error;

      await Swal.fire({
        title: '¡Éxito!',
        text: 'La demanda ha sido renovada correctamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
      
      closeModal();
      
    } catch (error) {
      console.error('Error al renovar demanda:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al renovar la demanda. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Entendido',
      });
    } finally {
      setIsRenovando(false);
    }
  };

  const diasInfo = calcularDiasRestantes();
  const mostrarBotonRenovar = diasInfo.tipo === 'vencida' || diasInfo.tipo === 'proximo' || diasInfo.tipo === 'hoy';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4">
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal responsive - altura optimizada */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-auto flex flex-col">
        
        {/* Header fijo */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <BriefcaseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Detalles de la Demanda</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-xs sm:text-sm text-gray-600">ID: {demanda.id}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  diasInfo.tipo === 'vencida' ? 'bg-red-100 text-red-700' :
                  diasInfo.tipo === 'hoy' ? 'bg-orange-100 text-orange-700' :
                  diasInfo.tipo === 'proximo' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {diasInfo.texto}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Contenido con scroll - mejor organización */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          <div className="space-y-5 sm:space-y-6">
            
            {/* SECCIÓN 1: Estado de Vencimiento y Renovación - AHORA ARRIBA */}
            {mostrarBotonRenovar && (
              <div className={`rounded-xl p-4 sm:p-5 border-2 ${
                diasInfo.tipo === 'vencida' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    diasInfo.tipo === 'vencida' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <ClockIcon className={`w-5 h-5 ${
                      diasInfo.tipo === 'vencida' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold mb-1 ${
                      diasInfo.tipo === 'vencida' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {diasInfo.tipo === 'vencida' ? 'Demanda Vencida' : 'Demanda por Vencer'}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      diasInfo.tipo === 'vencida' ? 'text-red-700' : 'text-yellow-700'
                    }`}>
                      {diasInfo.tipo === 'vencida' 
                        ? 'Esta demanda ya ha vencido. Renóvala para mantenerla activa.' 
                        : `Esta demanda ${diasInfo.texto.toLowerCase()}. Renóvala para extender su vigencia por 7 días más.`}
                    </p>
                    <button
                      onClick={handleRenovarDemanda}
                      disabled={isRenovando}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {isRenovando ? 'Renovando...' : 'Renovar Demanda (7 días más)'}
                    </button>
                    <p className="text-xs mt-2 text-center opacity-75">
                      Nueva fecha: {formatDate(getFechaVencimientoArgentina())}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Grid principal - 2 columnas en desktop, 1 en móvil */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              
              {/* COLUMNA IZQUIERDA - Información Principal */}
              <div className="space-y-5 sm:space-y-6">
                {/* Descripción */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Descripción
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{demanda.detalle}</p>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Contacto
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BuildingOfficeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500">Empresa</p>
                        <p className="text-sm sm:text-base text-gray-900 font-medium truncate">{demanda.empresa}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500">Teléfono</p>
                        <p className="text-sm sm:text-base text-gray-900 font-medium">{demanda.telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA - Categorización y Fechas */}
              <div className="space-y-5 sm:space-y-6">
                {/* Categorización */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Clasificación
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-50/30 rounded-lg">
                      <p className="text-xs font-medium text-blue-600 mb-1 flex items-center gap-1">
                        <GlobeAltIcon className="w-3 h-3" />
                        País
                      </p>
                      <p className="text-sm sm:text-base text-blue-900 font-medium">{demanda.pais.nombre}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-50/30 rounded-lg">
                      <p className="text-xs font-medium text-green-600 mb-1">Categoría</p>
                      <p className="text-sm sm:text-base text-green-900 font-medium">{demanda.categorias.categoria}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-50/30 rounded-lg">
                      <p className="text-xs font-medium text-purple-600 mb-1">Rubro</p>
                      <p className="text-sm sm:text-base text-purple-900 font-medium">{demanda.rubros.nombre}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Vigencia
                  </h3>
                  <div className="space-y-2.5">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-1">Fecha de Inicio</p>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <p className="text-sm sm:text-base text-gray-900 font-medium">{formatDate(demanda.fecha_inicio)}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-600 mb-1">Fecha de Vencimiento</p>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <p className="text-sm sm:text-base text-gray-900 font-medium">{formatDate(demanda.fecha_vencimiento)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE IMÁGENES (si las hay) - Opcional */}
            {!loadingImages && images.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Imágenes Adjuntas ({images.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={img.url} 
                        alt={`Imagen ${idx + 1}`}
                        className="w-full h-24 sm:h-28 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(img.url, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botón Cerrar */}
            <div className="flex justify-center pt-4">
              <button
                onClick={closeModal}
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDemandaUsuario;
