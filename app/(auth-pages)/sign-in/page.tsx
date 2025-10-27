"use client";

import { signInAction } from "@/actions/auth-actions/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
  
    const formData = new FormData(event.currentTarget);
    const result = await signInAction(formData);
  
    console.log("Error recibido:", result?.error);
  
    if (result?.error) {
      setError(result.error.normalize("NFC"));
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
              Bienvenido a Necesito Esto!
            </h1>
            <p className="text-lg text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-base">
              {error}
            </div>
          )}

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
                className="w-full h-12 text-base bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-base font-medium text-gray-700">
                  Contraseña
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="w-full h-12 text-base pr-12 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
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
              pendingText="Iniciando sesión..."
            >
              Iniciar Sesión
            </SubmitButton>
          </form>

          {/* Sign Up Link */}
          <div className="mt-10 text-center">
            <p className="text-base text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link 
                href="/sign-up" 
                className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
