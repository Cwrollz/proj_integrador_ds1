import { withAuth } from "next-auth/middleware";
 
// O proxy roda ANTES de cada requisição que casa com o "matcher".
// Sem sessão válida, o usuário é redirecionado para /login.
export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    // Só autoriza se existe token e a renovação não falhou
    authorized: ({ token }) => !!token && !token.error,
  },
});
 
// Rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*"],
};

