"use client";

import { useState, useEffect } from "react";
import { fetchProfile } from "@/actions/profile-actions";
import { createClient } from "@/utils/supabase/client";
import DatosGenerales from "@/components/DatosGenerales";
import Seguridad from "@/components/Seguridad";
import DemandaUsuario from "@/components/DemandaUsuario";
import { 
  UserCircleIcon, 
  ShieldCheckIcon, 
  ClipboardDocumentListIcon,
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

interface Profile {
  nombre: string;
  apellido: string;
  provincia: string;
  municipio: string;
  localidad: string;
  direccion: string;
  codigo_postal: string;
  created_at: string;
  telefono: string;
  empresa: string; 
  pais_id: string; 
  id_categoria: string;
  rubro_id: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("datosGenerales");
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener sesión:", error.message);
      }

      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        console.error("No se encontró un usuario autenticado.");
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const data = await fetchProfile(user.id);
          setProfileData(data);
        } catch (err: any) {
          console.error("Error al obtener perfil:", err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "datosGenerales",
      name: "Datos Generales",
      icon: UserCircleIcon,
      description: "Información personal y profesional"
    },
    {
      id: "demandas",
      name: "Mis Demandas",
      icon: ClipboardDocumentListIcon,
      description: "Gestiona tus necesidades"
    },
    {
      id: "seguridad",
      name: "Seguridad",
      icon: ShieldCheckIcon,
      description: "Configuración de seguridad"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header alineado a la izquierda */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600 mt-2">
              Gestiona tu información personal y profesional
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal alineado a la izquierda */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Más compacto y alineado a la izquierda */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-blue-600" />
                Configuración
              </h2>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 border border-blue-200 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isActive ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isActive ? "text-blue-600" : "text-gray-400"
                          }`} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{tab.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{tab.description}</p>
                        </div>
                      </div>
                      <ChevronRightIcon className={`w-4 h-4 transition-transform ${
                        isActive ? "text-blue-500" : "text-gray-400"
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Información del usuario */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {profileData?.nombre?.charAt(0)}{profileData?.apellido?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {profileData?.nombre} {profileData?.apellido}
                    </p>
                    <p className="text-xs text-gray-500">{profileData?.empresa}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal - Ocupa más espacio y está más a la izquierda */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {activeTab === "datosGenerales" && profileData && (
                <DatosGenerales data={profileData} />
              )}

              {activeTab === "seguridad" && (
                <Seguridad />
              )}

              {activeTab === "demandas" && user && (
                <DemandaUsuario userId={user.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
