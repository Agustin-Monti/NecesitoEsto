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
  BriefcaseIcon
} from "@heroicons/react/24/outline";

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

  // Calcular días restantes
  const calcularDiasRestantes = () => {
    const fechaVencimiento = new Date(demanda.fecha_vencimiento);
    const hoy = new Date();
    const diferenciaDias = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diferenciaDias < 0) {
      return { texto: `Vencida hace ${Math.abs(diferenciaDias)} días`, tipo: 'vencida' };
    } else if (diferenciaDias === 0) {
      return { texto: 'Vence hoy', tipo: 'hoy' };
    } else if (diferenciaDias <= 2) {
      return { texto: `Vence en ${diferenciaDias} días`, tipo: 'proximo' };
    } else {
      return { texto: `Vence en ${diferenciaDias} días`, tipo: 'activa' };
    }
  };

  const diasInfo = calcularDiasRestantes();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal más grande */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BriefcaseIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Detalles de la Demanda</h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm text-gray-600">ID: {demanda.id}</p>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
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
            className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-8 space-y-8">
            {/* Información Principal en 2 columnas */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Columna Izquierda - Información Principal */}
              <div className="space-y-8">
                {/* Descripción de la Demanda */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-blue-500" />
                    Descripción de la Demanda
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed text-lg">{demanda.detalle}</p>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-500" />
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <BuildingOfficeIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Empresa</p>
                        <p className="text-gray-900 text-lg font-medium">{demanda.empresa}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <PhoneIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Teléfono</p>
                        <p className="text-gray-900 text-lg font-medium">{demanda.telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha - Categorías y Fechas */}
              <div className="space-y-8">
                {/* Categorización */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                    Categorización
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm font-medium text-blue-600 mb-2">País</p>
                      <p className="text-blue-900 text-lg font-medium">{demanda.pais.nombre}</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-sm font-medium text-green-600 mb-2">Categoría</p>
                      <p className="text-green-900 text-lg font-medium">{demanda.categorias.categoria}</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-sm font-medium text-purple-600 mb-2">Rubro</p>
                      <p className="text-purple-900 text-lg font-medium">{demanda.rubros.nombre}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas - Solo lectura */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                    Fechas de la Demanda
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">Fecha de Inicio</p>
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-900 text-lg font-medium">{formatDate(demanda.fecha_inicio)}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">Fecha de Vencimiento</p>
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-900 text-lg font-medium">{formatDate(demanda.fecha_vencimiento)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Imágenes de la Demanda */}
            {/* <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <PhotoIcon className="w-5 h-5 text-blue-500" />
                Imágenes de Referencia
              </h3>

              {loadingImages ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={image.url}
                          alt={`Imagen ${index + 1} de la demanda`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium truncate">{image.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No hay imágenes asociadas a esta demanda</p>
                  <p className="text-gray-400 text-sm mt-2">Las imágenes aparecerán aquí si se adjuntaron al crear la demanda</p>
                </div>
              )}
            </div> */}

            {/* Botón de Cerrar centrado */}
            <div className="flex justify-center pt-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-8 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
