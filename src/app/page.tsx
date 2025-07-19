import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simule seu
            <span className="text-blue-600"> Empréstimo</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra as melhores condições para seu empréstimo de forma rápida e
            segura. Calcule parcelas, juros e encontre a opção ideal para você.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cálculo Preciso
              </h3>
              <p className="text-gray-600">
                Simulações exatas com diferentes cenários de pagamento
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Resultado Instantâneo
              </h3>
              <p className="text-gray-600">
                Obtenha resultados em segundos, sem burocracias
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                100% Seguro
              </h3>
              <p className="text-gray-600">
                Seus dados são protegidos e não armazenamos informações
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/simulador"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Simular Empréstimo Agora
            </Link>

            <p className="text-sm text-gray-500">
              Gratuito • Sem compromisso • Resultado imediato
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
