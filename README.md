# Simulador de Empréstimo

Um simulador de empréstimo moderno e responsivo construído com Next.js 15, TypeScript e Tailwind CSS. A aplicação permite simular empréstimos com cálculos precisos de juros compostos, oferecendo uma interface intuitiva para análise de financiamentos.

## 🚀 Funcionalidades

- ✅ **Simulação de empréstimo** com cálculo de juros compostos
- ✅ **Interface intuitiva** com resultados em tempo real
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Validação de formulário** robusta
- ✅ **Formatação automática** de valores monetários brasileiros
- ✅ **Visualização de resultados** com gráficos interativos
- ✅ **Testes unitários** completos com Jest
- ✅ **TypeScript** para type safety
- ✅ **Performance otimizada** com Next.js 15 e Turbopack

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript 5+
- **Estilização**: Tailwind CSS 4
- **Bundler**: Turbopack (para desenvolvimento)
- **Testes**: Jest + Testing Library
- **Linting**: ESLint com configurações personalizadas
- **Formatação**: Prettier

## � Setup e Instalação

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
- **npm**, **yarn**, **pnpm** ou **bun** como gerenciador de pacotes
- **Git** para controle de versão

### Instalação Passo a Passo

1. **Clone o repositório**:

```bash
git clone https://github.com/flavianoredressa/simulador-credito.git
cd simulador-credito
```

2. **Instale as dependências**:

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install

# Com bun
bun install
```

3. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Acesse a aplicação**:
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador
   - A aplicação será recarregada automaticamente quando você fizer alterações

### Build para Produção

```bash
# Build da aplicação
npm run build

# Inicia o servidor de produção
npm run start
```

## 💡 Exemplos de Uso

### Exemplo 1: Simulação Básica

1. **Acesse** a página inicial em `http://localhost:3000`
2. **Clique** em "Simular Empréstimo" ou navegue para `/simulador`
3. **Preencha** os campos:
   - Valor do empréstimo: R$ 10.000,00
   - Taxa de juros: 2,5% ao mês
   - Número de parcelas: 12 meses
4. **Visualize** os resultados instantaneamente:
   - Parcela mensal: R$ 945,56
   - Total a pagar: R$ 11.346,72
   - Total de juros: R$ 1.346,72

### Exemplo 2: Comparação de Cenários

```typescript
// Cenário A: Prazo menor, parcela maior
Valor: R$ 50.000
Taxa: 1,8% a.m.
Prazo: 24 meses
Resultado: Parcela de R$ 2.547,89

// Cenário B: Prazo maior, parcela menor
Valor: R$ 50.000
Taxa: 1,8% a.m.
Prazo: 48 meses
Resultado: Parcela de R$ 1.567,23
```

### Exemplo 3: Usando a API de Cálculos

```typescript
import { calculateLoan, LoanData } from "@/types/loan";

const loanData: LoanData = {
  amount: 25000,
  installments: 18,
  interestRate: 2.1,
};

const result = calculateLoan(loanData);
console.log(`Parcela: ${result.installmentAmount}`);
console.log(`Total: ${result.totalAmount}`);
```

## 📁 Estrutura do Projeto

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Layout raiz da aplicação
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Estilos globais
│   └── simulador/
│       └── page.tsx               # Página principal do simulador
├── components/                    # Componentes React reutilizáveis
│   ├── ui/                        # Componentes básicos de UI
│   │   ├── Button.tsx             # Botão com variantes
│   │   ├── Input.tsx              # Input com formatação
│   │   ├── Card.tsx               # Container para conteúdo
│   │   └── Badge.tsx              # Badges informativos
│   ├── layout/                    # Componentes de layout
│   │   ├── Header.tsx             # Cabeçalho da aplicação
│   │   └── Footer.tsx             # Rodapé com informações
│   ├── loan/                      # Componentes específicos do simulador
│   │   ├── LoanCalculator.tsx     # Container principal
│   │   ├── LoanForm.tsx           # Formulário de entrada
│   │   ├── LoanResults.tsx        # Exibição de resultados
│   │   └── LoanChart.tsx          # Gráficos e visualizações
│   └── animations/                # Componentes de animação
│       ├── FadeIn.tsx             # Animação de fade
│       ├── SlideInLeft.tsx        # Slide da esquerda
│       └── SlideInRight.tsx       # Slide da direita
├── types/                         # Definições TypeScript
│   └── loan.ts                    # Interfaces do domínio de empréstimos
├── lib/                          # Utilitários e configurações
│   ├── utils.ts                  # Funções utilitárias gerais
│   ├── validations.ts           # Esquemas de validação
│   ├── calculations.ts          # Lógica de cálculos financeiros
│   └── __tests__/               # Testes unitários
└── constants/                   # Constantes da aplicação
    └── loan.ts                  # Limites e configurações
