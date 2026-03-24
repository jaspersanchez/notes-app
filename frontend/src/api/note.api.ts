import type { NoteData } from "../types";
import { privateApi } from "./auth.api";

export const getNotes = () => privateApi.get("/notes");
export const createNote = (data: NoteData) => privateApi.post("/notes", data);
export const deleteNote = (id: string) => privateApi.delete(`/notes/${id}`);
