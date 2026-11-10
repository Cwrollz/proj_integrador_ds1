"use client";
 
import { SessionProvider } from "next-auth/react";
 
// Disponibiliza a sessão para todos os componentes cliente (useSession).
export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
