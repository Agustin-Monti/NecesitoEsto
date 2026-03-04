'use client';

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import Slider from "react-slick";
import Image from "next/image";
import ModalDetallesPago from "@/components/ModalDetallesPago";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function SliderDemandas({
  demandas,
  userId,
}: {
  demandas: any[];
  userId: string | null;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [demandaSeleccionada, setDemandaSeleccionada] = useState<any>(null);
  const { theme } = useTheme();

  // 🧠 Memorizar settings para no recalcular en cada render
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      appendDots: (dots: React.ReactNode) => (
        <div
          style={{ display: "flex", justifyContent: "center", gap: "15px" }}
          className={theme === "dark" ? "text-white" : "text-black"}
        >
          {dots}
        </div>
      ),
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
    }),
    [theme]
  );

  const abrirModal = (demanda: any) => {
    setDemandaSeleccionada(demanda);
    setModalOpen(true);
  };

  const cerrarModal = () => setModalOpen(false);

  

  return (
    <>
      <div className="relative z-10 bg-white">
        {demandas.length > 0 ? (
          <Slider {...settings} className="gap-2 mr-4 mb-10">
            {demandas.map((demanda) => {
              const banderaUrl =
                demanda.pais?.bandera_url &&
                demanda.pais.bandera_url !== "null"
                  ? demanda.pais.bandera_url
                  : "/placeholder-bandera.png";

                  const esNueva =
                  new Date(demanda.fecha_inicio) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

              return (
                <div key={demanda.id} className="mr-4 p-3">
                  <div
                    className={`
                      relative bg-white rounded-2xl p-5 h-80 flex flex-col justify-between
                      transition-all duration-300 hover:-translate-y-1
                      ${
                        esNueva
                          ? "border-2 border-yellow-400 shadow-md"
                          : "border border-gray-100 shadow-sm hover:shadow-lg"
                      }
                    `}
                  >
                    {/* Label NUEVO flotante */}
                    {esNueva && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                        NUEVO
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 font-medium">
                        #{demanda.id}
                      </span>

                      <Image
                        src={banderaUrl}
                        alt={demanda.pais?.nombre || "País"}
                        width={22}
                        height={16}
                        className="rounded-sm object-cover"
                      />
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-semibold mt-2 line-clamp-2">
                      {demanda.detalle}
                    </h3>

                    <div className="border-t my-3"></div>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-800">Categoría</p>
                        <p>{demanda.categorias?.categoria}</p>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">Rubro</p>
                        <p>{demanda.rubros?.nombre}</p>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">Inicio</p>
                        <p>
                          {new Date(demanda.fecha_inicio).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">Vence</p>
                        <p>
                          {new Date(demanda.fecha_vencimiento).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Botón */}
                    <button
                      onClick={() => abrirModal(demanda)}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center py-10 text-gray-500">
            No hay demandas disponibles.
          </p>
        )}
      </div>

      {/* Modal de detalles */}
      <ModalDetallesPago
        isOpen={modalOpen}
        onClose={cerrarModal}
        demanda={demandaSeleccionada}
        userId={userId}
      />
    </>
  );
}
