import React, { useState, useEffect } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { getCupon } from '@/actions/demanda-actions';

interface Demanda {
  id: string;
  detalle: string;
  email_contacto: string;
  rubro_demanda: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  precio: number;
  pais: {
    nombre: string;
    bandera_url: string;
  };
  categorias: {
    categoria: string;
  };
  rubros: {
    nombre: string;
  };
}

interface ModalDetallesPagoProps {
  isOpen: boolean;
  onClose: () => void;
  demanda: Demanda;
  userId: string | null;
}

const ModalDetallesPago: React.FC<ModalDetallesPagoProps> = ({ isOpen, onClose, demanda, userId }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isCreatingPreference, setIsCreatingPreference] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nombrePagador, setNombrePagador] = useState<string>('');
  const [correoPagador, setCorreoPagador] = useState<string>('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [precioDemandaUSD] = useState(10);
  const [finalPrice, setFinalPrice] = useState(precioDemandaUSD);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [usdToArs] = useState(1200);
  const supabase = createClient();
  const [demandaGratis, setDemandaGratis] = useState<boolean>(false);
  const [cargando, setCargando] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [esCreadorDemanda, setEsCreadorDemanda] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        console.warn("⚠️ No se proporcionó userId.");
        return;
      }

      console.log("🔍 Consultando perfil para userId:", userId);

      const { data, error } = await supabase
        .from('profile')
        .select('id, nombre, email, demanda_gratis')
        .eq('id', userId);

      if (error) {
        console.error('❌ Error al obtener perfil:', error);
        return;
      }

      console.log("📦 Resultado completo del perfil:", data);

      if (data && data.length === 1) {
        const userData = data[0];
        console.log("✅ Usuario encontrado:", userData);

        setNombrePagador(userData.nombre || '');
        setCorreoPagador(userData.email || '');
        setDemandaGratis(userData.demanda_gratis || false);

        if (demanda && userData.email === demanda.email_contacto) {
          console.log("✅ Es el creador de la demanda.");
          setEsCreadorDemanda(true);
        } else {
          setEsCreadorDemanda(false);
        }
      } else if (data && data.length > 1) {
        console.warn("⚠️ Múltiples perfiles encontrados con el mismo userId:", data);
      } else {
        console.warn("⚠️ No se encontró ningún perfil con el userId:", userId);
      }
    };

    fetchUserProfile();
  }, [userId, demanda]);

  // Ajustar precios a cero si es gratis
  useEffect(() => {
    if (demandaGratis) {
      setFinalPrice(0);
      setCouponCode(''); // Limpiar cupón si se vuelve gratis
      setCouponDiscount(0); // Limpiar descuento
    } else if (couponDiscount > 0) {
      const newFinalPrice = precioDemandaUSD * (1 - couponDiscount / 100);
      setFinalPrice(newFinalPrice);
      console.log("Precio actualizado con cupón:", newFinalPrice);
    } else {
      setFinalPrice(precioDemandaUSD);
    }
  }, [couponDiscount, precioDemandaUSD, demandaGratis]);

  const finalPriceArg = (finalPrice * usdToArs).toFixed(0);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string;
    if (publicKey) {
      initMercadoPago(publicKey, { locale: 'es-AR' });
    }

    const fetchUserProfile = async () => {
      if (!userId) return;

      console.log("🔍 Consultando perfil para userId:", userId);

      const { data, error } = await supabase
        .from('profile')
        .select('id, nombre, email, demanda_gratis')
        .eq('id', userId);

      if (error) {
        console.error('❌ Error fetching user profile:', error);
        return;
      }

      if (data?.length === 1) {
        const usuario = data[0];
        console.log("✅ Usuario encontrado:", usuario);

        setNombrePagador(usuario.nombre || '');
        setCorreoPagador(usuario.email || '');
        setDemandaGratis(usuario.demanda_gratis || false);

        if (demanda && usuario.email === demanda.email_contacto) {
          setEsCreadorDemanda(true);
          console.log("🎯 Es el creador de la demanda");
        } else {
          setEsCreadorDemanda(false);
        }
      } else {
        console.warn("⚠️ Usuario no encontrado o múltiples resultados");
      }
    };

    fetchUserProfile();
  }, [userId, demanda]);

  const createPreference = async (price: number) => {
    try {
      if (!demanda.id || !demanda.detalle || !nombrePagador || !correoPagador) {
        setError('Missing necessary data to create the preference.');
        return null;
      }

      setIsCreatingPreference(true);
      const response = await axios.post('/api/create_preference', {
        id: demanda.id,
        title: demanda.detalle,
        quantity: 1,
        price: price,
        nombre_pagador: nombrePagador,
        correo_pagador: correoPagador,
      });

      return response.data.id;
    } catch (error) {
      console.error('Error creating preference:', error);
      setError('Error creating preference :(');
      return null;
    } finally {
      setIsCreatingPreference(false);
    }
  };

  const handlePagarClick = async () => {
    console.log("Precio final en ARS antes de crear preferencia:", finalPriceArg);
    const priceInNumber = parseInt(finalPriceArg, 10);
    const id = await createPreference(priceInNumber);
    if (id) {
      setPreferenceId(id);
    }
  };

  const handleShowPaymentMethods = () => {
    setShowPaymentMethods(true);
  };

  const handleCouponChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Si la demanda es gratis, no permitir escribir en el cupón
    if (demandaGratis) {
      return;
    }

    console.log("Evento de cambio detectado:", event.target.value);

    const code = event.target.value;
    setCouponCode(code);

    if (!code) {
      setCouponDiscount(0);
      setFinalPrice(demandaGratis ? 0 : precioDemandaUSD);
      console.log("Precio sin cupón:", demandaGratis ? 0 : precioDemandaUSD);
      return;
    }

    try {
      const response = await getCupon(code);

      console.log("Respuesta del cupón:", response);

      if (response.success && response.data) {
        const cupon = response.data;

        if (cupon.activo && cupon.usos_realizados < cupon.usos_maximos && new Date(cupon.fecha_expiracion) > new Date()) {
          const discount = cupon.descuento / 100;
          const newFinalPrice = demandaGratis ? 0 : precioDemandaUSD * (1 - discount);

          setCouponDiscount(cupon.descuento);
          setFinalPrice(newFinalPrice);

          console.log(`Precio con cupón aplicado (${cupon.descuento}% de descuento):`, newFinalPrice);
        } else {
          setCouponDiscount(0);
          setFinalPrice(demandaGratis ? 0 : precioDemandaUSD);
          console.log("Cupón inválido, precio:", demandaGratis ? 0 : precioDemandaUSD);
        }
      } else {
        setCouponDiscount(0);
        setFinalPrice(demandaGratis ? 0 : precioDemandaUSD);
        console.log("Cupón no encontrado, precio:", demandaGratis ? 0 : precioDemandaUSD);
      }
    } catch (error) {
      console.error('Error al validar el cupón:', error);
      setCouponDiscount(0);
      setFinalPrice(demandaGratis ? 0 : precioDemandaUSD);
    }
  };

  const manejarDemanda = async () => {
    setCargando(true);

    try {
      const respuesta = await fetch("/api/envioDemandaGratis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idDemanda: demanda.id,
          detalle: demanda.detalle,
          rubroNombre: demanda.rubros?.nombre || "No disponible",
          categoriaNombre: demanda.categorias?.categoria || "No disponible",
          nombrePagador,
          correoPagador,
        }),
      });

      if (respuesta.ok) {
        setAlertaVisible(true);
        setTimeout(() => {
          setAlertaVisible(false);
        }, 4000);
      } else {
        console.error("Error al procesar la demanda");
      }
    } catch (error) {
      console.error("Error al enviar la demanda:", error);
    } finally {
      setCargando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-2xl w-full max-w-4xl h-auto md:h-[600px] max-h-[90vh] overflow-y-auto relative border border-gray-200">
        {/* Botón de cerrar moderno */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 text-xl bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10"
        >
          ✕
        </button>

        {/* Contenido responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-full">
          {/* Columna izquierda: Detalles de la demanda */}
          <div className="lg:pr-4 lg:border-r lg:border-gray-100 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Detalles de la Demanda
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-base md:text-lg text-gray-800 leading-tight">
                  {demanda.detalle}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium text-sm">País:</span>
                {demanda.pais?.bandera_url && (
                  <Image
                    src={demanda.pais.bandera_url}
                    alt={`Bandera de ${demanda.pais.nombre}`}
                    width={24}
                    height={16}
                    className="rounded-sm shadow-sm"
                  />
                )}
                <span className="text-gray-800 text-sm">{demanda.pais?.nombre}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 font-medium block text-xs md:text-sm">Categoría</span>
                  <span className="text-gray-800 text-sm md:text-base">{demanda.categorias?.categoria || 'Sin categoría'}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium block text-xs md:text-sm">Rubro</span>
                  <span className="text-gray-800 text-sm md:text-base">{demanda.rubros?.nombre || "Sin rubro"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 font-medium block text-xs md:text-sm">Fecha inicio</span>
                  <span className="text-gray-800 text-sm md:text-base">{new Date(demanda.fecha_inicio).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium block text-xs md:text-sm">Fecha vencimiento</span>
                  <span className="text-gray-800 text-sm md:text-base">{new Date(demanda.fecha_vencimiento).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta de oportunidad */}
            <div className="mt-4 md:mt-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-xl md:text-2xl mt-1">💡</span>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-sm">¡Oportunidad única!</h4>
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                      Su nuevo negocio está en su mano. Realice ahora un pago único y le enviaremos los datos para que se contacte en forma directa.
                      <strong className="text-gray-800 block mt-1">Decida ahora antes que su competencia.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Opciones de pago */}
          <div className="flex flex-col space-y-6 md:space-y-0 md:justify-between">
            {/* Cupón de descuento */}
            <div className={`p-4 rounded-xl border shadow-sm transition-all duration-200 ${
              demandaGratis 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200'
            }`}>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {demandaGratis ? 'Cupón de Descuento' : 'Cupón de Descuento'}
              </p>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={couponCode} 
                  onChange={handleCouponChange} 
                  className={`flex-1 p-2 border rounded-lg text-sm focus:ring-2 focus:border-blue-500 bg-white transition-all ${
                    demandaGratis 
                      ? 'border-green-300 text-green-700 bg-green-50 cursor-not-allowed' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  placeholder={demandaGratis ? "🎉 Tienes la Demanda Gratis" : "Ingresa tu cupón"}
                  disabled={demandaGratis}
                  readOnly={demandaGratis}
                />
              </div>
              {demandaGratis && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  ¡Felicidades! Puedes acceder a esta demanda sin costo alguno.
                </p>
              )}
            </div>

            {/* Precios */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Precio por Oferta</h3>

              <div className={`p-4 md:p-5 rounded-2xl shadow-lg mb-4 ${
                demandaGratis 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <div className="text-white space-y-2">
                  <div>
                    <h4 className="text-xs md:text-sm opacity-90">Precio en USD</h4>
                    <p className="text-xl md:text-2xl font-bold">{finalPrice.toFixed(2)} USD</p>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm opacity-90">Precio en ARS</h4>
                    <p className="text-xl md:text-2xl font-bold">{(finalPrice * usdToArs).toFixed(0)} ARS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lógica de pago/demanda gratis */}
            <div className="mt-4">
              {esCreadorDemanda ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <span>❌</span>
                    <span className="text-sm">No puedes pagar por tu propia demanda</span>
                  </div>
                </div>
              ) : demandaGratis ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-xl">🎉</span>
                      <span className="font-semibold">¡Demanda Gratuita!</span>
                    </div>
                    <p className="text-sm mb-3">Obtén la información de contacto sin costo</p>
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg w-full text-center transition-colors duration-200 font-medium"
                      onClick={manejarDemanda}
                      disabled={cargando}
                    >
                      {cargando ? "Procesando... ⏳" : "Obtener información de la demanda"}
                    </button>
                  </div>
                </div>
              ) : (
                !showPaymentMethods && (
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl w-full text-center font-semibold shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                    onClick={handleShowPaymentMethods}
                  >
                    Realizar Pago
                  </button>
                )
              )}
            </div>

            {/* Métodos de pago */}
            {showPaymentMethods && (
              <div className="w-full space-y-3">
                {!preferenceId && (
                  <button
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl w-full transition-colors duration-200 font-medium"
                    onClick={handlePagarClick}
                    disabled={isCreatingPreference}
                  >
                    {isCreatingPreference ? 'Creando preferencia...' : (
                      <>
                        <img src="/mercado-pago.png" alt="Mercado Pago" className="w-6 h-6 mr-2" />
                        Pagar con Mercado Pago
                      </>
                    )}
                  </button>
                )}
                {preferenceId && <Wallet initialization={{ preferenceId }} />}

                <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency: 'USD' }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{ 
                          amount: { 
                            value: `${finalPrice}`, 
                            currency_code: 'USD' 
                          }, 
                          description: demanda.detalle 
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        const details = await actions.order.capture();
                        await axios.post('/api/guardar_pago', {
                          demanda_id: demanda.id,
                          detalle_demanda: demanda.detalle,
                          nombre_pagador: nombrePagador,
                          correo_pagador: correoPagador,
                          numero_pago: details.id,
                          monto: finalPrice,
                          fecha_pago: new Date().toISOString(),
                          estado_pago: 'aprobado',
                          id_transaccion: details.id,
                          moneda: 'USD',
                        });

                        window.location.href = '/success';
                        onClose();
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            {/* Alerta */}
            {alertaVisible && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Fondo oscuro semitransparente */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                  onClick={() => setAlertaVisible(false)}
                />
                {/* Alerta */}
                <div className="relative bg-green-600 text-white p-6 rounded-2xl shadow-2xl text-sm font-semibold max-w-[90vw] w-auto mx-4 text-center transform animate-scaleIn">
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-lg font-bold">¡Demanda entregada correctamente!</p>
                      <p className="text-green-100 mt-1">Revisa tu correo electrónico.</p>
                    </div>
                  </div>
                  {/* Botón de cerrar opcional */}
                  <button 
                    onClick={() => setAlertaVisible(false)}
                    className="absolute top-2 right-2 text-green-200 hover:text-white text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesPago;
