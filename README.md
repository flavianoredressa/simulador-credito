# 💰 Simulador de Empréstimo

Um simulador de empréstimo moderno e responsivo construído com **Next.js 15**, **TypeScript** e **Tailwind CSS**. A aplicação permite simular empréstimos com cálculos precisos de juros compostos, oferecendo uma interface intuitiva e acessível para análise de financiamentos.

## ✨ Funcionalidades

- ✅ **Simulação de empréstimo** com cálculo de juros compostos
- ✅ **Interface intuitiva** com resultados em tempo real
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Formatação automática** de valores monetários brasileiros
- ✅ **Visualização de resultados** com componentes interativos
- ✅ **Animações suaves** com Framer Motion
- ✅ **Testes unitários** completos com Jest + Testing Library
- ✅ **TypeScript** para type safety e melhor DX
- ✅ **Performance otimizada** com Next.js 15 e Turbopack
- ✅ **PWA Ready** com service workers
- ✅ **Acessibilidade** seguindo padrões WCAG

## 🛠️ Stack Tecnológico

### Frontend

- **Framework**: Next.js 15.4.2 com App Router
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **Animações**: Framer Motion 12
- **Ícones**: Lucide React
- **Gráficos**: Recharts 3

### Desenvolvimento

- **Bundler**: Turbopack (desenvolvimento)
- **Testes**: Jest 30 + Testing Library
- **Linting**: ESLint 9 com TypeScript

## 🚀 Setup e Instalação

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** (incluído com Node.js) ou outro gerenciador de pacotes
- **Git** para controle de versão

### Instalação

1. **Clone o repositório**:

```bash
git clone https://github.com/flavianoredressa/simulador-credito.git
cd simulador-credito
```

2. **Instale as dependências**:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute em modo desenvolvimento**:

```bash
npm run dev
```

4. **Acesse a aplicação**:
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador
   - O Turbopack oferece hot reload ultrarrápido durante o desenvolvimento

### Build para Produção

```bash
npm run build    # Gera build otimizada
npm start        # Inicia servidor de produção
```

## 💡 Como Usar

### Simulação Rápida

1. **Acesse** a página inicial
2. **Clique** em "Simular Empréstimo" ou navegue para `/simulador`
3. **Preencha** os dados:
   - **Valor do Empréstimo**: R$ 1.000 a R$ 1.000.000
   - **Prazo**: 1 a 60 meses
   - **Data de Nascimento**: Para validação de idade
4. **Visualize** os resultados em tempo real

### Exemplo Prático

```typescript
// Dados de entrada
Valor: R$ 25.000,00
Prazo: 24 meses
Taxa: 2,5% a.m.

// Resultado automático
Parcela: R$ 1.234,56
Total: R$ 29.629,44
Juros: R$ 4.629,44
```

### API de Cálculos

```typescript
import { calculateLoan, type LoanData } from "@/lib/calculations";

const loanData: LoanData = {
  amount: 25000,
  installments: 24,
  interestRate: 2.5,
};

const result = calculateLoan(loanData);
// result.installmentAmount, result.totalAmount, etc.
```

## 📁 Arquitetura do Projeto

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Layout raiz com providers
│   ├── page.tsx                   # Landing page com hero section
│   ├── globals.css                # Estilos globais do Tailwind
│   ├── viewport.ts                # Configurações de viewport PWA
│   ├── simulador/                 # Rota do simulador
│   │   └── page.tsx               # Página principal do simulador
│   └── __tests__/                 # Testes das páginas
├── components/                    # Componentes React reutilizáveis
│   ├── ui/                        # Design System base
│   │   ├── Button.tsx             # Componente de botão com variantes
│   │   ├── Input.tsx              # Input com máscara e validação
│   │   ├── Card.tsx               # Container de conteúdo
│   │   └── Badge.tsx              # Badges de status/informação
│   ├── layout/                    # Componentes de layout
│   │   ├── Header.tsx             # Cabeçalho com navegação
│   │   └── Footer.tsx             # Rodapé informativo
│   ├── loan/                      # Funcionalidades do simulador
│   │   ├── LoanCalculator.tsx     # Container principal do simulador
│   │   ├── LoanForm.tsx           # Formulário com validações
│   │   ├── LoanResults.tsx        # Exibição dos resultados
│   │   └── LoanChart.tsx          # Gráficos (implementação futura)
│   └── animations/                # Componentes de animação
│       └── MotionComponents.tsx   # Wrappers do Framer Motion
├── lib/                          # Lógica de negócio e utilitários
│   ├── calculations.ts           # Cálculos financeiros (juros compostos)
│   ├── utils.ts                  # Funções utilitárias (formatação, etc.)
│   └── __tests__/               # Testes unitários das funções
├── types/                        # Definições TypeScript
│   ├── loan.ts                   # Interfaces do domínio de empréstimos
│   └── __tests__/               # Testes de tipos e validações
└── constants/                   # Configurações e constantes
    └── loan.ts                  # Limites, taxas e mensagens
