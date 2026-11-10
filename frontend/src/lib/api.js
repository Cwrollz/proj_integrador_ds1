const API_URL = process.env.API_URL;
 
// Faz requisições à API Django a partir do servidor Next.js.
// Se receber um accessToken, envia o cabeçalho Authorization.
export async function apiFetch(caminho, accessToken) {
  const headers = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
 
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers,
    cache: "no-store", // sempre busca dados atualizados
  });
 
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao acessar ${caminho}`);
  }
  return resposta.json();
}

