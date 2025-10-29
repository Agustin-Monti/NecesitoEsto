// app/soporte/page.tsx
export default function SoportePage() {
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
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Asunto</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-2">Descripción del problema</label>
            <textarea className="w-full p-2 border rounded h-32 bg-white"></textarea>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );

}
