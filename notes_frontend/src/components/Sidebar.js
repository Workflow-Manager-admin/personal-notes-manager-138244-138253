import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// PUBLIC_INTERFACE: Sidebar with navigation
export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink className="sidebar-link" to="/" end>
            My Notes
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar-link" to="/notes/new">
            + New Note
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
