"use client";
 
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
 
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Página que o usuário tentou acessar antes de ser mandado para o login
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
 
  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setCarregando(true);
 
    const resultado = await signIn("credentials", {
      username,
      password,
      redirect: false, // tratamos o resultado aqui mesmo
    });
 
    setCarregando(false);
 
    if (resultado?.error) {
      setErro("Usuário ou senha inválidos.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }
 
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border bg-white p-6 shadow-sm">
      {erro && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{erro}</p>}
 
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium">Usuário</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>
 
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>
 
      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

