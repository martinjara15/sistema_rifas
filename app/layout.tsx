import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Watermark from "@/components/Watermark";
import PasswordGate from "@/components/PasswordGate";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Rifas Online - Tu Tienda",
  description: "Plataforma de rifas online. Elegi tus numeros y participa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <PasswordGate>
          <Watermark />
          <Header />
          <main className="flex-1">{children}</main>
        </PasswordGate>
      </body>
    </html>
  );
}
