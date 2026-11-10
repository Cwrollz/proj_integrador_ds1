import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
 
export default async function DashboardPage() {
  // Segunda camada de proteção: verifica a sessão também no servidor
  const session = await getServerSession(authOptions);
  if (!session || session.error) redirect("/login?callbackUrl=/dashboard");
 
  // Envia o access token para as rotas protegidas do Django
  const [resumo, avisos] = await Promise.all([
    apiFetch("/dashboard/", session.accessToken),
    apiFetch("/avisos/", session.accessToken),
  ]);
 
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{resumo.mensagem}</h1>
 
      <div className="grid gap-4 sm:grid-cols-3">
        <Card titulo="Usuários" valor={resumo.total_usuarios} />
        <Card titulo="Avisos" valor={resumo.total_avisos} />
        <Card titulo="Avisos internos" valor={resumo.avisos_internos} />
      </div>
 
      <div>
        <h2 className="mb-3 text-xl font-semibold">Todos os avisos</h2>
        <ul className="space-y-3">
          {avisos.map((aviso) => (
            <li key={aviso.id} className="rounded border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{aviso.titulo}</h3>
                {!aviso.publico && (
                  <span className="rounded bg-amber-100 px-2 text-xs text-amber-800">interno</span>
                )}
              </div>
              <p className="text-slate-600">{aviso.conteudo}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
 
function Card({ titulo, valor }) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{titulo}</p>
      <p className="text-3xl font-bold">{valor}</p>
    </div>
  );
}

