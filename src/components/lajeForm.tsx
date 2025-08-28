"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  comprimento: z.coerce.number().positive(),
  largura: z.coerce.number().positive(),
  espessura: z.coerce.number().positive(),
  espacamento: z.coerce.number().positive(),
  bitola: z.enum(["8", "10", "12.5"]),
});

export type LajeInputs = z.infer<typeof formSchema>;

interface LajeFormProps {
  onSubmit: (values: LajeInputs) => void;
}


export function LajeForm({ onSubmit }: LajeFormProps) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comprimento: 5,
      largura: 4,
      espessura: 0.2,
      espacamento: 0.3,
      bitola: "10",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      <label className="text-sm font-medium text-gray-700">Comprimento (m)</label>
      <input type="number" step="0.1" {...register("comprimento")} className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <label className="text-sm font-medium text-gray-700">Largura (m)</label>
      <input type="number" step="0.1" {...register("largura")} className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <label className="text-sm font-medium text-gray-700">Espessura (m)</label>
      <input type="number" step="0.01" {...register("espessura")} className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <label className="text-sm font-medium text-gray-700">Espaçamento dos ferros (m)</label>
      <input type="number" step="0.05" {...register("espacamento")} className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <label className="text-sm font-medium text-gray-700">Bitola do ferro</label>
      <select {...register("bitola")} className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="8">8 mm</option>
        <option value="10">10 mm</option>
        <option value="12.5">12,5 mm</option>
      </select>

      <button type="submit" className="w-full rounded-md bg-blue-600 p-2 text-white font-semibold shadow-md transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Calcular
      </button>
    </form>
  );
}