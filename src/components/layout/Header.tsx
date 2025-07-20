"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const isSimulatorPage = pathname === "/simulador";

  return (
    <header className="bg-[#50504F] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Creditas Logo"
                width={122}
                height={26}
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {!isSimulatorPage && (
            <div className="flex items-center">
              <Link href="/simulador">
                <Button variant="primary" size="md">
                  Simular Empréstimo
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
