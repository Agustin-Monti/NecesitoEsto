"use client";

import React, { useState, useEffect } from "react";
import { updateProfileAction, getPaises } from "@/actions/profile-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function InitialProfileForm() {
  const [status, setStatus] = useState<"success" | "destructive" | "default">("default");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [paises, setPaises] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    telefono: "",
    provincia: "",
    municipio: "",
    localidad: "",
    direccion: "",
    codigo_postal: "",
    pais_id: ""
  });

  useEffect(() => {
    getPaises().then(setPaises).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const result = await updateProfileAction(form);
    
    setStatus(result.success ? "success" : "destructive");
    setMessage(result.message);
    setShowAlert(true);

    if (result.success) {
      setFormData({
        nombre: "",
        apellido: "",
        empresa: "",
        telefono: "",
        provincia: "",
        municipio: "",
        localidad: "",
        direccion: "",
        codigo_postal: "",
        pais_id: ""
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-24 mb-32">
      <h2 className="text-2xl font-bold mb-6 text-center">Completa tu perfil inicial antes de comenzar!</h2>
      
      {showAlert && (
        <Alert
          variant={status}
          title={status === "success" ? "Éxito" : "Error"}
          description={message}
          onClose={() => setShowAlert(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna 1 */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="nombre">Nombre*</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="apellido">Apellido*</Label>
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="empresa">Empresa*</Label>
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="pais_id">País*</Label>
              <select
                id="pais_id"
                name="pais_id"
                value={formData.pais_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccione...</option>
                {paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono*</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Campos adicionales */}
        <div className="space-y-3">
          <Label htmlFor="direccion">Dirección*</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="provincia">Provincia*</Label>
              <Input
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="localidad">Localidad*</Label>
              <Input
                id="localidad"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="codigo_postal">Código Postal*</Label>
              <Input
                id="codigo_postal"
                name="codigo_postal"
                value={formData.codigo_postal}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Guardar Información Inicial
        </button>
      </form>
    </div>
  );
}