const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Save and load user from localStorage/session
export function getSavedUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE: login to backend
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  return data.user;
}

// PUBLIC_INTERFACE: register new user
export async function register(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  return data.user;
}

// PUBLIC_INTERFACE: logout by clearing session
export async function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
