import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  endTime: z.date({ required_error: 'Horário é obrigatório' }),
});

export type createTaskFormData = z.infer<typeof createTaskSchema>;