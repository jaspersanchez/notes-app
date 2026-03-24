import { Response } from "express";
import { CreateNoteSchema } from "../schemas/note.schema";
import NoteModel from "../models/note.model";
import mongoose from "mongoose";
import { AuthRequest, AuthRequestWithId } from "../types/auth.types";

export const getNotes = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user!;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const notes = await NoteModel.find({ user: _id }).sort({ createdAt: -1 });

  res.json(notes);
};

export const createNote = async (req: AuthRequest, res: Response) => {
  const { _id } = req.user!;

  // validate req.body
  const result = CreateNoteSchema.parse(req.body);

  // add note to db
  const note = await NoteModel.create({ ...result, user: _id });

  // return note to user
  res.status(201).json(note);
};

export const deleteNote = async (req: AuthRequestWithId, res: Response) => {
  const id = req.params.id;

  // Check if id is valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // 400 for bad request
    res.status(400).json({ message: "Invalid note id" });
    return;
  }

  const note = await NoteModel.findByIdAndDelete(id);

  // check if document exist
  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.status(204).json({ message: "Note is deleted" });
};
