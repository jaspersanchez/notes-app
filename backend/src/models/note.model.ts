import mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  body: string;
  user: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ref to User model
  },
  {
    timestamps: true,
  },
);

const NoteModel = mongoose.model<INote>("Note", noteSchema);

export default NoteModel;
