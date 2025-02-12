const pasos = [
  {
    id: 1,
    imgSrc: "/pasos/paso1.png", // Ruta de la imagen de conversación
    title: "Dinos que necesitas",
    description:
      "Cuéntanos sobre tu necesidad y nosotros lo pondremos a disposición de profesionales recomendados que te ayudarán a hacerlo realidad."
  },
  {
    id: 2,
    imgSrc: "/pasos/paso2.png", // Ruta de la imagen de documentos
    title: "Recibe múltiples propuestas",
    description:
      "En pocas horas recibirás las propuestas solicitadas. Conversa y evacúa dudas a través de nuestro chat. Compara reputación, experiencia y presupuestos."
  },
  {
    id: 3,
    imgSrc: "/pasos/paso3.png", // Ruta de la imagen de usuario con check
    title: "Elige",
    description:
      "Cuando tengas toda la información, contrata de manera directa y abona sin intermediarios ni sobrecostos."
  }
];

export default function Pasos() {
  return (
    <section className="text-center py-20"> {/* Sección más grande con padding */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6"> {/* Título más grande */}
        ¿CÓMO FUNCIONA NESECITO<span className="text-blue-700">ESTO!</span>
      </h2>
      <p className="text-blue-700 mt-2">Es muy sencillo.</p>
      <p className="text-gray-600 mb-12"> {/* Más espacio entre párrafos */}
        Tan solo sigue estos tres pasos y en pocas horas encontrarás necesidades
        para lo que estás buscando.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {pasos.map((paso) => (
          <div key={paso.id} className="flex flex-col items-center text-center">
            {/* Imagen de 250px x 250px */}
            <div className="mb-6">
              <img
                src={paso.imgSrc}
                alt={paso.title}
                className="w-[300px] h-[300px] object-contain" // Imagen más grande
              />
            </div>
            <h3 className="text-lg font-bold text-teal-600 mb-2">{paso.title}</h3>
            <p className="text-gray-600 max-w-sm">{paso.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
