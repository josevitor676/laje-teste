"use client";
import { Laje3D } from "@/components/laje3D";
import { LajeForm, LajeInputs } from "@/components/lajeForm";
import { useHomePage } from "@/components/useHomePage";
import { BarChart3, Calculator, Grid3X3, Layers, Ruler, Weight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [values, setValues] = useState<LajeInputs | null>(null);



  const numFerrosX = values ? Math.floor(values.largura / values.espacamento) : 0;
  const numFerrosY = values ? Math.floor(values.comprimento / values.espacamento) : 0;

  const totalComprimentoFerrosX = values ? numFerrosX * values.comprimento : 0;
  const totalComprimentoFerrosY = values ? numFerrosY * values.largura : 0;

  const totalFerros = numFerrosX + numFerrosY;
  const comprimentoTotal = totalComprimentoFerrosX + totalComprimentoFerrosY;

  const tabelaPeso: Record<string, number> = {
    "8": 0.395,
    "10": 0.617,
    "12.5": 0.994,
  };

  const pesoTotal = values ? comprimentoTotal * tabelaPeso[values.bitola] : 0;

  const { gerarRelatorio } = useHomePage({
    values,
    numFerrosX,
    numFerrosY,
    totalComprimentoFerrosX,
    totalComprimentoFerrosY,
    totalFerros,
    comprimentoTotal,
    pesoTotal
  });


  useEffect(() => {
    if (values) {
      gerarRelatorio();
    }
  }, [values, gerarRelatorio]);


  const handleFormSubmit = (data: LajeInputs) => {
    setValues(data);
  };

  return (
    <div className={`flex min-h-screen w-full flex-col  bg-gradient-to-br from-blue-50 via-white to-indigo-50`}>
      <div className="text-center p-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
            <Calculator className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Calculadora de Laje Lisa
          </h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-gray-600">
          Calcule facilmente a quantidade de barras de ferro necessárias para sua laje lisa
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mx-5">
        <div className={`flex w-full lg:w-[35%] flex-col items-center justify-start ${!values && "mt-3"}`}>
          <LajeForm onSubmit={handleFormSubmit} />

          <div className="mt-2 flex flex-col w-full p-3 bg-white rounded-lg shadow-md space-y-2 justify-between">
            <div className="flex flex-row gap-2 justify-center items-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-semibold text-blue-600">Resultados do Cálculo</h2>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="flex flex-row items-center gap-2 text-base">
                <Layers className="w-5 h-5 text-blue-600" />
                <strong className="text-gray-500 ">Barras no sentido X: {numFerrosX}</strong>
              </div>

              <div className="flex flex-row2 items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <strong className="text-gray-500 text-base">Barras no sentido Y: {numFerrosY}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Grid3X3 className="w-5 h-5 text-purple-600" />
                <strong className="text-gray-500 text-base">Total de Barras: {totalFerros}</strong>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Ruler className="w-5 h-5 text-orange-600" />
                <strong className="text-gray-500 text-md">Comprimento total: {comprimentoTotal.toFixed(2)} m</strong>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Weight className="w-5 h-5 text-red-600" />
              <strong className="text-gray-500 text-md">Peso total: {pesoTotal.toFixed(2)} kg</strong>
            </div>
          </div>

        </div>

        <div className="flex w-full lg:w-[65%] lg:h-auto justify-center items-center mt-6 lg:mt-0">
          {values && <Laje3D {...values} />}
        </div>
      </div>
    </div>
  );
}
