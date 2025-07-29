const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper to provide token
function getToken() {
  return localStorage.getItem("token");
}

// PUBLIC_INTERFACE: fetch all user's notes
export async function fetchNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// PUBLIC_INTERFACE: create a new note
export async function createNote(note) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// PUBLIC_INTERFACE: update a note
export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// PUBLIC_INTERFACE: delete a note
export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
