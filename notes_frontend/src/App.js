import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import NotesProvider from "./context/NotesContext";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function AuthenticatedApp() {
  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/notes/:noteId" element={<NoteEditor />} />
            <Route path="/notes/new" element={<NoteEditor isNew />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      {user ? (
        <Route path="/*" element={<AuthenticatedApp />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

// PUBLIC_INTERFACE
function App() {
  // App is wrapped with AuthProvider and NotesProvider for global state
  return (
    <Router>
      <AuthProvider>
        <NotesProvider>
          <AppRouter />
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
