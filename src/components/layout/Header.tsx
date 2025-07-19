import Link from "next/link";
import { APP_CONFIG } from "@/constants/loan";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">💰</span>
              <span className="ml-2 text-xl font-bold text-gray-900">
                {APP_CONFIG.title}
              </span>
            </Link>
          </div>

          <nav className="flex space-x-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              href="/simulador"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Simulador
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