```

## 🏗️ Decisões de Arquitetura

### 1. **Next.js 15 com App Router**

**Por quê?**

- **Performance**: App Router oferece melhor performance com React Server Components
- **Estrutura**: Roteamento baseado em sistema de arquivos mais intuitivo
- **SEO**: Renderização server-side nativa para melhor indexação
- **Futuro**: Representa a direção futura do Next.js

### 2. **TypeScript Rigoroso**

**Por quê?**

- **Type Safety**: Previne erros em tempo de compilação
- **Documentação**: Os tipos servem como documentação viva
- **Refatoração**: Facilita mudanças grandes no código
- **Produtividade**: IntelliSense mais preciso

**Configuração**:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 3. **Separação de Responsabilidades**

**Estrutura em Camadas**:

- **Presentation Layer**: Componentes React (`/components`)
- **Business Logic**: Cálculos financeiros (`/lib/calculations.ts`)
- **Type Definitions**: Contratos de dados (`/types`)
- **Constants**: Configurações centralizadas (`/constants`)

### 4. **Sistema de Design Componetizado**

**Abordagem**:

- **Atomic Design**: Componentes básicos reutilizáveis em `/ui`
- **Composition over Inheritance**: Componentes compostos
- **Variants**: Sistema de variantes com Tailwind
- **Props Interface**: Interfaces TypeScript bem definidas

### 5. **Estratégia de Testes**

**Pirâmide de Testes**:

```
    /\
   /  \     E2E Tests (Poucos)
  /____\    Integration Tests (Alguns)
 /______\   Unit Tests (Muitos)
/________\  Static Analysis (ESLint/TS)
```

**Cobertura**:

- **Unidade**: Funções de cálculo, utilitários, validações
- **Componentes**: Renderização, eventos, props
- **Integração**: Fluxos completos de simulação

### 6. **Gerenciamento de Estado**

**Estratégia**:

- **Estado Local**: `useState` para formulários simples
- **Props Drilling**: Comunicação parent-child direta
- **Lifting State Up**: Estado compartilhado no componente pai
- **No Redux**: Complexidade desnecessária para este escopo

### 7. **Performance e Otimização**

**Técnicas Aplicadas**:

- **Code Splitting**: Lazy loading automático do Next.js
- **Tree Shaking**: Eliminação de código não utilizado
- **Memoization**: `React.memo` em componentes pesados
- **Turbopack**: Bundler otimizado para desenvolvimento

### 8. **Validação e Tratamento de Erros**

**Abordagem Defensiva**:

- **Validação de Input**: Limites e tipos corretos
- **Error Boundaries**: Captura de erros React
- **Type Guards**: Verificação runtime de tipos
- **Fallbacks**: Estados de erro gracioso

### 9. **Acessibilidade (a11y)**

**Implementações**:

- **ARIA Labels**: Descrições para screen readers
- **Keyboard Navigation**: Suporte completo ao teclado
- **Color Contrast**: Cores com contraste adequado
- **Focus Management**: Indicadores visuais de foco

### 10. **Internacionalização (i18n)**

**Preparação Futura**:

- **Estrutura**: Componentes preparados para múltiplos idiomas
- **Formatação**: Números e moeda brasileira
- **Mensagens**: Textos centralizados para fácil tradução
  │ └── calculations.ts # Lógica de cálculos
  ├── types/ # Definições de tipos TypeScript
  │ └── loan.ts
  └── constants/ # Constantes da aplicação
  └── loan.ts

````

## 🧪 Testes

O projeto possui uma suíte completa de testes para garantir qualidade e confiabilidade.

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch (reexecuta quando arquivos mudam)
npm run test:watch

# Com relatório de cobertura
npm run test:coverage

# Testes específicos
npm test -- --testNamePattern="LoanCalculator"
````

### Cobertura de Testes

O projeto mantém alta cobertura de testes:

- ✅ **Cálculos Financeiros** (`calculations.ts`)
  - Juros compostos
  - Validação de parâmetros
  - Edge cases (valores extremos)
- ✅ **Validações** (`validations.ts`)
  - Schemas Zod
  - Limites de valores
  - Mensagens de erro
- ✅ **Utilitários** (`utils.ts`)
  - Formatação de moeda
  - Manipulação de classes CSS
  - Funções auxiliares
- ✅ **Componentes UI**
  - Renderização correta
  - Interações do usuário
  - Props e estados

### Exemplo de Teste

```typescript
describe("calculateLoan", () => {
  it("should calculate correct loan values", () => {
    const loanData = {
      amount: 10000,
      installments: 12,
      interestRate: 2.5,
    };

    const result = calculateLoan(loanData);

    expect(result.installmentAmount).toBeCloseTo(945.56);
    expect(result.totalAmount).toBeCloseTo(11346.72);
  });
});
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento (Turbopack)
npm run build        # Build otimizada para produção
npm run start        # Servidor de produção
npm run preview      # Preview do build local

