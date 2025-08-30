import { jsPDF } from "jspdf";
import { LajeInputs } from "./lajeForm";

interface UseHomePageProps {
  values: LajeInputs | null;
  numFerrosX: number;
  numFerrosY: number;
  totalComprimentoFerrosX: number;
  totalComprimentoFerrosY: number;
  totalFerros: number;
  comprimentoTotal: number;
  pesoTotal: number;
}

export const useHomePage = (
  { values, numFerrosX, numFerrosY, totalFerros, comprimentoTotal, pesoTotal }: UseHomePageProps) => {
  const gerarRelatorio = () => {
    if (!values) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Cálculo da Laje", 14, 20);

    doc.setFontSize(12);
    doc.text(`Dimensões da Laje:`, 14, 40);
    doc.text(`- Comprimento: ${values.comprimento} m`, 20, 50);
    doc.text(`- Largura: ${values.largura} m`, 20, 60);
    doc.text(`- Espessura: ${values.espessura} m`, 20, 70);

    doc.text(`Configuração das Barras:`, 14, 90);
    doc.text(`- Espaçamento: ${values.espacamento} m`, 20, 100);
    doc.text(`- Bitola: ${values.bitola} mm`, 20, 110);

    doc.text(`Resultados dos Cálculos:`, 14, 130);
    doc.text(`- Barras no sentido X: ${numFerrosX}`, 20, 140);
    doc.text(`- Barras no sentido Y: ${numFerrosY}`, 20, 150);
    doc.text(`- Total de Barras: ${totalFerros}`, 20, 160);
    doc.text(`- Comprimento total: ${comprimentoTotal.toFixed(2)} m`, 20, 170);
    doc.text(`- Peso total: ${pesoTotal.toFixed(2)} kg`, 20, 180);

    doc.save("RELATORIO_LAJE.pdf");
  };

  return {
    gerarRelatorio
  }
}