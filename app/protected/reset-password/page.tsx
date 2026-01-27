"use client";

import { resetPasswordAction } from "@/actions/auth-actions/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ResetPassword() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Validación básica en frontend
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password && password.toString().length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const result = await resetPasswordAction(formData);
      
      if (result?.status === "error") {
        setError(result.message);
      } else if (result?.status === "success") {
        setSuccess(result.message);
        
        // Resetear formulario usando la ref
        if (formRef.current) {
          formRef.current.reset();
        }
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      }
    } catch (err) {
      console.error("Error al resetear contraseña:", err);
      setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Contenedor tamaño medio */}
      <div className="w-full max-w-2xl mb-10">
        {/* Card Container - tamaño equilibrado */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-12">
          {/* Header - tamaño adecuado */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Restablecer Contraseña
            </h1>
            <p className="text-lg text-gray-600">
              Ingresa tu nueva contraseña
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-base">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-base">
              <div className="font-semibold mb-1">¡Contraseña actualizada!</div>
              <div className="text-sm opacity-90">
                {success}
                <div className="mt-2 text-xs">
                  Serás redirigido al inicio de sesión en unos segundos...
                </div>
              </div>
            </div>
          )}

          {/* Form - con espaciado equilibrado */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="text-base font-medium text-gray-700">
                Nueva Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  required
                  minLength={6}
                  className="w-full h-12 text-base pr-12 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                La contraseña debe tener al menos 6 caracteres
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-3">
              <label htmlFor="confirmPassword" className="text-base font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  required
                  minLength={6}
                  className="w-full h-12 text-base pr-12 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <SubmitButton 
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:transform-none"
              pendingText="Actualizando contraseña..."
              disabled={!!success} // Deshabilitar si ya tuvo éxito
            >
              Actualizar Contraseña
            </SubmitButton>
          </form>

          {/* Back to Login Link */}
          <div className="mt-10 text-center">
            <p className="text-base text-gray-600">
              ¿Recordaste tu contraseña?{" "}
              <Link 
                href="/sign-in" 
                className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
