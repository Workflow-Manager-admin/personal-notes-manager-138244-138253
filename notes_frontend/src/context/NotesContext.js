import React, { createContext, useContext, useEffect, useState } from "react";
import * as notesApi from "../services/notesApi";
import { useAuth } from "./AuthContext";

// NotesContext provides all note data and CRUD ops to children
const NotesContext = createContext();

// PUBLIC_INTERFACE: Provider for notes
export default function NotesProvider({ children }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // (Re)load notes on login/logout
  useEffect(() => {
    if (user) {
      loadNotes();
    } else {
      setNotes([]);
    }
    // eslint-disable-next-line
  }, [user]);

  // PUBLIC_INTERFACE
  const loadNotes = async () => {
    setLoading(true);
    try {
      const notes = await notesApi.fetchNotes();
      setNotes(notes);
    } catch {
      setNotes([]);
    }
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  const createNote = async (note) => {
    const newNote = await notesApi.createNote(note);
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  // PUBLIC_INTERFACE
  const updateNote = async (id, note) => {
    const updated = await notesApi.updateNote(id, note);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
    return updated;
  };

  // PUBLIC_INTERFACE
  const deleteNote = async (id) => {
    await notesApi.deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        loadNotes,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

// PUBLIC_INTERFACE: useNotes for accessing notes data
export function useNotes() {
  return useContext(NotesContext);
}
