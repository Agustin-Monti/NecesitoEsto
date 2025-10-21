import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import WhatsappButton from "@/components/WhatsappButton";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";

import Image from "next/image";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Necesito Esto!",
  description: "Descripcion de necesito esto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="pb-10 md:pb-0">
            <HeaderWithAuth />
            <div>
              {children}
              <WhatsappButton />
              {/* Botón flotante "Publica tu necesidad" - Ahora con detección de footer */}
              <div className="md:hidden">
                <FloatingButton />
              </div>
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
