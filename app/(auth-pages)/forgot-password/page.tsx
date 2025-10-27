"use client";

import { forgotPasswordAction } from "@/actions/auth-actions/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// Componente principal que usa useSearchParams
function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar si hay mensajes en la URL de forma segura (estos vienen del action)
  const successMessage = searchParams?.get("success");
  const errorMessage = searchParams?.get("error");

  // Efecto para redirigir después del countdown solo si hay successMessage
  useEffect(() => {
    if (successMessage && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (successMessage && countdown === 0) {
      router.push("/sign-in");
    }
  }, [countdown, router, successMessage]);

  // Efecto para iniciar countdown cuando hay éxito desde la URL
  useEffect(() => {
    if (successMessage) {
      setCountdown(5); // 5 segundos
    }
  }, [successMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      // La redirección y mensajes se manejan en el action
      await forgotPasswordAction(formData);
      // No necesitamos setear mensajes aquí porque el action redirige con los parámetros
    } catch (err) {
      console.error("Error en el formulario:", err);
      // El error ya se maneja en el action via encodedRedirect
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Contenedor tamaño medio */}
      <div className="w-full max-w-xl mb-20">
        {/* Card Container - tamaño equilibrado */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-5">
          {/* Header - tamaño adecuado */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Recuperar Contraseña
            </h1>
            <p className="text-lg text-gray-600">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {/* Enlace para iniciar sesión */}
          <div className="mb-8 text-center">
            <p className="text-base text-gray-600">
              ¿Recuerdas tu contraseña?{" "}
              <Link 
                href="/sign-in" 
                className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>

          {/* Mensaje de éxito desde la URL (action) */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-base">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {decodeURIComponent(successMessage)}
              </div>
              {countdown !== null && (
                <p className="text-center text-sm text-green-600">
                  Redirigiendo a inicio de sesión en {countdown} segundos...
                </p>
              )}
            </div>
          )}

          {/* Mensaje de error desde la URL (action) */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-base text-center">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {decodeURIComponent(errorMessage)}
              </div>
            </div>
          )}

          {/* Mostrar formulario solo si no hay mensaje de éxito */}
          {!successMessage && (
            <>
              {/* Form - con espaciado equilibrado */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="text-base font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
                  </p>
                </div>

                {/* Submit Button */}
                <SubmitButton 
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:transform-none"
                  pendingText="Enviando enlace..."
                  disabled={isSubmitting}
                >
                  Enviar Enlace de Recuperación
                </SubmitButton>
              </form>

              {/* Información adicional */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">¿Qué pasa después?</p>
                    <p className="mt-1">Revisa tu bandeja de entrada y busca un correo de nosotros. Haz clic en el enlace incluido para restablecer tu contraseña.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botón para redirigir manualmente si hay éxito */}
          {successMessage && (
            <div className="text-center mt-6">
              <button
                onClick={() => router.push("/sign-in")}
                className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors duration-200"
              >
                Ir a Iniciar Sesión ahora
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function ForgotPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl mb-20">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-5">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