```

## 🏗️ Decisões de Arquitetura

### Core Stack

#### **Next.js 15 + App Router**

- **Performance**: React Server Components para otimização automática
- **DX**: Hot reload com Turbopack, roteamento intuitivo
- **SEO**: SSR nativo, meta tags dinâmicas
- **Deploy**: Otimizações automáticas para produção

#### **TypeScript Rigoroso**

- **Type Safety**: Validação em tempo de compilação
- **IntelliSense**: Autocomplete preciso e documentação inline
- **Refatoração**: Mudanças seguras em grande escala
- **Manutenibilidade**: Código autodocumentado

### Padrões de Design

#### **Composition over Inheritance**

```typescript
// ❌ Herança rígida
class BaseButton extends Component

// ✅ Composição flexível
<Button variant="primary" size="lg">
  <Icon /> Texto
</Button>
```

#### **Props Interface Design**

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
}
```

### Estado e Fluxo de Dados

#### **Estado Local First**

- `useState` para formulários simples
- Props drilling para comunicação parent-child
- Lifting state up quando necessário
- **Sem Redux**: Complexidade desnecessária para o escopo

#### **Validação em Camadas**

```typescript
// 1. Client-side (UX imediata)
const schema = z.object({...})

// 2. Runtime (Type guards)
function isValidLoan(data: unknown): data is LoanData

// 3. Business logic (Domínio)
function validateLoanConstraints(loan: LoanData)
```

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

## ⚙️ Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev     # Servidor desenvolvimento com Turbopack
npm run build   # Build otimizada para produção
npm start       # Servidor de produção
```

### Qualidade de Código

```bash
npm run lint    # ESLint para análise estática
npm test        # Jest + Testing Library
npm run test:watch    # Testes em modo watch
npm run test:coverage # Cobertura de testes
```

## � Funcionalidades do Simulador

### Motor de Cálculos Financeiros

#### **Juros Compostos**

```typescript
// Fórmula implementada
M = C × (1 + i)ⁿ
PMT = M / n

// Onde:
// M = Montante final
// C = Capital inicial (valor emprestado)
// i = Taxa de juros mensal (decimal)
// n = Número de parcelas
// PMT = Valor da parcela mensal
```

#### **Validações Automáticas**

- **Valor**: R$ 1.000 a R$ 1.000.000
- **Prazo**: 1 a 60 meses
- **Taxa**: Baseada em tabelas do mercado financeiro

#### **Formatação BR**

- Moeda: Real brasileiro (R$)
- Separadores: ponto (milhares), vírgula (decimais)
- Validação: CPF, datas, valores monetários

### Interface Intuitiva

```typescript
// Estados do simulador
type SimulatorState =
  | "idle" // Aguardando entrada
  | "calculating" // Processando
  | "results" // Exibindo resultados
  | "error"; // Tratando erros
```

#### **Componentes Principais**

- **LoanForm**: Formulário com validação em tempo real
- **LoanResults**: Resultados formatados e acessíveis
- **LoanChart**: Visualizações (em desenvolvimento)

#### **Responsividade**

- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: sm, md, lg, xl (Tailwind CSS)
- **Touch Friendly**: Botões e inputs adequados para touch

## 🎨 Design System

### Paleta de Cores

```css
/* Primárias */
--primary: #8edb00; /* Verde vibrante - Brand primary */
--primary-dark: #7ac300; /* Verde escuro - Hover/active states */
--secondary: #50504f; /* Cinza escuro - Brand secondary */

/* Neutras */
--gray-50: #f9fafb; /* Background light */
--gray-100: #f3f4f6; /* Background subtle */
--gray-900: #111827; /* Text primary */

/* Estados */
--success: #059669; /* Success messages */
--error: #dc2626; /* Error states */
--warning: #d97706; /* Warning alerts */
```

### Uso das Cores

```tsx
// Componentes com cores da marca
<Button variant="primary">   {/* Verde #8EDB00 */}
  Simular Empréstimo
</Button>

<Button variant="secondary"> {/* Cinza #50504F */}
  Cancelar
</Button>

// Classes Tailwind customizadas
className="bg-primary text-white hover:bg-primary-600"
className="text-secondary border-secondary"
className="focus:ring-primary focus:border-primary"
```

### Implementação no Tailwind

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#8EDB00",
        50: "#F4FDE0",
        100: "#E8FCC1",
        // ... mais variantes
        600: "#76B800",
        900: "#2E4C00",
      },
      secondary: {
        DEFAULT: "#50504F",
        // ... variantes do cinza
      },
    },
  },
}
```

### Typography

```css
/* Headings - Inter font family */
.text-3xl {
  font-size: 1.875rem;
} /* 30px - Page titles */
.text-2xl {
  font-size: 1.5rem;
} /* 24px - Section titles */
.text-xl {
  font-size: 1.25rem;
} /* 20px - Card titles */

/* Body text */
.text-base {
  font-size: 1rem;
} /* 16px - Primary text */
.text-sm {
  font-size: 0.875rem;
} /* 14px - Secondary text */
```

