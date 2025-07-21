export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Simulador de Empréstimo
            </h3>
            <p className="text-gray-600 text-xs">
              Ferramenta gratuita para simular empréstimos e calcular parcelas
              com diferentes taxas de juros.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Recursos
            </h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>✓ Cálculo preciso de juros</li>
              <li>✓ Resultados instantâneos</li>
              <li>✓ 100% gratuito</li>
              <li>✓ Sem cadastro necessário</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Importante
            </h4>
            <p className="text-xs text-gray-600">
              Este simulador é apenas uma ferramenta de cálculo. Os valores
              reais podem variar conforme as condições de cada instituição
              financeira.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-3 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} Simulador de Empréstimo. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
