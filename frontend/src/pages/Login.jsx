import { useState } from "react";
import api from "../api/axios";

export default function Login({ onLogin, onShowRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
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
            <p className="text-sm text-center mt-2">
                Don’t have an account?{" "}
                <button
                    className="text-blue-600 underline"
                    onClick={onShowRegister}
                >
                    Register
                </button>
            </p>
        </div>
    );
}
