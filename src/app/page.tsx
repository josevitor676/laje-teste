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
    <div className={`flex min-h-screen w-full flex-col ${values && "justify-between"} bg-gradient-to-br from-blue-50 via-white to-indigo-50`}>
      <div className="text-center p-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Calculadora de Laje Lisa
          </h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-gray-600">
          Calcule facilmente a quantidade de barras de ferro necessárias para sua laje lisa
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 m-5">
        <div className={`flex w-full lg:w-[35%] flex-col items-center justify-start ${!values && "mt-4"}`}>
          <LajeForm onSubmit={handleFormSubmit} />

          {values && (
            <div className="mt-4 flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-md space-y-6 justify-between">
              <div className="flex flex-row gap-2 justify-center items-center mb-2">
                <BarChart3 className="w-7 h-7 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600">Resultados do Cálculo</h2>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-2 gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Layers className="w-6 h-6 text-blue-600" />
                  <strong className="text-gray-500 text-base sm:text-lg">Barras no sentido X: {numFerrosX}</strong>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <Layers className="w-6 h-6 text-blue-600" />
                  <strong className="text-gray-500 text-base sm:text-lg">Barras no sentido Y: {numFerrosY}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <Grid3X3 className="w-6 h-6 text-purple-600" />
                  <strong className="text-gray-500">Total de Barras: {totalFerros}</strong>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <Ruler className="w-6 h-6 text-orange-600" />
                  <strong className="text-gray-500">Comprimento total: {comprimentoTotal.toFixed(2)} m</strong>
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Weight className="w-6 h-6 text-red-600" />
                <strong className="text-gray-500">Peso total: {pesoTotal.toFixed(2)} kg</strong>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full lg:w-[65%] h-[400px] lg:h-auto justify-center items-center mt-6 lg:mt-0">
          {values && <Laje3D {...values} />}
        </div>
      </div>
    </div>
  );
}
