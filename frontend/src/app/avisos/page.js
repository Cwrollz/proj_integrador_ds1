import { apiFetch } from "@/lib/api";
 
// Server Component: busca os dados no servidor, antes de enviar o HTML.
export default async function AvisosPage() {
  const avisos = await apiFetch("/avisos/publicos/");
 
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Avisos públicos</h1>
      {avisos.length === 0 && <p>Nenhum aviso no momento.</p>}
      <ul className="space-y-3">
        {avisos.map((aviso) => (
          <li key={aviso.id} className="rounded border bg-white p-4 shadow-sm">
            <h2 className="font-semibold">{aviso.titulo}</h2>
            <p className="text-slate-600">{aviso.conteudo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

