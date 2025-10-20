// app/preguntas-frecuentes/page.tsx
import LegalPageLayout from '@/components/LegalPageLayout';

export default function PreguntasFrecuentes() {
  const faqs = [
    {
      categoria: "Para Demandantes",
      preguntas: [
        {
          pregunta: "¿Cuánto cuesta publicar una demanda?",
          respuesta: "La publicación de demandas es completamente gratuita. Solo pagas si decides contratar a un proveedor."
        },
        {
          pregunta: "¿Cómo elijo al mejor proveedor?",
          respuesta: "Puedes evaluar a los proveedores basándote en su perfil, experiencia y las propuestas que te envíen. La plataforma te muestra información relevante para que tomes la mejor decisión."
        },
        {
          pregunta: "¿Puedo editar mi demanda después de publicarla?",
          respuesta: "Sí, puedes editar tu demanda en cualquier momento desde tu panel de control, excepto cuando ya hay ofertas en proceso."
        }
      ]
    },
    {
      categoria: "Para Proveedores",
      preguntas: [
        {
          pregunta: "¿Cómo me contacto con el demandante?",
          respuesta: "Al realizar el pago por la oferta, recibirás inmediatamente la información de contacto del demandante para que puedas comunicarte directamente."
        },
        {
          pregunta: "¿Qué información recibo al pagar?",
          respuesta: "Recibes: nombre completo, email, teléfono y todos los detalles específicos de la demanda que publicó el usuario."
        },
        {
          pregunta: "¿Puedo hacer múltiples ofertas?",
          respuesta: "Sí, puedes hacer ofertas a tantas demandas como desees. Cada oferta requiere un pago individual."
        }
      ]
    },
    {
      categoria: "Pagos y Facturación",
      preguntas: [
        {
          pregunta: "¿Qué métodos de pago aceptan?",
          respuesta: "Aceptamos Mercado Pago, PayPal y transferencias bancarias. Todos los pagos son seguros y encriptados."
        },
        {
          pregunta: "¿Ofrecen factura?",
          respuesta: "Sí, emitimos factura A por todos nuestros servicios. La recibirás automáticamente en tu email después del pago."
        },
        {
          pregunta: "¿Hay reembolsos?",
          respuesta: "Los pagos por ofertas no son reembolsables, ya que proporcionamos acceso inmediato a información valiosa."
        }
      ]
    }
  ];

  return (
    <LegalPageLayout title="Preguntas Frecuentes">
      <div className="space-y-12">
        {faqs.map((categoria, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
              {categoria.categoria}
            </h2>
            <div className="space-y-6">
              {categoria.preguntas.map((faq, faqIndex) => (
                <div key={faqIndex} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                    <span className="text-blue-500 mr-3">Q:</span>
                    {faq.pregunta}
                  </h3>
                  <p className="text-gray-700 ml-8 flex items-start">
                    <span className="text-green-500 mr-3">A:</span>
                    {faq.respuesta}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
        
        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">¿No encontraste tu pregunta?</h3>
          <p className="text-gray-700 mb-6">
            Estamos aquí para ayudarte. Contáctanos y responderemos tus dudas.
          </p>
          <a 
            href="/soporte" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 inline-block"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </LegalPageLayout>
  );
}