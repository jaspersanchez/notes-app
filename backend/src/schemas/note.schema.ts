import z from "zod";

export const CreateNoteSchema = z.object({
  title: z.string(),
  body: z.string().optional(),
});
