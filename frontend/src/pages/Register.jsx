import { useState } from "react";
import api from "../api/axios";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    const res = await api.post("/auth/register", form);
    localStorage.setItem("token", res.data.token);
    onRegister();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-3">
        <h2 className="text-xl font-bold">Register</h2>
        <input className="border p-2 w-full" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 text-white w-full p-2" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
