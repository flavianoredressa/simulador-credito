import { LoanCalculator } from "@/components/loan/LoanCalculator";
import { Footer } from "@/components/layout/Footer";

export default function Simulador() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 p-1 sm:p-2 lg:p-4">
        <div className="max-w-7xl mx-auto">
          <LoanCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
