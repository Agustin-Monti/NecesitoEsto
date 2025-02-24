"use client";

import { useState, useEffect } from "react";
import { updateProfileAction } from "@/actions/profile-actions";

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
  telefono:string;
}

interface DatosGeneralesProps {
  data: Profile;
}

const DatosGenerales: React.FC<DatosGeneralesProps> = ({ data }) => {
  const [profile, setProfile] = useState<Profile>(data);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formattedFecha, setFormattedFecha] = useState<string>("");

  useEffect(() => {
    setFormattedFecha(formatFecha(profile.created_at));
  }, [profile.created_at]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key !== "fecha_creacion" && key !== "id") formData.append(key, value as string);
      });

      const result = await updateProfileAction(formData);
      if (result.success) {
        setSuccess(true);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  const formatFecha = (fecha: string | undefined | null): string => {
    if (!fecha) {
      console.log("Fecha no disponible: el valor es null o undefined");
      return "Fecha no disponible";
    }
  
    try {  
      // Intentar convertir la fecha eliminando milisegundos y zona horaria
      const fechaProcesada = fecha.split(".")[0]; // Eliminamos la parte de los milisegundos
      const fechaObj = new Date(fechaProcesada);
  
      if (isNaN(fechaObj.getTime())) {
        console.log("Fecha inválida después de procesar:", fechaProcesada);
        return "Fecha inválida";
      }
  
      // Extraer día, mes y año
      const dia = fechaObj.getUTCDate().toString().padStart(2, "0");
      const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0");
      const anio = fechaObj.getUTCFullYear();
  
      return `${dia}/${mes}/${anio}`;
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha inválida";
    }
  };
  
  

  return (
    <div className="text-center pb-5 mt-40">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Perfil actualizado con éxito</div>}

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Campo Nombre */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Nombre</label>
          <input
            type="text"
            value={profile.nombre}
            onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Apellido */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Apellido</label>
          <input
            type="text"
            value={profile.apellido}
            onChange={(e) => setProfile({ ...profile, apellido: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Provincia */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Provincia</label>
          <input
            type="text"
            value={profile.provincia}
            onChange={(e) => setProfile({ ...profile, provincia: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Municipio */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Municipio</label>
          <input
            type="text"
            value={profile.municipio}
            onChange={(e) => setProfile({ ...profile, municipio: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Localidad */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Localidad</label>
          <input
            type="text"
            value={profile.localidad}
            onChange={(e) => setProfile({ ...profile, localidad: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Dirección */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Dirección</label>
          <input
            type="text"
            value={profile.direccion}
            onChange={(e) => setProfile({ ...profile, direccion: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Código Postal */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Código Postal</label>
          <input
            type="text"
            value={profile.codigo_postal}
            onChange={(e) => setProfile({ ...profile, codigo_postal: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>

        {/* Campo Telefono */}
        <div className="flex flex-col mb-1">
          <label className="block mb-2 font-semibold">Telefono</label>
          <input
            type="text"
            value={profile.telefono}
            onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
            className="border border-slate-950 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition bg-white"
          />
        </div>
      </div>

      {/* Mostrar la fecha de creación al final correctamente */}
      <div className="mt-6">
        <label className="block mb-2 font-semibold">Fecha de Creación</label>
        <p className="border border-slate-950 rounded-md p-3 bg-gray-100 shadow-sm">
          {formattedFecha}
        </p>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default DatosGenerales;
