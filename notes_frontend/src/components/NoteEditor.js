import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useParams, useNavigate } from "react-router-dom";
import "./NoteEditor.css";

// PUBLIC_INTERFACE: Edit or create note
export default function NoteEditor({ isNew = false }) {
  const { noteId } = useParams();
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew && noteId) {
      const found = notes.find((n) => String(n.id) === String(noteId));
      if (found) setNote({ title: found.title, content: found.content });
      else setError("Note not found.");
    } else {
      setNote({ title: "", content: "" });
    }
  }, [noteId, notes, isNew]);

  // PUBLIC_INTERFACE: Handle save (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        await createNote(note);
        navigate("/");
      } else {
        await updateNote(noteId, note);
        navigate("/");
      }
    } catch {
      setError("Failed to save note. Try again.");
    }
    setSaving(false);
  };

  // PUBLIC_INTERFACE: Handle delete
  const handleDelete = async () => {
    if (window.confirm("Delete this note?")) {
      try {
        await deleteNote(noteId);
        navigate("/");
      } catch {
        setError("Failed to delete note.");
      }
    }
  };

  return (
    <div className="note-editor-card">
      <h2>{isNew ? "New Note" : "Edit Note"}</h2>
      <form className="note-editor-form" onSubmit={handleSave}>
        <label>
          Title:
          <input
            className="input"
            type="text"
            value={note.title}
            onChange={(e) => setNote((n) => ({ ...n, title: e.target.value }))}
            maxLength={100}
            disabled={saving}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            className="textarea"
            rows={10}
            value={note.content}
            onChange={(e) =>
              setNote((n) => ({ ...n, content: e.target.value }))
            }
            disabled={saving}
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <div className="editor-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={saving}
          >
            {isNew ? "Create" : "Save"}
          </button>
          {!isNew && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelete}
              disabled={saving}
            >
              Delete
            </button>
          )}
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/")}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
