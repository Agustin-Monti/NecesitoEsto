import React, { useState, useEffect } from "react";
import { getPaises, getCategorias, getRubros, updateDemanda } from "@/actions/demanda-actions";

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
}

interface ModalDemandaUsuarioProps {
  demanda: Demanda;
  closeModal: () => void;
}

const ModalDemandaUsuario: React.FC<ModalDemandaUsuarioProps> = ({ demanda, closeModal }) => {
  const [detalle, setDetalle] = useState(demanda.detalle);
  const [empresa, setEmpresa] = useState(demanda.empresa);
  const [telefono, setTelefono] = useState(demanda.telefono);
  const [fecha_inicio, setFechaInicio] = useState(demanda.fecha_inicio);
  const [fecha_vencimiento, setFechaVencimiento] = useState(demanda.fecha_vencimiento);
  const [pais, setPais] = useState<string>(demanda.pais_id || "");
  const [categoria, setCategoria] = useState<string>(demanda.id_categoria || "");
  const [rubro, setRubro] = useState<string>(demanda.rubro_id || "");
  const [paises, setPaises] = useState<{ id: string; nombre: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: string; categoria: string }[]>([]);
  const [rubros, setRubros] = useState<{ id: string; nombre: string }[]>([]);
  const [mensajeExito, setMensajeExito] = useState("");


  useEffect(() => {
    async function fetchData() {
      const paisesData = await getPaises();
      const categoriasData = await getCategorias();
      const rubrosData = await getRubros();

      setPaises(paisesData);
      setCategorias(categoriasData);
      setRubros(rubrosData);
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validar si los campos clave están vacíos
    if (!pais || !categoria || !rubro) {
      alert("Por favor, selecciona todos los campos requeridos.");
      return; // No continuar si algún campo está vacío
    }
  
    const updatedDemanda: Demanda = {
      id: demanda.id,
      detalle,
      empresa,
      telefono,
      fecha_inicio,
      fecha_vencimiento,
      pais_id: pais,
      id_categoria: categoria,
      rubro_id: rubro,
    };
  
    try {
      await updateDemanda(updatedDemanda);
  
      // Mostrar mensaje de éxito
      setMensajeExito("Editado correctamente");
  
      // Esperar 2 segundos antes de cerrar el modal
      setTimeout(() => {
        setMensajeExito("");
        closeModal(); // Cerrar el modal después de mostrar el mensaje
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar la demanda:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full sm:w-[90%] md:w-[80%] max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editar Demanda</h2>


        {/* Mensaje de éxito */}
        {mensajeExito && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-center">
            {mensajeExito}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Detalle - Ocupa toda la fila */}
          <div>
            <label className="block font-medium">Detalle:</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Detalle"
            />
          </div>
  
          {/* Empresa y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Empresa:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-white"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Empresa"
              />
            </div>
  
            <div>
              <label className="block font-medium">Teléfono:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-white"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
              />
            </div>
          </div>
  
          {/* País, Categoría y Rubro */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">País:</label>
              <select
                className="w-full p-2 border rounded bg-white"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              >
                <option value="">Selecciona un País</option>
                {paises.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block font-medium">Categoría:</label>
              <select
                className="w-full p-2 border rounded bg-white"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecciona una Categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.categoria}
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block font-medium">Rubro:</label>
              <select
                className="w-full p-2 border rounded bg-white"
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
              >
                <option value="">Selecciona un Rubro</option>
                {rubros.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Fechas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Fecha Inicio:</label>
              <input
                type="date"
                className="w-full p-2 border rounded bg-white"
                value={fecha_inicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
  
            <div>
              <label className="block font-medium">Fecha Vencimiento:</label>
              <input
                type="date"
                className="w-full p-2 border rounded bg-white"
                value={fecha_vencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </div>
          </div>
  
          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded w-full sm:w-auto"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default ModalDemandaUsuario;
