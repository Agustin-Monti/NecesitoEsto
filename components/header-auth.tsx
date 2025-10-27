import { signOutAction } from "@/actions/auth-actions/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";
import {
  UserIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Client component para manejar el logout
function SignOutButton() {
  const handleSignOut = async () => {
    console.log("🔄 Iniciando cierre de sesión...");
    
    try {
      const formData = new FormData();
      const response = await signOutAction(formData);
      // La redirección se maneja en la server action
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
    >
      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
      Cerrar Sesión
    </button>
  );
}

export default async function AuthButton({ user }: { user: any }) {
  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <Badge variant={"default"} className="font-normal pointer-events-none">
          Please update .env.local file with anon key and url
        </Badge>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant={"outline"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            <Link href="/sign-in">Iniciar Sesión</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={"default"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            <Link href="/sign-up">Cerrar Sesión</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <UserDropdown user={user} />
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Iniciar Sesión</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">Crear Cuenta</Link>
      </Button>
    </div>
  );
}
