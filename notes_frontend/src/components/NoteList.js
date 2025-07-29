import React from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import "./NoteList.css";

// PUBLIC_INTERFACE: List all notes
export default function NoteList() {
  const { notes, loading } = useNotes();

  return (
    <div className="note-list">
      <div className="note-list-header">
        <h2>Your Notes</h2>
        <Link className="btn btn-primary" to="/notes/new">
          + New Note
        </Link>
      </div>
      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">No notes yet. Create your first note!</div>
      ) : (
        <ul className="notes-ul">
          {notes.map((note) => (
            <li key={note.id} className="note-list-item">
              <Link to={`/notes/${note.id}`} className="note-title-link">
                <strong>{note.title || <em>(Untitled)</em>}</strong>
                <span className="note-date">
                  {note.updatedAt
                    ? new Date(note.updatedAt).toLocaleString()
                    : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
