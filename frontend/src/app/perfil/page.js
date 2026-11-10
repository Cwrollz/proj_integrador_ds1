import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
 
export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.error) redirect("/login?callbackUrl=/perfil");
 
  const usuario = await apiFetch("/auth/me/", session.accessToken);
 
  return (
    <section className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Meu perfil</h1>
      <dl className="divide-y rounded border bg-white shadow-sm">
        <Linha rotulo="Usuário" valor={usuario.username} />
        <Linha rotulo="Nome" valor={`${usuario.first_name} ${usuario.last_name}`.trim() || "-"} />
        <Linha rotulo="E-mail" valor={usuario.email || "-"} />
        <Linha rotulo="Administrador" valor={usuario.is_staff ? "Sim" : "Não"} />
        <Linha
          rotulo="Membro desde"
          valor={new Date(usuario.date_joined).toLocaleDateString("pt-BR")}
        />
      </dl>
    </section>
  );
}
 
function Linha({ rotulo, valor }) {
  return (
    <div className="flex justify-between px-4 py-3">
      <dt className="text-slate-500">{rotulo}</dt>
      <dd className="font-medium">{valor}</dd>
    </div>
  );
}

