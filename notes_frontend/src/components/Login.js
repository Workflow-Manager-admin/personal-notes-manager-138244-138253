import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";

// PUBLIC_INTERFACE: User login form
export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.success) setError(result.error);
    else navigate("/");
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form-card" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <label>
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>
        <label>
          Password:
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="form-alt">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
