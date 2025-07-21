export const LOAN_LIMITS = {
  amount: {
    min: 1000,
    max: 1000000,
    default: 10000,
    step: 100,
  },
  installments: {
    min: 1,
    max: 360,
    default: 12,
    step: 1,
  },
  interestRate: {
    min: 0.1,
    max: 15,
    default: 2,
    step: 0.1,
  },
} as const;

export const CURRENCY_CONFIG = {
  locale: "pt-BR",
  currency: "BRL",
} as const;

export const APP_CONFIG = {
  title: "Simulador de Empréstimo",
  description: "Simule seu empréstimo de forma rápida e segura",
  features: [
    {
      icon: "/veiculo.png",
      title: "Cálculo Preciso",
      description: "Simule um crédito com seu carro em garantia",
    },
    {
      icon: "/imovel.png",
      title: "Resultado Instantâneo",
      description: "Simule um crédito com seu imóvel em garantia",
    },
    {
      icon: "/consignado.webp",
      title: "100% Seguro",
      description: "Por dentro do Crédito do Trabalhador",
    },
  ],
} as const;
