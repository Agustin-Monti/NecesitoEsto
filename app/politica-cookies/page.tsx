// app/politica-cookies/page.tsx
import LegalPageLayout from '@/components/LegalPageLayout';

export default function PoliticaCookies() {
  const cookies = [
    {
      categoria: "Cookies Esenciales",
      descripcion: "Necesarias para el funcionamiento básico del sitio",
      ejemplos: [
        "Autenticación de usuarios",
        "Seguridad del sitio",
        "Preferencias de consentimiento"
      ],
      duracion: "Sesión o permanentes"
    },
    {
      categoria: "Cookies de Rendimiento",
      descripcion: "Nos ayudan a entender cómo los visitantes interactúan con el sitio",
      ejemplos: [
        "Análisis de tráfico",
        "Tiempos de carga",
        "Errores de página"
      ],
      duracion: "1-2 años"
    },
    {
      categoria: "Cookies de Funcionalidad",
      descripcion: "Permiten funcionalidades avanzadas y personalización",
      ejemplos: [
        "Preferencias de idioma",
        "Configuraciones regionales",
        "Características compartidas"
      ],
      duracion: "1 año"
    },
    {
      categoria: "Cookies de Marketing",
      descripcion: "Utilizadas para mostrar publicidad relevante",
      ejemplos: [
        "Segmentación de anuncios",
        "Medición de campañas",
        "Redes sociales"
      ],
      duracion: "90 días - 1 año"
    }
  ];

  return (
    <LegalPageLayout title="Política de Cookies">
      <div className="space-y-8">
        <section>
          <h2>1. ¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su 
            dispositivo cuando visita nuestro sitio web. Son ampliamente utilizadas 
            para hacer que los sitios web funcionen de manera más eficiente, así 
            como para proporcionar información a los propietarios del sitio.
          </p>
        </section>

        <section>
          <h2>2. Tipos de Cookies que Utilizamos</h2>
          <div className="space-y-6">
            {cookies.map((cookie, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cookie.categoria}
                </h3>
                <p className="text-gray-700 mb-3">{cookie.descripcion}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ejemplos:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {cookie.ejemplos.map((ejemplo, i) => (
                        <li key={i}>{ejemplo}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duración:</h4>
                    <p className="text-gray-700">{cookie.duracion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>3. Cookies de Terceros</h2>
          <p>Utilizamos servicios de terceros que pueden instalar cookies:</p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Para analizar el uso del sitio
            </li>
            <li>
              <strong>Google reCAPTCHA:</strong> Para seguridad y prevención de spam
            </li>
            <li>
              <strong>Mercado Pago:</strong> Para procesamiento de pagos
            </li>
            <li>
              <strong>PayPal:</strong> Para procesamiento de pagos internacionales
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Gestión de Cookies</h2>
          <p>Puede controlar y/o eliminar las cookies como desee:</p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Configuración del Navegador</h3>
          <ul>
            <li>
              <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
            </li>
            <li>
              <strong>Firefox:</strong> Opciones → Privacidad & Seguridad → Cookies
            </li>
            <li>
              <strong>Safari:</strong> Preferencias → Privacidad → Cookies
            </li>
            <li>
              <strong>Edge:</strong> Configuración → Privacidad y servicios → Cookies
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Herramientas de Opt-Out</h3>
          <ul>
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">
                Google Analytics Opt-Out
              </a>
            </li>
            <li>
              <a href="https://www.youronlinechoices.com/" className="text-blue-600 hover:underline">
                Your Online Choices
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Consecuencias de Deshabilitar Cookies</h2>
          <p>
            Si deshabilita las cookies, es posible que algunas funciones del sitio 
            no estén disponibles o no funcionen correctamente:
          </p>
          <ul>
            <li>No podrá iniciar sesión en su cuenta</li>
            <li>No podrá publicar demandas o hacer ofertas</li>
            <li>La personalización del sitio no funcionará</li>
            <li>Algunas características de seguridad estarán limitadas</li>
          </ul>
        </section>

        <section>
          <h2>6. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta Política de Cookies periódicamente. Le 
            notificaremos sobre cambios significativos mediante un aviso en 
            nuestro sitio web.
          </p>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Para preguntas sobre el uso de cookies: 
            <a href="mailto:privacidad@necesitoesto.com" className="text-blue-600 hover:underline ml-1">
              privacidad@necesitoesto.com
            </a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}