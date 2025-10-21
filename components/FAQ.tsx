// components/FAQ.tsx
"use client";

import { useState } from 'react';

export default function FAQ() {
  const [categoriaActiva, setCategoriaActiva] = useState('general');
  const [preguntaAbierta, setPreguntaAbierta] = useState<number | null>(null);

  const categoriasFAQ = [
    {
      id: 'general',
      nombre: 'General',
      icono: 'ℹ️'
    },
    {
      id: 'demandantes',
      nombre: 'Para Demandantes',
      icono: '👤'
    },
    {
      id: 'proveedores',
      nombre: 'Para Proveedores',
      icono: '💼'
    },
    {
      id: 'pagos',
      nombre: 'Pagos y Facturación',
      icono: '💳'
    },
    {
      id: 'cuenta',
      nombre: 'Cuenta y Seguridad',
      icono: '🔒'
    },
    {
      id: 'tecnicos',
      nombre: 'Problemas Técnicos',
      icono: '🔧'
    }
  ];

  const preguntas = [
    {
      id: 1,
      categoria: 'general',
      pregunta: '¿Qué es "Necesito Esto!"?',
      respuesta: '"Necesito Esto!" es una plataforma que conecta a personas con necesidades específicas (demandantes) con proveedores que pueden satisfacer esas necesidades. Los demandantes publican lo que necesitan y los proveedores pagan por acceder a su información de contacto para hacer ofertas directas.'
    },
    {
      id: 2,
      categoria: 'general',
      pregunta: '¿Cómo funciona el modelo de pago por oferta?',
      respuesta: 'Los proveedores pagan una tarifa única por cada demanda que les interese. Al pagar, reciben la información de contacto completa del demandante para comunicarse directamente y presentar su propuesta. El pago no garantiza que ganen el trabajo, solo el acceso a la oportunidad.'
    },
    {
      id: 3,
      categoria: 'general',
      pregunta: '¿Es gratuito publicar una demanda?',
      respuesta: 'Sí, publicar demandas es completamente gratuito. Solo los proveedores pagan cuando deciden contactar a un demandante específico.'
    },
    {
      id: 4,
      categoria: 'demandantes',
      pregunta: '¿Cómo publico una demanda?',
      respuesta: 'Para publicar una demanda: 1) Inicia sesión en tu cuenta, 2) Haz clic en "Publicar Demanda", 3) Completa el formulario con todos los detalles de tu necesidad, 4) Revisa y publica. Tu demanda será revisada y estará visible en 24 horas.'
    },
    {
      id: 5,
      categoria: 'demandantes',
      pregunta: '¿Puedo editar mi demanda después de publicarla?',
      respuesta: 'Sí, puedes editar tu demanda en cualquier momento desde tu panel de control. Sin embargo, si ya hay proveedores que han pagado por acceder a tu información, se recomienda no cambiar detalles fundamentales sin notificarlos.'
    },
    {
      id: 6,
      categoria: 'demandantes',
      pregunta: '¿Cómo elijo al mejor proveedor?',
      respuesta: 'Te recomendamos evaluar a los proveedores basándote en: su experiencia, valoraciones de otros usuarios, calidad de la propuesta, precio y plazo de entrega. La plataforma te muestra información relevante para tomar la mejor decisión.'
    },
    {
      id: 7,
      categoria: 'proveedores',
      pregunta: '¿Qué información recibo al pagar por una oferta?',
      respuesta: 'Al realizar el pago, recibirás inmediatamente: nombre completo del demandante, email de contacto, teléfono, y todos los detalles específicos de la demanda que publicó.'
    },
    {
      id: 8,
      categoria: 'proveedores',
      pregunta: '¿Puedo hacer ofertas a múltiples demandas?',
      respuesta: 'Sí, puedes hacer ofertas a tantas demandas como desees. Cada oferta requiere un pago individual. Te recomendamos enfocarte en demandas que se alineen con tu expertise.'
    },
    {
      id: 9,
      categoria: 'proveedores',
      pregunta: '¿Hay límite en la cantidad de ofertas que puedo hacer?',
      respuesta: 'No hay límite en la cantidad de ofertas. Puedes hacer todas las ofertas que consideres oportunas para tu negocio.'
    },
    {
      id: 10,
      categoria: 'pagos',
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos Mercado Pago, PayPal, tarjetas de crédito/débito (Visa, MasterCard, American Express) y transferencias bancarias. Todos los pagos son procesados de forma segura y encriptada.'
    },
    {
      id: 11,
      categoria: 'pagos',
      pregunta: '¿Ofrecen factura por los pagos?',
      respuesta: 'Sí, emitimos factura A por todos los pagos realizados en la plataforma. La recibirás automáticamente en tu email registrado después de cada transacción.'
    },
    {
      id: 12,
      categoria: 'pagos',
      pregunta: '¿Hay reembolsos si no gano el trabajo?',
      respuesta: 'Los pagos por ofertas no son reembolsables, ya que proporcionamos acceso inmediato a información valiosa del demandante. El pago es por la oportunidad de contacto, no por el resultado del negocio.'
    },
    {
      id: 13,
      categoria: 'cuenta',
      pregunta: '¿Cómo creo una cuenta?',
      respuesta: 'Puedes crear una cuenta haciendo clic en "Registrarse" en la esquina superior derecha. Necesitarás proporcionar tu nombre, email, y crear una contraseña. Luego podrás completar tu perfil con información adicional.'
    },
    {
      id: 14,
      categoria: 'cuenta',
      pregunta: '¿Qué hago si olvidé mi contraseña?',
      respuesta: 'Haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Ingresa tu email y recibirás un enlace para restablecer tu contraseña.'
    },
    {
      id: 15,
      categoria: 'cuenta',
      pregunta: '¿Puedo eliminar mi cuenta?',
      respuesta: 'Sí, puedes eliminar tu cuenta desde la configuración de tu perfil. Ten en cuenta que esta acción es irreversible y perderás todo tu historial en la plataforma.'
    },
    {
      id: 16,
      categoria: 'tecnicos',
      pregunta: 'No puedo iniciar sesión, ¿qué hago?',
      respuesta: 'Verifica que estés usando el email y contraseña correctos. Si olvidaste tu contraseña, usa la opción de recuperación. Si el problema persiste, contáctanos por email a soporte@necesitoesto.com'
    },
    {
      id: 17,
      categoria: 'tecnicos',
      pregunta: 'Mi demanda no aparece publicada',
      respuesta: 'Las demandas pasan por un proceso de revisión para asegurar la calidad del contenido. Si después de 24 horas tu demanda no está publicada, contáctanos para verificar el estado.'
    },
    {
      id: 18,
      categoria: 'tecnicos',
      pregunta: 'No recibí la información del demandante después de pagar',
      respuesta: 'La información se envía automáticamente al completar el pago. Verifica tu bandeja de entrada y carpeta de spam. Si no la recibes en 15 minutos, contáctanos con el número de transacción.'
    }
  ];

  const preguntasFiltradas = preguntas.filter(pregunta => 
    categoriaActiva === 'general' || pregunta.categoria === categoriaActiva
  );

  const togglePregunta = (id: number) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="text-center">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encuentra respuestas rápidas a las preguntas más comunes sobre nuestra plataforma
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categoriasFAQ.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
              categoriaActiva === categoria.id
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <span>{categoria.icono}</span>
            <span>{categoria.nombre}</span>
          </button>
        ))}
      </div>

      {/* Lista de preguntas */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {preguntasFiltradas.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors duration-300"
          >
            <button
              onClick={() => togglePregunta(item.id)}
              className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {item.pregunta}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  preguntaAbierta === item.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {preguntaAbierta === item.id && (
              <div className="px-6 pb-6 bg-gray-50 animate-fadeIn">
                <p className="text-gray-700 leading-relaxed">
                  {item.respuesta}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sección de contacto */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿No encontraste tu respuesta?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta específica que tengas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:soporte@necesitoesto.com"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 inline-block"
          >
            📧 Contactar por Email
          </a>
          <a 
            href="/centro-ayuda"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 inline-block"
          >
            📚 Centro de Ayuda
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>📞 Teléfono: +54 9 11 1234-5678</p>
          <p>🕒 Horario de atención: Lunes a Viernes 9:00 - 18:00</p>
          <p>⏰ Tiempo de respuesta: Generalmente en menos de 4 horas</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );

}