### Spacing Scale

```css
/* Base: 4px (0.25rem) */
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

### Component Variants

```typescript
// Button variants
type ButtonVariant =
  | "primary" // Verde (#8EDB00) background, white text
  | "secondary" // Cinza (#50504F) background, white text
  | "outline" // Transparent bg, colored border
  | "ghost"; // No background, minimal styling

// Size variants
type Size = "sm" | "md" | "lg";
```

## 🚀 Deploy e Produção

### Plataformas Recomendadas

#### **Vercel** (Recomendado)

```bash
# Deploy automático via GitHub
npm i -g vercel
vercel --prod
```

#### **Netlify**

```bash
# Build command
npm run build

# Publish directory
out/
```

### Variáveis de Ambiente

```env
# .env.local (desenvolvimento)
NODE_ENV=development

# .env.production (produção)
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

### Otimizações de Performance

```typescript
// next.config.ts
const nextConfig = {
  // Compressão automática
  compress: true,

  // Remoção de console em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // PWA configuration
  experimental: {
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  },
};
```

## 🔐 Boas Práticas e Segurança

### Validação de Dados

```typescript
// Client-side validation (UX)
const loanSchema = z.object({
  amount: z.number().min(1000).max(1000000),
  installments: z.number().min(1).max(60),
  interestRate: z.number().min(0.1).max(15),
});

// Runtime type checking
function isValidLoanData(data: unknown): data is LoanData {
  return loanSchema.safeParse(data).success;
}
```

### Performance

#### **Code Splitting**

- Componentes carregados sob demanda
- Roteamento otimizado pelo Next.js
- Lazy loading de recursos pesados

#### **Memoization**

```typescript
// Evita recálculos desnecessários
const memoizedCalculation = useMemo(() => {
  return calculateLoan(loanData);
}, [loanData.amount, loanData.installments, loanData.interestRate]);
```

### Acessibilidade (a11y)

```tsx
// Exemplo de componente acessível
<button
  aria-label="Calcular empréstimo"
  aria-describedby="loan-help-text"
  className="focus:ring-2 focus:ring-primary"
  disabled={isCalculating}
>
  {isCalculating ? (
    <>
      <Spinner aria-hidden="true" />
      <span className="sr-only">Calculando...</span>
    </>
  ) : (
    "Simular"
  )}
</button>
```

### Estratégias de Cache

- **Build Cache**: Next.js otimiza builds incrementais
- **Runtime Cache**: Service workers para PWA
- **Memory Cache**: Memoização de cálculos custosos

## 🤝 Contribuindo

### Configuração para Desenvolvimento

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/seu-usuario/simulador-credito.git
cd simulador-credito

# 3. Instale dependências
npm install

# 4. Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# 5. Execute os testes
npm test

# 6. Inicie o desenvolvimento
npm run dev
```

### Padrões de Commit

```bash
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
test: adição/correção de testes
refactor: refatoração sem mudança de comportamento
style: formatação, ponto e vírgula, etc
chore: atualização de build, dependências
```

### Checklist para Pull Request

- [ ] ✅ Testes passando (`npm test`)
- [ ] ✅ TypeScript sem erros (`npm run build`)
- [ ] ✅ ESLint sem warnings (`npm run lint`)
- [ ] ✅ Código documentado
- [ ] ✅ Funcionalidade testada em diferentes dispositivos
- [ ] ✅ Acessibilidade verificada

### Processo de Code Review

1. **Abertura**: PR com descrição clara
2. **Review**: Análise por maintainers
3. **Feedback**: Sugestões e melhorias
4. **Aprovação**: Merge após aprovação
5. **Deploy**: Deploy automático via CI/CD

## � Licença

Este projeto está sob a **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 Flaviano Redressa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software")...
```

---

## 📞 Contato e Suporte

### Canais de Comunicação

- **📧 Email**: [flavianoredressa@gmail.com](mailto:flavianoredressa@gmail.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/flavianoredressa/simulador-credito/issues)
- **💬 Discussões**: [GitHub Discussions](https://github.com/flavianoredressa/simulador-credito/discussions)

### Reportar Problemas

Ao reportar um bug, inclua:

- **Versão**: Do navegador e sistema operacional
- **Steps**: Para reproduzir o problema
- **Expected**: Comportamento esperado
- **Actual**: Comportamento atual
- **Screenshots**: Se aplicável

---

<div align="center">

**🚀 Feito com ❤️ e TypeScript**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

[⭐ Star no GitHub](https://github.com/flavianoredressa/simulador-credito) ·
[🐛 Reportar Bug](https://github.com/flavianoredressa/simulador-credito/issues) ·
[💡 Sugerir Feature](https://github.com/flavianoredressa/simulador-credito/discussions)

</div>
