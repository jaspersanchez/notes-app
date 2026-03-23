import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createNote,
  deleteNote,
  getNotes,
} from "../controllers/note.controllers";

const router = express.Router();

// all note routes are protected on every user
router.use(protect);

// get all notes
router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

export default router;
