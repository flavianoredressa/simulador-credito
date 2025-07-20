import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simulador de Empréstimo",
  description:
    "Simule seu empréstimo de forma rápida e segura. Calcule parcelas, juros e encontre a opção ideal para você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="theme"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
