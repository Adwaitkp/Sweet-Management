import { useState } from "react";
import api from "../api/axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    onLogin();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-3">
        <h2 className="text-xl font-bold">Login</h2>
        <input className="border p-2 w-full" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white w-full p-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
