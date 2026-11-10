import CredentialsProvider from "next-auth/providers/credentials";
 
const API_URL = process.env.API_URL;
 
// Lê o campo "exp" (expiração, em segundos) de dentro de um JWT.
function expiracaoDoToken(token) {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64url").toString()
  );
  return payload.exp * 1000; // converte para milissegundos
}
 
// Usa o refresh token para pedir um novo access token ao Django.
async function renovarAccessToken(token) {
  try {
    const resposta = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });
    if (!resposta.ok) throw new Error("Falha ao renovar o token");
 
    const dados = await resposta.json();
    return {
      ...token,
      accessToken: dados.access,
      accessTokenExpires: expiracaoDoToken(dados.access),
      error: undefined,
    };
  } catch {
    // O refresh também expirou: o usuário precisará fazer login de novo.
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
 
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Django",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      // Chamado quando o formulário de login é enviado.
      async authorize(credentials) {
        // 1) Pede os tokens ao Django
        const resposta = await fetch(`${API_URL}/auth/token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        if (!resposta.ok) return null; // null = credenciais inválidas
 
        const tokens = await resposta.json();
 
        // 2) Busca os dados do usuário com o access token recebido
        const respostaMe = await fetch(`${API_URL}/auth/me/`, {
          headers: { Authorization: `Bearer ${tokens.access}` },
        });
        if (!respostaMe.ok) return null;
        const usuario = await respostaMe.json();
 
        // 3) O objeto retornado aqui chega no callback "jwt" como "user"
        return {
          id: String(usuario.id),
          name: usuario.first_name || usuario.username,
          email: usuario.email,
          username: usuario.username,
          isStaff: usuario.is_staff,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
        };
      },
    }),
  ],
 
  session: { strategy: "jwt" },
 
  // Nossa própria página de login, em vez da página padrão do NextAuth
  pages: { signIn: "/login" },
 
  callbacks: {
    // Monta o token guardado no cookie (criptografado) da sessão.
    async jwt({ token, user }) {
      // Primeiro login: copia os dados vindos do authorize()
      if (user) {
        return {
          ...token,
          username: user.username,
          isStaff: user.isStaff,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: expiracaoDoToken(user.accessToken),
        };
      }
 
      // Access token ainda válido (com 10 s de folga): usa o mesmo
      if (Date.now() < token.accessTokenExpires - 10_000) {
        return token;
      }
 
      // Expirou: tenta renovar
      return renovarAccessToken(token);
    },
 
    // Define o que fica disponível em useSession() / getServerSession().
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.isStaff = token.isStaff;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