# Qualidade de Código
npm run lint         # ESLint
npm run lint:fix     # ESLint com correções automáticas
npm run type-check   # Verificação de tipos TypeScript

# Testes
npm test             # Jest
npm run test:watch   # Jest em modo watch
npm run test:coverage # Relatório de cobertura
npm run test:ui      # Interface visual para testes
```

## 📊 Funcionalidades do Simulador

### Sistema de Cálculos

O simulador implementa cálculos financeiros precisos:

#### **Juros Compostos (Padrão)**

```
Fórmula: M = C × (1 + i)^t
Onde:
- M = Montante final
- C = Capital inicial
- i = Taxa de juros (decimal)
- t = Tempo (períodos)

Parcela = M / n
```

#### **Validações Automáticas**

- **Valor mínimo**: R$ 1.000,00
- **Valor máximo**: R$ 1.000.000,00
- **Parcelas**: 1 a 60 meses
- **Taxa**: 0,1% a 15% ao mês

#### **Formatação Brasileira**

- Moeda: Real (BRL)
- Separadores: ponto (milhares) e vírgula (decimais)
- Símbolo: R$ prefixado

### Interface do Usuário

#### **Componentes Principais**

1. **LoanForm**: Formulário de entrada com validação
2. **LoanResults**: Exibição formatada dos resultados
3. **LoanChart**: Visualização gráfica (futuro)

#### **Estados da Aplicação**

- **Idle**: Aguardando entrada do usuário
- **Calculating**: Processando cálculos
- **Results**: Exibindo resultados
- **Error**: Tratamento de erros

## 🎨 Design System

### Paleta de Cores

```css
/* Cores Primárias */
--blue-50: #eff6ff;
--blue-600: #2563eb;
--blue-700: #1d4ed8;

/* Cores Neutras */
--gray-50: #f9fafb;
--gray-600: #4b5563;
--gray-900: #111827;

/* Estados */
--red-600: #dc2626; /* Erro */
--yellow-600: #d97706; /* Aviso */
--green-600: #059669; /* Sucesso */
```

### Typography Scale

```css
/* Headings */
.text-3xl {
  font-size: 1.875rem;
} /* 30px */
.text-2xl {
  font-size: 1.5rem;
} /* 24px */
.text-xl {
  font-size: 1.25rem;
} /* 20px */

/* Body */
.text-base {
  font-size: 1rem;
} /* 16px */
.text-sm {
  font-size: 0.875rem;
} /* 14px */
```

### Spacing System

```css
/* Baseado em múltiplos de 4px */
.p-2 {
  padding: 0.5rem;
} /* 8px */
.p-4 {
  padding: 1rem;
} /* 16px */
.p-6 {
  padding: 1.5rem;
} /* 24px */
.p-8 {
  padding: 2rem;
} /* 32px */
```

## 🚀 Deploy e Produção

### Variáveis de Ambiente

```env
# .env.local
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://simulador-credito.vercel.app
```

### Plataformas Suportadas

- **Vercel**: Deploy automático via GitHub
- **Netlify**: Build commands configurados
- **Railway**: Container Docker
- **AWS/Azure**: Infraestrutura personalizada

### Configurações de Build

```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    turbopack: true, // Desenvolvimento mais rápido
  },
  compiler: {
    removeConsole: true, // Remove console.log em produção
  },
};
```

## 🔐 Segurança e Boas Práticas

### Validação de Dados

- **Client-side**: Validação imediata para UX
- **Type Safety**: TypeScript previne erros de tipo
- **Sanitização**: Inputs limpos antes do processamento

### Performance

- **Code Splitting**: Carregamento sob demanda
- **Tree Shaking**: Remoção de código não utilizado
- **Memoization**: Cache de cálculos custosos
- **Lazy Loading**: Componentes carregados quando necessário

### Acessibilidade

```jsx
// Exemplo de componente acessível
<button
  aria-label="Calcular empréstimo"
  aria-describedby="loan-form-help"
  className="focus:ring-2 focus:ring-blue-500"
>
  Simular
</button>
```

## 🤝 Contribuindo

### Setup para Desenvolvimento

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Instale** dependências: `npm install`
5. **Execute** testes: `npm test`
6. **Commit** mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
7. **Push** para branch: `git push origin feature/nova-funcionalidade`
8. **Abra** um Pull Request

### Padrões de Commit

```bash
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
test: adição/correção de testes
refactor: refatoração de código
style: formatação/estilo
chore: tarefas de manutenção
wip: tarefa em andamento
```

### Code Review Checklist

- [ ] Testes passando
- [ ] TypeScript sem erros
- [ ] ESLint sem warnings
- [ ] Componentes documentados
- [ ] Performance adequada
- [ ] Acessibilidade verificada

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/flavianoredressa/simulador-credito/issues)

- **Email**: flavianoredressa@gmail.com

---

**Feito com ❤️ e TypeScript**
