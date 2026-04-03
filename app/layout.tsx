import type { Metadata } from "next";
import { Comfortaa, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import PageTransition from "./components/page-transition";
import WhatsAppFloat from "./components/whatsapp-float";
import "./globals.css";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appending",
  description: "Desarrollamos páginas web para ti",
  keywords: [
    "Appending",
    "Dev",
    "Tech",
    "Desarrollo",
    "Programacion",
    "Pagina web",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${comfortaa.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${comfortaa.className} min-h-full flex flex-col bg-[#020611] text-[#ededed] font-sans`}>
        <Navbar />
        <WhatsAppFloat />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
