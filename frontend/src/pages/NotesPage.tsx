import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { INote } from "../types";
import * as noteApi from "../api/note.api";

const NotesPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<INote[]>([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await noteApi.getNotes();

        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, [user, navigate]);

  const handleCreateNote = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // check if all fields are included
    if (!title || !body || !user) return;

    // send data to db
    const res = await noteApi.createNote({ title, body });
    // add response to the notes array
    setNotes((prev) => [res.data, ...prev]);
    setTitle("");
    setBody("");
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    noteApi.deleteNote(id);

    setNotes((prev) => prev.filter((prevNote) => prevNote._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER  */}
      <header className="bg-gray-50 px-4 py-2 max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex gap-2">
          <h1 className="font-semibold text-gray-900 text-sm">My Notes</h1>
          <p className="text-sm text-gray-400">{`Welcome back! ${user?.name}`}</p>
        </div>
        <div className="flex gap-2">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white text-xs rounded-lg px-2 py-1 font-medium hover:bg-indigo-700 transition"
            >
              + New Note
            </button>
          )}
          <button
            onClick={handleLogout}
            className="text-sm border border-gray-200 px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* NEW NOTE FORM  */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {showForm && (
          <form
            onSubmit={handleCreateNote}
            className="bg-gray-50 border-gray-100 shadow-sm rounded-xl p-4 space-y-3 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">New Note</h2>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Write your note..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="text-sm font-medium text-white bg-indigo-600 rounded-lg px-4 py-1.5 hover:bg-indigo-700 transition"
              >
                Create Note
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm border border-gray-200 px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* NOTES GRID  */}
        {loading && (
          <p className="text-sm text-gray-400 text-center py-12">Loading...</p>
        )}

        {!loading && notes.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-12">
            Not notes yet. Hit the + New Note button to start
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-sm text-gray-900">
                  {note.title}
                </h3>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {note.body}
              </p>
              <p className="text-xs text-gray-300 mt-3">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesPage;
