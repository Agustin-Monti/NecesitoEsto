// app/soporte/page.tsx
'use client';

import React, { useState } from "react";

export default function SoportePage() {
  const [formData, setFormData] = useState({
    asunto: '',
    descripcion: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/enviar-soporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Solicitud enviada correctamente. Te contactaremos pronto.');
        setFormData({ asunto: '', descripcion: '', email: '' });
      } else {
        setMessage('❌ Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setMessage('❌ Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Centro de Soporte</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">📞 Contacto Directo</h2>
          <p className="mb-2"><strong>Email:</strong> necesito.esto.2024@gmail.com</p>
          <p className="mb-2"><strong>Teléfono:</strong> +54 9 11 55939008</p>
          <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">❓ Preguntas Frecuentes</h2>
          <ul className="space-y-2">
            <li>• ¿Cómo crear una cuenta?</li>
            <li>• ¿Cómo restablecer mi contraseña?</li>
            <li>• ¿Qué métodos de pago aceptan?</li>
            <li>• ¿Cómo cancelar mi suscripción?</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📋 Formulario de Soporte</h2>
        
        {message && (
          <div className={`p-4 rounded-lg mb-4 ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Tu Email (opcional)</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Asunto *</label>
            <input 
              type="text" 
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe brevemente el asunto"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Descripción del problema *</label>
            <textarea 
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 bg-white"
              placeholder="Describe detalladamente el problema o consulta..."
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
}
