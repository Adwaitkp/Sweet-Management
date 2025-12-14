import { useState } from "react";
import api from "../api/axios";

export default function Login({ onLogin, onShowRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            onLogin();
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-5xl">🍬</span>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back!</h1>
                    <p className="text-gray-500 mt-1">Login to Sweet Shop</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
                            type="email"
                            placeholder="Enter your email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50"
                        onClick={login}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <button
                        className="text-purple-600 font-semibold hover:underline"
                        onClick={onShowRegister}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}
