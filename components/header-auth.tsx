import { signOutAction } from "@/actions/auth-actions/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  UserIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
          <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </div>
        <span className="text-xs font-medium">Perfil</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        <div className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">
          <p className="font-semibold truncate">Hola, {user.email}</p>
        </div>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile" className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors duration-200">
            <UserIcon className="h-4 w-4 text-gray-600" />
            Ir a Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-0">
          <form action={signOutAction} className="w-full">
            <button 
              type="submit" 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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