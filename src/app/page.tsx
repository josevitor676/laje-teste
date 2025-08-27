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

  // cálculos
  const barrasX = Math.floor(values.largura / values.espacamento);
  const barrasY = Math.floor(values.comprimento / values.espacamento);

  const totalFerros = barrasX + barrasY;
  const comprimentoTotal =
    barrasX * values.comprimento + barrasY * values.largura;

  // peso por metro conforme bitola
  const tabelaPeso: Record<string, number> = {
    "8": 0.395,
    "10": 0.617,
    "12.5": 0.994,
  };

  const pesoTotal = comprimentoTotal * tabelaPeso[values.bitola];

  return (
    <div className="flex h-screen w-full justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Cálculo de Laje Lisa</h1>
        <LajeForm onSubmit={handleFormSubmit} />

        <div className="mt-4 space-y-1 h-full">
          <p><strong>Barras no sentido X:</strong> {barrasX}</p>
          <p><strong>Barras no sentido Y:</strong> {barrasY}</p>
          <p><strong>Total de Ferros:</strong> {totalFerros}</p>
          <p><strong>Comprimento total:</strong> {comprimentoTotal.toFixed(2)} m</p>
          <p><strong>Peso total:</strong> {pesoTotal.toFixed(2)} kg</p>
        </div>
      </div>

      <div className="flex w-full h-full justify-center items-center">
        <Laje3D {...values} />
      </div>
    </div>
  );
}
