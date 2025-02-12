"use client";

import { useState, useEffect } from 'react';
import ModalDetallesPago from '@/components/ModalDetallesPago';
import { getDemandasByCategoria, getRubrosByCategoria, getDemandasByRubro } from '@/actions/demanda-actions';
import Search from './ui/search';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';


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
  const searchParams = useSearchParams();

  const abrirModal = (demanda: any) => {
    setDemandaSeleccionada(demanda);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setDemandaSeleccionada(null);
  };

  // Lógica para cambiar la categoría y obtener los rubros asociados
  const handleCategoriaChange = async (idCategoria: string) => {
    setCategoriaSeleccionada(idCategoria);
    setRubroSeleccionado(''); // Reiniciar rubro cuando cambia la categoría

    try {
      // Filtrar demandas solo por la categoría seleccionada
      const demandasFiltradas = idCategoria
        ? await getDemandasByCategoria(idCategoria)
        : demandas;

      setFilteredDemandas(demandasFiltradas);
      setRubros(await getRubrosByCategoria(idCategoria)); // Cargar rubros al seleccionar una categoría
    } catch (error) {
      console.error('Error al filtrar por categoría:', error);
    }
  };

  // Lógica para cambiar el rubro y obtener las demandas filtradas por rubro
  const handleRubroChange = async (idRubro: string) => {
    setRubroSeleccionado(idRubro);

    try {
      let demandasFiltradas = [...demandas];  // Usamos las demandas iniciales

      if (idRubro) {
        // Si se ha seleccionado un rubro, obtenemos las demandas solo por ese rubro
        demandasFiltradas = await getDemandasByRubro(idRubro);
      }

      // Si no se ha seleccionado rubro, se muestran todas las demandas de la categoría seleccionada
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

  // Efecto para aplicar el filtro de búsqueda
  useEffect(() => {
    let demandasFiltradas = demandas;

    // Filtrar por búsqueda
    if (searchQuery) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.detalle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoría (si no se ha seleccionado rubro)
    if (categoriaSeleccionada && !rubroSeleccionado) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.categorias?.id === categoriaSeleccionada
      );
    }

    // Filtrar por rubro (si se ha seleccionado rubro)
    if (rubroSeleccionado) {
      demandasFiltradas = demandasFiltradas.filter((demanda) =>
        demanda.rubros?.id === rubroSeleccionado
      );
    }

    setFilteredDemandas(demandasFiltradas);
  }, [searchQuery, categoriaSeleccionada, rubroSeleccionado, demandas]);


  // Función para reiniciar todos los filtros
  const resetFilters = () => {
    setCategoriaSeleccionada('');
    setRubroSeleccionado('');
    setSearchQuery('');
    setFilteredDemandas(demandas);  // Mostrar todas las demandas sin filtros
  };

  return (
    <div className="mb-4">
      {/* Filtros */}
      <div className="flex items-center justify-between gap-6 mb-6">
        <div className="w-1/3">
          {/* Filtro de Categorías */}
          <select
            onChange={(e) => handleCategoriaChange(e.target.value)}
            value={categoriaSeleccionada}
            className="w-full py-2 px-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          {/* Filtro de Rubros */}
          <select
            onChange={(e) => handleRubroChange(e.target.value)}
            value={rubroSeleccionado}
            className="w-full py-2 px-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Seleccionar Rubro</option>
            {rubros.map((rubro) => (
              <option key={rubro.id} value={rubro.id}>
                {rubro.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          {/* Filtro de búsqueda */}
          <Search
            placeholder="Buscar Necesidades..."
            handleSearch={setSearchQuery}
          />
        </div>

        <div>
          {/* Botón para reiniciar los filtros */}
          <button
            onClick={resetFilters}
            className="ml-4 py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
          >
            Reiniciar Filtros
          </button>
        </div>
      </div>

      {/* Lista de demandas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDemandas.length > 0 ? (
          filteredDemandas.map((demanda) => (
            <div
              key={demanda.id}
              className="relative border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold truncate">{demanda.detalle}</h3>
                {demanda.pais && demanda.pais.bandera_url && (
                    <Image
                      src={demanda.pais.bandera_url}
                      alt={`Bandera de ${demanda.pais.nombre}`}
                      width={20} // Tamaño ajustado
                      height={12} // Tamaño ajustado
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

              {/* Truncado elegante de la información adicional */}
              <div className="mt-4">
                <div className="flex items-center justify-center mt-auto">
                  <span className="flex-grow border-t border-gray-300 mr-2"></span>
                  <button
                    onClick={() => abrirModal(demanda)}
                    className="text-blue-500 font-medium px-2 transition-colors duration-300 hover:text-white hover:bg-blue-500 hover:shadow-md"
                    aria-label={`Ver más sobre ${demanda.detalle}`}
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

      {/* Modal */}
      <ModalDetallesPago isOpen={modalOpen} onClose={cerrarModal} demanda={demandaSeleccionada} />
    </div>
  );
}





