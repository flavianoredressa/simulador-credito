import Link from "next/link";
import { LoanCalculator } from "@/components/loan/LoanCalculator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Simulador() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header da página */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              ← Voltar ao início
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Simulador de Empréstimo
            </h1>
            <p className="text-gray-600">
              Configure os valores abaixo para calcular suas parcelas
            </p>
          </div>

          {/* Calculadora */}
          <LoanCalculator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
