import z from "zod";

export const CreateNoteSchema = z.object({
  title: z.string("Title is required"),
  body: z.string("Body is required"),
});
