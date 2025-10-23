import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import FloatingButton from "@/components/FloatingButton";
import AuthModal from "@/components/AuthModal";

export const Header = ({ user }: { user: any }) => {
  const navItems = [
    { href: "/", icon: HomeIcon, label: "Inicio" },
    { href: "/nosotros", icon: UserGroupIcon, label: "Nosotros" },
    { href: "/demandas", icon: BriefcaseIcon, label: "Demandas" },
    { href: "/contact", icon: ChatBubbleBottomCenterTextIcon, label: "Contacto" },
  ];

  const renderNavItem = (item: typeof navItems[0]) => {
    const Icon = item.icon;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <header className="header w-full border-b border-gray-300 py-4 bg-white/95 fixed top-0 left-0 z-50">
      {/* Logo y nombre (centrado en móvil, a la izquierda en desktop) */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        {/* Logo con efecto mejorado */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/logoprincipalsf.png"
              alt="Logo de Necesito Esto!"
              width={52}
              height={52}
              className="rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <Link href="/" className="group">
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-500">
                Necesito{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-500">
                    Esto!
                  </span>
                  {/* Efecto de resplandor azul */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] group-hover:blur-0">
                    Esto!
                  </span>
                  {/* Efecto de subrayado animado para todo el texto */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-700 ease-out"></span>
                </span>
              </span>
            </h3>
          </Link>
        </div>

        {/* Navegación para desktop (iconos con nombres y FloatingButton dentro del nav) */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map(renderNavItem)}
              
              {/* FloatingButton integrado */}
              <li>
                <FloatingButton />
              </li>
            </ul>
          </nav>
        </div>

        {/* Sección de autenticación (solo en desktop) */}
        <div className="hidden md:flex md:w-auto">
          <nav>
            <ul className="flex gap-4">
              <li className="flex flex-col items-center">
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth user={user} />}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Navegación para móvil - CON LOS MISMOS ESTILOS QUE DESKTOP */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 md:hidden py-1">
        <nav>
          <ul className="flex justify-around items-center px-4">
            {navItems.map(renderNavItem)}
            
            {/* Auth section para móvil */}
            <li className="flex flex-col items-center">
              {!hasEnvVars ? (
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl">
                  <EnvVarWarning />
                </div>
              ) : user ? (
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl">
                  <HeaderAuth user={user} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                  <AuthModal />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Botón flotante (solo en móvil) */}
      <div className="fixed md:hidden">
        <FloatingButton />
      </div>
    </header>
  );
};