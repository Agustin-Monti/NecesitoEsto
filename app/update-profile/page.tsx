"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InitialProfileForm } from "@/components/CreateProfileForm";
import { createClient } from "@/utils/supabase/client";

export default function NewDemandPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          // Usuario no autenticado - redirigir a sign-in
          router.push("/sign-in?message=Por favor, inicia sesión para continuar");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        router.push("/sign-in?message=Error de autenticación");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Mostrar loading mientras verificamos autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no renderizamos nada (la redirección ya ocurrió)
  if (!isAuthenticated) {
    return null;
  }

  // Usuario autenticado - mostrar el formulario
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    }>
      <InitialProfileForm />
    </Suspense>
  );
}
