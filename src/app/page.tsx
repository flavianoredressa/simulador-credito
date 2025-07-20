import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { APP_CONFIG } from "@/constants/loan";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-5xl mx-auto text-center w-full">
        <Card variant="elevated" className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#50504F] mb-3 sm:mb-4">
            Simule seu
            <span className="text-[#8EDB00]"> Empréstimo</span>
          </h1>

          <p className="text-base lg:text-lg text-[#757574] mb-4 sm:mb-6 max-w-2xl mx-auto">
            {APP_CONFIG.description}. Calcule parcelas, juros e encontre a opção
            ideal para você.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {APP_CONFIG.features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4"
              >
                <CardContent className="p-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    {feature.icon.startsWith("/") ? (
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={20}
                        height={20}
                        className="w-8 h-8"
                      />
                    ) : (
                      <span className="text-white text-lg">{feature.icon}</span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-[#50504F] mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#757574]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <Link href="/simulador">
              <Button size="md" className="shadow-xl">
                Simular Empréstimo Agora
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
