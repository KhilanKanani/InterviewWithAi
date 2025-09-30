import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading, setUserdata } from "../redux/UserSlice";
import { SERVER_URL } from "../main";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      dispatch(setIsLoading(true));

      const result = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserdata(result.data));
      dispatch(setIsLoading(false));
      toast.success("Login Successful! 🎉");
      setLoading(false);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.message);
      dispatch(setIsLoading(false));
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-5 sm:p-9.5 w-full sm:w-100">
        <h2 className="sm:text-3xl text-2xl font-extrabold text-white text-center mb-8">
          🔐 Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
          />

          <button
            type="submit"
            className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-purple-700 hover:to-pink-700 transition-transform"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/80">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-white font-semibold underline hover:text-yellow-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
