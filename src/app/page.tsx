import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { APP_CONFIG } from "@/constants/loan";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card variant="elevated" className="p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simule seu
            <span className="text-blue-600"> Empréstimo</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
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

            <p className="text-sm text-gray-500">
              Gratuito • Sem compromisso • Resultado imediato
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
