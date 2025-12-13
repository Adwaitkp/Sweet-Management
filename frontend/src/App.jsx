import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const refreshAuth = () => setToken(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return showRegister ? (
      <Register onRegister={refreshAuth} />
    ) : (
      <Login onLogin={refreshAuth} />
    );
  }

  return <Sweets onLogout={logout} />;
}
