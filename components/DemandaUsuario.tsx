import { useEffect, useState } from 'react';
import { fetchDemandas, deleteDemanda } from '@/actions/demanda-actions';
import ModalDemandaUsuario from '@/components/ModalDemandaUsuario';
import Link from 'next/link';
import Swal from "sweetalert2";
import { EyeIcon, TrashIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/solid';

const DemandaUsuario = ({ userId }: { userId: string }) => {
  const [demandas, setDemandas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemanda, setSelectedDemanda] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDemandas = async () => {
      const data = await fetchDemandas(userId);
      setDemandas(data);
      setLoading(false);
    };
    getDemandas();
  }, [userId]);

  // Función auxiliar para determinar el estado de una demanda
  const getEstadoDemanda = (fechaVencimientoStr: string) => {
    const fechaVencimiento = new Date(fechaVencimientoStr);
    const hoy = new Date();
    const diferenciaDias = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    
    if (fechaVencimiento < hoy) {
      return { estado: 'expired', diferenciaDias };
    } else if (diferenciaDias <= 2) {
      return { estado: 'warning', diferenciaDias };
    } else {
      return { estado: 'active', diferenciaDias };
    }
  };

  const handleView = (demanda: any) => {
    setSelectedDemanda(demanda);
    setIsModalOpen(true);
  };

  const reloadDemandas = async () => {
    const data = await fetchDemandas(userId);
    setDemandas(data);
  };

  const handleDelete = async (demandaId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción ocultará la demanda, pero no eliminará los pagos asociados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: '#fff',
      color: '#374151',
    });

    if (result.isConfirmed) {
      const success = await deleteDemanda(demandaId);
      if (success) {
        Swal.fire({
          title: "Eliminado",
          text: "La demanda ha sido eliminada correctamente.",
          icon: "success",
          timer: 2000,
          background: '#fff',
          color: '#374151',
        });
        reloadDemandas();
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la demanda. Intenta de nuevo.",
          icon: "error",
          background: '#fff',
          color: '#374151',
        });
      }
    }
  };

  // Calcular estadísticas usando la función auxiliar
  const stats = {
    total: demandas.length,
    activas: demandas.filter(d => {
      const { estado } = getEstadoDemanda(d.fecha_vencimiento);
      return estado === 'active';
    }).length,
    porVencer: demandas.filter(d => {
      const { estado } = getEstadoDemanda(d.fecha_vencimiento);
      return estado === 'warning';
    }).length,
    vencidas: demandas.filter(d => {
      const { estado } = getEstadoDemanda(d.fecha_vencimiento);
      return estado === 'expired';
    }).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Cargando demandas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header - Optimizado para diferentes resoluciones */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Mis Demandas
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Gestiona todas tus necesidades registradas
          </p>
        </div>

        {demandas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mx-2 sm:mx-4">
            <div className="max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No tienes demandas creadas
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                Comienza creando tu primera demanda para mostrar tus necesidades.
              </p>
              <Link href="/demandas/new">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center text-sm sm:text-base">
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Crear Nueva Demanda
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats - Grid responsive con breakpoints específicos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Demandas</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Activas</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{stats.activas}</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Por Vencer</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">{stats.porVencer}</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Vencidas</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">{stats.vencidas}</p>
              </div>
            </div>

            {/* Grid de Demandas - Optimizado para 1366x768 y tablets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {demandas.map((demanda) => {
                const fechaVencimiento = new Date(demanda.fecha_vencimiento);
                const { estado, diferenciaDias } = getEstadoDemanda(demanda.fecha_vencimiento);
                
                let estadoColor = 'text-green-600 bg-green-50 border-green-200';
                let advertencia = null;

                if (estado === 'expired') {
                  estadoColor = 'text-red-600 bg-red-50 border-red-200';
                  advertencia = "Demanda Vencida";
                } else if (estado === 'warning') {
                  estadoColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
                  advertencia = `La demanda vence en ${diferenciaDias} día${diferenciaDias !== 1 ? 's' : ''}.`;
                }

                return (
                  <div 
                    key={demanda.id} 
                    className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                  >
                    {/* Header con ID y Estado */}
                    <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                          ID: {demanda.id}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border whitespace-nowrap ${estadoColor}`}>
                          {estado === 'expired' ? 'Vencida' : estado === 'warning' ? 'Por Vencer' : 'Activa'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {demanda.detalle}
                      </h3>
                    </div>

                    {/* Contenido */}
                    <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600">
                        <span className="font-medium mr-2 mb-1 sm:mb-0">Empresa:</span>
                        <span className="truncate">{demanda.empresa}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600">
                        <span className="font-medium mr-2 mb-1 sm:mb-0">Categoría:</span>
                        <span className="truncate">{demanda.categorias?.categoria || "Sin Categoría"}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600">
                        <span className="font-medium mr-2 mb-1 sm:mb-0">Rubro:</span>
                        <span className="truncate">{demanda.rubros?.nombre || "Sin Rubro"}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600">
                        <span className="font-medium mr-2 mb-1 sm:mb-0">Vence:</span>
                        <span>{fechaVencimiento.toLocaleDateString('es-AR')}</span>
                      </div>

                      {/* Advertencia */}
                      {advertencia && (
                        <div className="mt-2 sm:mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3 flex items-start gap-2 sm:gap-3">
                          <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-yellow-800 leading-relaxed">{advertencia}</span>
                        </div>
                      )}
                    </div>

                    {/* Acciones - Botones responsivos */}
                    <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                      <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={() => handleView(demanda)}
                          className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>Ver Demanda</span>
                        </button>
                        <button
                          onClick={() => handleDelete(demanda.id)}
                          className="flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botón crear nueva demanda */}
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <Link href="/demandas/new">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center text-sm sm:text-base">
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Crear Nueva Demanda
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Modal */}
        {isModalOpen && selectedDemanda && (
          <ModalDemandaUsuario 
            demanda={selectedDemanda} 
            closeModal={() => { 
              setIsModalOpen(false); 
              reloadDemandas(); 
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default DemandaUsuario;
