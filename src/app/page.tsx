"use client";
import { Laje3D } from "@/components/laje3D";
import { formSchema, LajeForm, LajeInputs } from "@/components/lajeForm";
import { useState } from "react";
import { z } from "zod";

export default function HomePage() {
  const [values, setValues] = useState<LajeInputs>({
    comprimento: 5,
    largura: 4,
    espessura: 0.2,
    espacamento: 0.3,
    bitola: "10",
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    setValues(data);
  };

  const numFerrosX = Math.floor(values.largura / values.espacamento);
  const numFerrosY = Math.floor(values.comprimento / values.espacamento);

  const totalComprimentoFerrosX = numFerrosX * values.comprimento;
  const totalComprimentoFerrosY = numFerrosY * values.largura;

  const totalFerros = numFerrosX + numFerrosY;
  const comprimentoTotal = totalComprimentoFerrosX + totalComprimentoFerrosY;

  const tabelaPeso: Record<string, number> = {
    "8": 0.395,
    "10": 0.617,
    "12.5": 0.994,
  };

  const pesoTotal = comprimentoTotal * tabelaPeso[values.bitola];

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row p-4 lg:p-8">
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Cálculo de Laje Lisa</h1>
        <LajeForm onSubmit={handleFormSubmit} />

        <div className="mt-8 space-y-2 text-gray-700 text-center lg:text-left">
          <h2 className="text-xl font-semibold">Informações de Cálculo</h2>
          <p className="text-lg">
            <strong>Barras no sentido X:</strong> {numFerrosX}
          </p>
          <p className="text-lg">
            <strong>Barras no sentido Y:</strong> {numFerrosY}
          </p>
          <p className="text-lg">
            <strong>Total de Barras:</strong> {totalFerros}
          </p>
          <p className="text-lg">
            <strong>Comprimento total:</strong> {comprimentoTotal.toFixed(2)} m
          </p>
          <p className="text-lg">
            <strong>Peso total:</strong> {pesoTotal.toFixed(2)} kg
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-2/3 h-1/2 lg:h-full justify-center items-center mt-8 lg:mt-0">
        <Laje3D {...values} />
      </div>
    </div>
  );
}
