"use client";

export default function Seccion() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explora un mundo lleno de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              oportunidades
            </span>{" "}
            🌟
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8"></div>
        </div>

        {/* Contenedor principal de contenido */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Primer párrafo */}
            <div className="group">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                Imagina tener acceso a una variedad de{" "}
                <span className="font-semibold text-blue-600 group-hover:text-cyan-600 transition-colors duration-300">
                  Demandas de Bienes, Materiales y servicios especializados
                </span>
                , realizando un pago mínimo que abre las posibilidades de un nuevo negocio.
              </p>
            </div>

            {/* Segundo párrafo */}
            <div className="group">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                Este modelo no solo es{" "}
                <span className="font-semibold text-blue-600 group-hover:text-cyan-600 transition-colors duration-300">
                  económico
                </span>
                , sino que también pone el control en tus manos, permitiéndote elegir la solución más conveniente dentro de aquellos que ofrezcan la mejor propuesta.
              </p>
            </div>

            {/* Tercer párrafo */}
            <div className="group">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                Ya sea que busques diseño, desarrollo web, marketing, consultoría o cualquier otro servicio, este sistema abre las puertas a obtener{" "}
                <span className="font-semibold text-blue-600 group-hover:text-cyan-600 transition-colors duration-300">
                  soluciones flexibles y propuestas personalizadas
                </span>
                .
              </p>
            </div>

            {/* Cuarto párrafo */}
            <div className="group">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                Cada oferta representa una posibilidad de{" "}
                <span className="font-semibold text-blue-600 group-hover:text-cyan-600 transition-colors duration-300">
                  crecimiento, innovación
                </span>{" "}
                o simplemente la ayuda que necesitas para alcanzar tus metas.
              </p>
            </div>

            {/* Destacado final */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 mt-8">
              <p className="text-lg md:text-xl text-gray-800 font-medium text-center">
                💡{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-bold">
                  Atrévete a explorar.
                </span>{" "}
                Confía en este enfoque dinámico y práctico, donde cada elección es una inversión estratégica y accesible donde las grandes oportunidades están a solo una oferta de distancia.
              </p>
            </div>
          </div>
        </div>

        {/* Llamada final */}
        <div className="text-center">
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 transform hover:scale-105 transition-transform duration-300">
            Convierte cada clic en una puerta hacia{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              nuevas posibilidades de Negocios
            </span>{" "}
            🚀
          </h4>
          
          {/* Línea decorativa */}
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
