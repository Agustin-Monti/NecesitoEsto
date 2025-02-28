const pasos = [
  {
    id: 1,
    imgSrc: "/pasos/paso1.png", // Ruta de la imagen de conversación
    title: "Publica Gratis lo que Necesitas",
    description:
      "Detalla tu demanda de forma clara y precisa para que las personas interesadas puedan contactarse en forma directa y acercar una propuesta que sea la solución que estás buscando algo relacionado con la busqueda."
  },
  {
    id: 2,
    imgSrc: "/pasos/paso2.png", // Ruta de la imagen de documentos
    title: "Búsqueda de posibles candidatos que puedan satisfacer tu demanda.",
    description:
      "Tu demanda será publicada en distintos medios, redes sociales, empresas y prestadores de servicios. Asimismo todos los que accedan a la plataforma podrán encontrar tu demanda y evaluar la posibilidad de satisfacer la misma. De existir interes,realizando un único pago te enviaremos la informacion del representante para que te contactes y ofrezcas tu solución."
  },
  {
    id: 3,
    imgSrc: "/pasos/paso3.png", // Ruta de la imagen de usuario con check
    title: "Generación del Negocio",
    description:
      "Agregar una persona mas que sería la que ofrece la solución. Una vez confirmado el pago se envía la información del responsable de la demanda para que realicen el contacto directo de y respectiva negociación, detalles, precios, presupuestos, etc. La plataforma solo llevará estadisticas de conformidad entre la partes, no existiendo ningún otro costo adicional."
  }
];

export default function Pasos() {
  return (
    <section className="text-center py-20"> {/* Sección más grande con padding */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6"> {/* Título más grande */}
        CUAL ES EL FUNCIONAMIENTO DE  "NECESITO <span className="text-blue-700">ESTO!</span>"?
      </h2>
      <p className="text-gray-600 mb-12"> {/* Más espacio entre párrafos */}
        Detalla tu demanda de forma clara y precisa para que las personas interesadas puedan contactarse en forma directa y acercar una propuesta que sea la solución que estás buscando.
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
