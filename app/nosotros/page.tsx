import React from "react";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white mt-5">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Líderes en soluciones innovadoras con años de experiencia 
              transformando ideas en resultados concretos para el sector industrial.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Grid con imagen y texto */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="bg-blue-50 rounded-2xl p-8">
                  <InnovationSVG />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nuestra Esencia
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  En nuestra empresa, nos dedicamos a ofrecer soluciones innovadoras 
                  y de alta calidad para nuestros clientes. Con años de experiencia 
                  en el sector industrial, trabajamos para brindar los mejores 
                  productos y servicios.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nos enfocamos en la satisfacción del cliente y en la mejora continua, 
                  buscando siempre las mejores prácticas y las tecnologías más avanzadas.
                </p>
              </div>
            </div>

            {/* Misión y Valores */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gray-50 rounded-2xl p-8">
                <TargetSVG />
                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Transformar ideas en soluciones concretas que ayuden a nuestros 
                  clientes a alcanzar sus objetivos mediante la creación de 
                  plataformas innovadoras como "Necesito Esto".
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <ValuesSVG />
                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                  Nuestros Valores
                </h3>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Transparencia y honestidad
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Responsabilidad en todos los procesos
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Servicio personalizado
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Confianza duradera
                  </li>
                </ul>
              </div>
            </div>

            {/* Plataforma Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">
                  Innovación en Acción
                </h2>
                <p className="text-lg mb-4 leading-relaxed">
                  La creación de nuestra nueva plataforma "Necesito Esto" permitirá 
                  agilizar en las empresas las gestiones al momento de satisfacer 
                  necesidades y ser una herramienta útil disponible en su ámbito de trabajo.
                </p>
                <p className="text-lg leading-relaxed">
                  Esta iniciativa refleja nuestro compromiso con la evolución 
                  constante y la adaptación a las necesidades del mercado moderno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// SVG Components
const InnovationSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto">
    <path
      d="M200 50 L250 150 L150 150 Z"
      fill="#3B82F6"
      fillOpacity="0.2"
      stroke="#3B82F6"
      strokeWidth="2"
    />
    <circle cx="200" cy="100" r="40" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
    <path
      d="M100 200 Q200 150 300 200"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeDasharray="5,5"
    />
    <circle cx="100" cy="200" r="8" fill="#3B82F6" />
    <circle cx="200" cy="150" r="8" fill="#3B82F6" />
    <circle cx="300" cy="200" r="8" fill="#3B82F6" />
  </svg>
);

const TargetSVG = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-blue-600">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

const ValuesSVG = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-blue-600">
    <path
      d="M50 20 L80 40 L80 80 L20 80 L20 40 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);
