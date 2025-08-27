"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  comprimento: z.coerce.number().positive(),
  largura: z.coerce.number().positive(),
  espessura: z.coerce.number().positive(),
  espacamento: z.coerce.number().positive(),
  bitola: z.enum(["8", "10", "12.5"]), // nova opção
});

export type LajeInputs = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (values: LajeInputs) => void;
}

export function LajeForm({ onSubmit }: Props) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-64">
      <label>Comprimento (m)</label>
      <input type="number" step="0.1" {...register("comprimento")} className="border p-1" />

      <label>Largura (m)</label>
      <input type="number" step="0.1" {...register("largura")} className="border p-1" />

      <label>Espessura (m)</label>
      <input type="number" step="0.01" {...register("espessura")} className="border p-1" />

      <label>Espaçamento dos ferros (m)</label>
      <input type="number" step="0.05" {...register("espacamento")} className="border p-1" />

      <label>Bitola do ferro</label>
      <select {...register("bitola")} className="border p-1">
        <option value="8">8 mm</option>
        <option value="10">10 mm</option>
        <option value="12.5">12,5 mm</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Calcular
      </button>
    </form>
  );
}
