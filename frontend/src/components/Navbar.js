"use client";
 
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
 
export default function Navbar() {
  const { data: session, status } = useSession();
 
  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          Projeto Integrador
        </Link>
 
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/avisos" className="hover:underline">Avisos</Link>
          {session && (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/perfil" className="hover:underline">Perfil</Link>
            </>
          )}
        </div>
 
        <div className="ml-auto flex items-center gap-3 text-sm">
          {status === "loading" && <span className="text-slate-400">...</span>}
 
          {status === "unauthenticated" && (
            <>
              <Link href="/login" className="hover:underline">Entrar</Link>
              <Link
                href="/cadastro"
                className="rounded bg-blue-600 px-3 py-1.5 hover:bg-blue-500"
              >
                Cadastrar
              </Link>
            </>
          )}
 
          {status === "authenticated" && (
            <>
              <span>Olá, {session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded bg-red-600 px-3 py-1.5 hover:bg-red-500"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

