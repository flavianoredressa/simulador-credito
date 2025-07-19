"use client";

import { useState } from "react";
import Link from "next/link";

export default function Simulador() {
  const [valor, setValor] = useState(10000);
  const [parcelas, setParcelas] = useState(12);
  const [juros, setJuros] = useState(2);

  // Cálculo do juro composto
  const total = valor * Math.pow(1 + juros / 100, parcelas);
  const parcela = total / parcelas;
  const totalJuros = total - valor;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Voltar ao início
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Simulador de Empréstimo
          </h1>
          <p className="text-gray-600">
            Configure os valores abaixo para calcular suas parcelas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Dados do Empréstimo
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="valor-emprestimo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Valor do Empréstimo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    R$
                  </span>
                  <input
                    id="valor-emprestimo"
                    type="number"
                    min="1000"
                    step="100"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    placeholder="10.000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Valor atual: {formatCurrency(valor)}
                </p>
              </div>

              <div>
                <label
                  htmlFor="numero-parcela"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número de Parcelas
                </label>
                <input
                  id="numero-parcela"
                  type="number"
                  min="1"
                  max="60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={parcelas}
                  onChange={(e) => setParcelas(Number(e.target.value))}
                />
                <p className="text-sm text-gray-500 mt-1">{parcelas} meses</p>
              </div>

              <div>
                <label
                  htmlFor="taxa-juros"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Taxa de Juros (% ao mês)
                </label>
                <div className="relative">
                  <input
                    id="taxa-juros"
                    type="number"
                    min="0.1"
                    max="15"
                    step="0.1"
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={juros}
                    onChange={(e) => setJuros(Number(e.target.value))}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">
                    %
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Taxa mensal de {juros}%
                </p>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Resultado da Simulação
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Valor da Parcela
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {formatCurrency(parcela)}
                </div>
                <p className="text-sm text-blue-700">
                  {parcelas}x de {formatCurrency(parcela)}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-800">
                    Valor Solicitado
                  </span>
                </div>
                <div className="text-xl font-bold text-green-900">
                  {formatCurrency(valor)}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-orange-800">
                    Total dos Juros
                  </span>
                </div>
                <div className="text-xl font-bold text-orange-900">
                  {formatCurrency(totalJuros)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    Total a Pagar
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Resumo:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Parcelas: {parcelas} meses</li>
                <li>• Taxa: {juros}% ao mês</li>
                <li>
                  • Total de juros: {((totalJuros / valor) * 100).toFixed(1)}%
                  sobre o valor
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
