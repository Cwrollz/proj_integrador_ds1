import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
 
export const metadata = {
  title: "Projeto Integrador - DS1",
  description: "Django REST Framework + Next.js",
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
