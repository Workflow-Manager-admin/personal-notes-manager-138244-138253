import React from "react";
import { useAuth } from "../context/AuthContext";
import "./TopNav.css";

// PUBLIC_INTERFACE: TopNav bar component
export default function TopNav() {
  const { user, logout } = useAuth();

  return (
    <header className="topnav">
      <div className="topnav-title">
        <span className="topnav-logo">📝</span>
        <span className="topnav-appname">Notes App</span>
      </div>
      <div className="topnav-actions">
        <span className="topnav-user">Hello, {user && user.email}</span>
        <button className="btn btn-accent" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
