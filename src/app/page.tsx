import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { APP_CONFIG } from "@/constants/loan";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card variant="elevated" className="p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#50504F] mb-6">
            Simule seu
            <span className="text-[#8EDB00]"> Empréstimo</span>
          </h1>

          <p className="text-lg md:text-xl text-[#757574] mb-8 max-w-2xl mx-auto">
            {APP_CONFIG.description}. Calcule parcelas, juros e encontre a opção
            ideal para você.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {APP_CONFIG.features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8EDB00] to-[#76B800] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {feature.icon.startsWith("/") ? (
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    ) : (
                      <span className="text-white text-xl">{feature.icon}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#50504F] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#757574]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Link href="/simulador">
              <Button size="lg" className="shadow-2xl">
                Simular Empréstimo Agora
              </Button>
            </Link>

            <p className="text-sm text-[#8C8C8B]">
              Gratuito • Sem compromisso • Resultado imediato
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
