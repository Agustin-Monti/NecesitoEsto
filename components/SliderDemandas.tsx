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

              return (
                <div key={demanda.id} className="mr-4 p-3">
                  <div className="border border-gray-300 h-80 p-4 rounded-lg relative text-center shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-lg font-semibold">[{demanda.id}]</p>
                      <h3 className="font-bold text-lg truncate">
                        {demanda.detalle}
                      </h3>
                      <Image
                        src={banderaUrl}
                        alt={`Bandera de ${demanda.pais?.nombre || "Sin país"}`}
                        width={20}
                        height={15}
                        className="ml-2 object-contain"
                      />
                    </div>

                    <p className="text-gray-700 text-left">
                      <strong>Categoría:&nbsp;</strong>
                      {demanda.categorias?.categoria || "Sin categoría"}
                    </p>
                    <p className="text-gray-700 text-left">
                      <strong>Rubro:&nbsp;</strong>
                      {demanda.rubros?.nombre || "Sin rubro"}
                    </p>
                    <p className="text-left">
                      <strong>Inicio:&nbsp;</strong>
                      {new Date(demanda.fecha_inicio).toLocaleDateString()}
                    </p>
                    <p className="text-left">
                      <strong>Vencimiento:&nbsp;</strong>
                      {new Date(demanda.fecha_vencimiento).toLocaleDateString()}
                    </p>

                    <button
                      onClick={() => abrirModal(demanda)}
                      className="bg-blue-500 absolute bottom-4 left-4 px-4 h-9 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Saber más
                    </button>

                    <Image
                      src="/nuevo.png"
                      alt="Nuevo"
                      width={36}
                      height={36}
                      className="absolute bottom-2 right-2 opacity-80 pointer-events-none"
                    />
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
