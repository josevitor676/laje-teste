"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Grid3X3, Ruler } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  comprimento: z.coerce.number().min(0.01, "Informe o comprimento da laje"),
  largura: z.coerce.number().min(0.01, "Informe a largura da laje"),
  espessura: z.coerce.number().min(0.01, "Informe a espessura da laje"),
  espacamento: z.coerce.number().min(0.01, "Informe o espaçamento dos ferros"),
  bitola: z.enum(["8", "10", "12.5"], {
    message: "Selecione a bitola do ferro",
  }),
});

export type LajeInputs = z.infer<typeof formSchema>;

interface LajeFormProps {
  onSubmit: (values: LajeInputs) => void;
}

export function LajeForm({ onSubmit }: LajeFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LajeInputs>({
    resolver: zodResolver(formSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      comprimento: undefined,
      largura: undefined,
      espessura: undefined,
      espacamento: undefined,
      bitola: "10",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
      <div className="flex flex-col w-full p-3 bg-white rounded-lg shadow-md space-y-2">
        <div className="flex items-center gap-2 text-lg text-gray-600 font-semibold">
          <Ruler className="w-6 h-6 text-blue-600" />
          Dimensões da Laje
        </div>

        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-bold text-gray-700">Comprimento (m)</label>
            <input
              type="number"
              step="0.1"
              {...register("comprimento")}
              className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.comprimento && <span className="text-red-500 text-xs">{errors.comprimento.message}</span>}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-sm font-bold text-gray-700">Largura (m)</label>
            <input
              type="number"
              step="0.1"
              {...register("largura")}
              className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.largura && <span className="text-red-500 text-xs">{errors.largura.message}</span>}
          </div>
        </div>

        <label className="text-sm font-bold text-gray-700">Espessura (m)</label>
        <input
          type="number"
          step="0.01"
          {...register("espessura")}
          className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {errors.espessura && <span className="text-red-500 text-xs">{errors.espessura.message}</span>}
      </div>

      <div className="flex flex-col w-full p-3 bg-white rounded-lg shadow-md space-y-2">
        <div className="flex items-center gap-2 text-lg text-gray-600 font-semibold">
          <Grid3X3 className="w-6 h-6 text-blue-600" />
          Configuração das Barras
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">Espaçamento dos ferros (m)</label>
          <input
            type="number"
            step="0.01"
            {...register("espacamento")}
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.espacamento && <span className="text-red-500 text-xs">{errors.espacamento.message}</span>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">Bitola do ferro</label>
          <select
            {...register("bitola")}
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="8">8 mm</option>
            <option value="10">10 mm</option>
            <option value="12.5">12,5 mm</option>
          </select>
          {errors.bitola && <span className="text-red-500 text-xs">{errors.bitola.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full h-10 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg rounded-lg flex items-center justify-center text-white"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Calcular
      </button>
    </form>
  );
}
