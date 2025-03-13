"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { createDemandAction, getCategorias, getPaises, getRubros } from "@/actions/demanda-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { Alert } from "@/components/ui/alert";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

type CreateDemandResponse = {
  success: boolean;
  message: string;
};

export default function CreateDemandPage() {
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
  const [customRubro, setCustomRubro] = useState("");
  const [isCustomRubro, setIsCustomRubro] = useState(false);

  useEffect(() => {
    console.log("Estado actualizado:", status, success);
  }, [status, success]);

  

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        return (
          <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
            {error.message}
          </div>
        );
      }

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setProfile(profileData || {});
        }
        setUser(user);
        setDemand((prev: any) => ({
          ...prev,
          profile_id: user.id,
          responsable_solicitud: profileData?.nombre || "",
          email_contacto: profileData?.email || "",
          telefono: profileData?.telefono || "",
        }));
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
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchRubros = async () => {
      try {
        const rubrosData = await getRubros();
        setRubros(rubrosData);
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
    return <p className="text-2xl font-bold mb-4 text-black text-center">Cargando Formulario de Crear Necesidad...</p>;
  }

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

    // Si el valor es un objeto Date, conviértelo a una cadena en formato YYYY-MM-DD
    if (value instanceof Date) {
      formattedValue = value.toISOString().split("T")[0];
    }

    setDemand((prev: any) => ({
      ...prev,
      [key]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSuccess(null);

    try {
      const response: CreateDemandResponse = await createDemandAction(demand);
      console.log("Respuesta del servidor:", response);

      if (response.success) {
        setStatus("success");
        setSuccess(
          "Su demanda fue creada correctamente y pasará a evaluarse. " +
          "En unos minutos recibirá un correo electrónico con el resultado de la evaluación."
        );
      } else {
        setStatus("error");
        setSuccess(response.message || "Error al crear la demanda.");
      }
    } catch (error) {
      setStatus("error");
      setSuccess("Hubo un problema al procesar la solicitud.");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div>
        {status && success && (
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
            }}
          />
        )}
      </div>

      <form
        className="flex flex-col max-w-3xl mx-auto mt-20"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            className="border border-solid border-slate-950"
            name="empresa"
            placeholder="Nombre de la empresa"
            required
            value={demand.empresa}
            onChange={handleChange}
          />

          <Label htmlFor="pais_id">Paises</Label>
          <select
            name="pais_id"
            required
            value={demand.pais_id}
            onChange={handleChange}
            className="border p-2 rounded mb-2 border-solid border-slate-950 bg-white"
          >
            <option value="" disabled>Selecciona un Pais</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.nombre}
              </option>
            ))}
          </select>

          <Label htmlFor="responsable_solicitud">Responsable de la solicitud</Label>
          <Input
            name="responsable_solicitud"
            placeholder="Nombre del responsable"
            required
            value={profile?.nombre || ""}
            onChange={handleChange}
            className="border border-solid border-slate-950"
          />

          <Label htmlFor="email_contacto">Email de contacto</Label>
          <Input
            name="email_contacto"
            placeholder="email@ejemplo.com"
            type="email"
            required
            value={profile?.email || ""}
            onChange={handleChange}
            className="border border-solid border-slate-950"
          />

          <Label htmlFor="telefono">Teléfono de contacto</Label>
          <Input
            name="telefono"
            placeholder="Número de teléfono"
            type="tel"
            required
            value={demand.telefono}
            onChange={handleChange}
            className="border border-solid border-slate-950"
          />

          <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
          <DatePicker
            onChange={(date) => handleDemandChange("fecha_inicio", date)}
            value={demand.fecha_inicio ? new Date(demand.fecha_inicio) : null}
            className="border border-solid border-slate-950"
          />

          <Label htmlFor="fecha_vencimiento">Fecha de vencimiento</Label>
          <DatePicker
            onChange={(date) => handleDemandChange("fecha_vencimiento", date)}
            value={demand.fecha_vencimiento ? new Date(demand.fecha_vencimiento) : null}
            className="border border-solid border-slate-950"
          />

          <Label htmlFor="id_categoria">Categoria</Label>
          <select
            name="id_categoria"
            required
            value={demand.id_categoria}
            onChange={handleChange}
            className="border p-2 rounded mb-2 border-solid border-slate-950"
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </select>

          <Label htmlFor="rubro">Rubro <strong className="text-gray-400 text-x">(Escribe tu rubro para buscar el adecuado)</strong></Label>
          <Select
            name="rubro"
            options={[
              ...rubros.map((rubro) => ({ value: rubro.id, label: rubro.nombre })),
              { value: "otro", label: "Otro (Agregar nuevo rubro)" },
            ]}
            onChange={(selectedOption) => {
              if (selectedOption?.value === "otro") {
                setIsCustomRubro(true);
                handleDemandChange("rubro", "");
              } else {
                setIsCustomRubro(false);
                handleDemandChange("rubro", selectedOption?.value ?? "");
              }
            }}
            className="mb-2 border border-solid border-slate-950"
            placeholder="Selecciona un rubro"
          />

          {isCustomRubro && (
            <input
              type="text"
              placeholder="Ingrese nuevo rubro"
              value={customRubro}
              onChange={(e) => {
                setCustomRubro(e.target.value);
                handleDemandChange("rubro", e.target.value);
              }}
              className="border p-2 mb-2 border-solid border-slate-950"
            />
          )}

          <Label htmlFor="detalle">Detalle</Label>
          <textarea
            name="detalle"
            placeholder="Describa el detalle de la demanda"
            required
            value={demand.detalle}
            onChange={handleChange}
            className="border border-solid border-slate-950"
            rows={4}
          />

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Crear Demanda
          </button>
        </div>
      </form>
    </>
  );
}
