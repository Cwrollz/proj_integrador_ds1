"use client";
 
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
 
const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
const CAMPOS = [
  { nome: "username", rotulo: "Usuário", tipo: "text" },
  { nome: "first_name", rotulo: "Nome", tipo: "text" },
  { nome: "email", rotulo: "E-mail", tipo: "email" },
  { nome: "password", rotulo: "Senha", tipo: "password" },
  { nome: "password2", rotulo: "Confirme a senha", tipo: "password" },
];
 
export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "", first_name: "", email: "", password: "", password2: "",
  });
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
 
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
 
  async function handleSubmit(event) {
    event.preventDefault();
    setErros({});
    setCarregando(true);
 
    // Chamada direta do navegador para o Django (por isso o CORS no backend)
    const resposta = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
 
    if (!resposta.ok) {
      // O DRF devolve os erros no formato { campo: ["mensagem"] }
      setErros(await resposta.json());
      setCarregando(false);
      return;
    }
 
    // Cadastro OK: já faz o login com os mesmos dados
    await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });
    router.push("/dashboard");
    router.refresh();
  }
 
  return (
    <section className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold">Criar conta</h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded border bg-white p-6 shadow-sm">
        {CAMPOS.map((campo) => (
          <div key={campo.nome}>
            <label htmlFor={campo.nome} className="mb-1 block text-sm font-medium">
              {campo.rotulo}
            </label>
            <input
              id={campo.nome}
              name={campo.nome}
              type={campo.tipo}
              value={form[campo.nome]}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
            {erros[campo.nome] && (
              <p className="mt-1 text-sm text-red-600">{erros[campo.nome].join(" ")}</p>
            )}
          </div>
        ))}
 
        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {carregando ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </section>
  );
}

