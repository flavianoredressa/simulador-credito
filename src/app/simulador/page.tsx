import Link from "next/link";
import { LoanCalculator } from "@/components/loan/LoanCalculator";
import { Footer } from "@/components/layout/Footer";

export default function Simulador() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <LoanCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
