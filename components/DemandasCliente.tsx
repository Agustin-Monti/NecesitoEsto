"use client";

import { useState, useEffect } from 'react';
import ModalDetallesPago from '@/components/ModalDetallesPago';
import { getDemandasByCategoria, getRubrosByCategoria, getDemandasByRubro } from '@/actions/demanda-actions';
import Search from './ui/search';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Select from 'react-select';

interface DemandasClienteProps {
  demandas: any[];
  userId: string | null;
  categorias: any[];
}

export default function DemandasCliente({ demandas, userId, categorias }: DemandasClienteProps) {
  const [filteredDemandas, setFilteredDemandas] = useState(demandas);
  const [modalOpen, setModalOpen] = useState(false);
  const [demandaSeleccionada, setDemandaSeleccionada] = useState<any | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [rubroSeleccionado, setRubroSeleccionado] = useState('');
  const [rubros, setRubros] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [ordenId, setOrdenId] = useState('');
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // 6 demandas por página

  const searchParams = useSearchParams();

  // Estado para controlar la hidratación
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const abrirModal = (demanda: any) => {
    setDemandaSeleccionada(demanda);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setDemandaSeleccionada(null);
  };

  const handleCategoriaChange = async (idCategoria: string) => {
    setCategoriaSeleccionada(idCategoria);
    setRubroSeleccionado('');
    setCurrentPage(1); // Reset a página 1 cuando cambia el filtro

    try {
      const demandasFiltradas = idCategoria
        ? await getDemandasByCategoria(idCategoria)
        : demandas;

      setFilteredDemandas(demandasFiltradas);
      setRubros(await getRubrosByCategoria(idCategoria));
    } catch (error) {
      console.error('Error al filtrar por categoría:', error);
    }
  };

  const handleRubroChange = async (idRubro: string) => {
    setRubroSeleccionado(idRubro);
    setCurrentPage(1); // Reset a página 1 cuando cambia el filtro

    try {
      let demandasFiltradas = [...demandas];

      if (idRubro) {
        demandasFiltradas = await getDemandasByRubro(idRubro);
      }

      if (!idRubro && categoriaSeleccionada) {
        demandasFiltradas = demandasFiltradas.filter((demanda) =>
          demanda.categorias?.id === categoriaSeleccionada
        );
      }

      setFilteredDemandas(demandasFiltradas);
    } catch (error) {
      console.error('Error al filtrar por rubro:', error);
    }
  };

  const aplicarFiltros = (demandasParaFiltrar: any[]) => {
    let demandasFiltradas = [...demandasParaFiltrar];
  
    if (searchQuery) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.detalle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (categoriaSeleccionada && !rubroSeleccionado) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.categorias?.id === categoriaSeleccionada
      );
    }
  
    if (rubroSeleccionado) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.rubros?.id === rubroSeleccionado
      );
    }
  
    if (ordenId === 'desc') {
      demandasFiltradas.sort((a, b) => b.id - a.id);
    } else if (ordenId === 'asc') {
      demandasFiltradas.sort((a, b) => a.id - b.id);
    }
  
    setFilteredDemandas(demandasFiltradas);
    setCurrentPage(1); // Reset a página 1 cuando aplican nuevos filtros
  };

  useEffect(() => {
    aplicarFiltros(demandas);
  }, [searchQuery, categoriaSeleccionada, rubroSeleccionado, demandas, ordenId]);

  const resetFilters = () => {
    setCategoriaSeleccionada('');
    setRubroSeleccionado('');
    setSearchQuery('');
    setOrdenId('');
    setFilteredDemandas(demandas);
    setCurrentPage(1); // Reset a página 1 cuando reinician filtros
  };

  // Cálculos para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDemandas = filteredDemandas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDemandas.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generar array de números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // Render simplificado para servidor
  if (!isMounted) {
    return (
      <div className="mb-4 mt-[6rem] lg:mt-40">
        {/* Filtros simplificados para SSR */}
        <div className="hidden lg:flex lg:items-center lg:justify-between gap-6 mb-6">
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <div className="react-select__placeholder">Seleccionar Categoría</div>
          </div>
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <div className="react-select__placeholder">Seleccionar Rubro</div>
          </div>
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <div className="react-select__placeholder">Ordenar por</div>
          </div>
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <Search
              placeholder="Buscar Necesidades..."
              handleSearch={setSearchQuery}
            />
          </div>
        </div>
        {/* Loading state para las demandas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-pulse bg-gray-200 rounded-lg p-6 h-40"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg p-6 h-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 mt-[6rem] lg:mt-40">
      {/* Botón para mostrar/ocultar filtros en móvil */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none mb-4 mt-5"
      >
        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
      </button>

      {/* Filtros */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:flex lg:items-center lg:justify-between gap-6 mb-6`}>
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <Select
            instanceId="categoria-select"
            options={categorias
              .slice()
              .sort((a, b) => a.categoria.localeCompare(b.categoria))
              .map((categoria) => ({
                value: categoria.id,
                label: categoria.categoria,
              }))
            }
            value={categorias
              .map((categoria) => ({
                value: categoria.id,
                label: categoria.categoria,
              }))
              .find((option) => option.value === categoriaSeleccionada) || null
            }
            onChange={(selectedOption) => handleCategoriaChange(selectedOption?.value || '')}
            placeholder="Seleccionar Categoría"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <Select
            instanceId="rubro-select"
            options={rubros.map((rubro) => ({
              value: rubro.id,
              label: rubro.nombre,
            }))}
            onChange={(selectedOption) => handleRubroChange(selectedOption?.value || '')}
            value={rubros.find((rubro) => rubro.id === rubroSeleccionado) ? {
              value: rubroSeleccionado,
              label: rubros.find((rubro) => rubro.id === rubroSeleccionado)?.nombre,
            } : null}
            placeholder="Seleccionar Rubro"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <Select
            instanceId="ordenar-select"
            options={[
              { value: '', label: 'Ordenar por' },
              { value: 'desc', label: 'Más antiguas primero' },
              { value: 'asc', label: 'Más recientes primero' }
            ]}
            onChange={(selectedOption) => {
              const value = selectedOption?.value || '';
              setOrdenId(value);
              setTimeout(() => {
                aplicarFiltros(demandas);
              }, 0);
            }}
            value={ordenId ? { value: ordenId, label: ordenId === 'asc' ? 'Más recientes primero' : 'Más antiguas primero' } : null}
            placeholder="Ordenar por"
            className="react-select-container"
            classNamePrefix="react-select"
            isClearable
          />
        </div>

        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <Search
            placeholder="Buscar Necesidades..."
            handleSearch={setSearchQuery}
          />
        </div>

        <div className="w-full lg:w-auto">
          <button
            onClick={resetFilters}
            className="w-full lg:w-auto py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
          >
            Reiniciar Filtros
          </button>
        </div>
      </div>

      {/* Información de paginación */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <div>
          Mostrando {currentDemandas.length} de {filteredDemandas.length} demandas
        </div>
        <div>
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Lista de demandas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {currentDemandas.length > 0 ? (
          currentDemandas.map((demanda) => (
            <div
              key={demanda.id}
              className="relative border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">[{demanda.id}] </p>
                <h3 className="text-lg font-semibold truncate">{demanda.detalle}</h3>
                {demanda.pais && demanda.pais.bandera_url && (
                  <Image
                    src={demanda.pais.bandera_url}
                    alt={`Bandera de ${demanda.pais.nombre}`}
                    width={20}
                    height={12}
                    className="ml-2"
                  />
                )}
              </div>
              <p className="text-gray-700 mt-2">
                <strong>Categoría:&nbsp;</strong> {demanda.categorias?.categoria || 'Sin categoría'}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Rubro:&nbsp;</strong> {demanda.rubros?.nombre || "Sin rubro"}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Fecha de inicio:&nbsp;</strong>{' '}
                {new Date(demanda.fecha_inicio).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Fecha de vencimiento:&nbsp;</strong>{' '}
                {new Date(demanda.fecha_vencimiento).toLocaleDateString()}
                {(() => {
                  const fechaVencimiento = new Date(demanda.fecha_vencimiento);
                  const fechaActual = new Date();
                  const diasRestantes = Math.ceil(
                    (fechaVencimiento.getTime() - fechaActual.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return diasRestantes > 0
                    ? ` (Faltan ${diasRestantes} días)`
                    : ` (¡Venció hace ${Math.abs(diasRestantes)} días!)`;
                })()}
              </p>

              {/* Botón "Saber más" con estilos mejorados */}
              <div className="mt-4">
                <div className="flex items-center justify-center mt-auto">
                  <span className="flex-grow border-t border-gray-300 mr-2"></span>
                  <button
                    onClick={() => abrirModal(demanda)}
                    className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                  >
                    Saber más
                  </button>
                  <span className="flex-grow border-t border-gray-300 ml-2"></span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay demandas disponibles.</p>
        )}
      </div>

      {/* Componente de Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {/* Botón Anterior */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
          >
            Anterior
          </button>

          {/* Números de página */}
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === number
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {number}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal */}
      <ModalDetallesPago isOpen={modalOpen} onClose={cerrarModal} demanda={demandaSeleccionada} userId={userId} />
    </div>
  );
}
