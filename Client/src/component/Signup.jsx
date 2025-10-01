import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading, setUserdata } from "../redux/UserSlice";
import { SERVER_URL } from "../main";
import axios from "axios";

export default function SignupPage() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!pattern.test(email)) {
                toast.error("Email Is Not Valid...");
                setloading(false);
                return;
            }

            dispatch(setIsLoading(true));

            const result = await axios.post(
                `${SERVER_URL}/api/auth/signup`,
                { fullname, email, mobile, password },
                { withCredentials: true }
            );

            dispatch(setUserdata(result.data));
            dispatch(setIsLoading(false));
            toast.success("Signup Successful 🎉");
            setloading(false);

            navigate("/");
            setFullname("");
            setEmail("");
            setMobile("");
            setPassword("");

        }

        catch (error) {
            console.log("Signup Error :", error.message);
            setloading(false);
            dispatch(setIsLoading(false));
            toast.error(error.response?.data?.message);
        }
    };


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
            <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-5 sm:p-9.5 w-full sm:w-100">
                <h2 className="sm:text-3xl text-2xl font-extrabold text-white text-center mb-8">
                    🚀Join Interview Hub
                </h2>

                <form onSubmit={handleSignup} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        required
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                    />

                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        minLength={10}
                        maxLength={10}
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-purple-700 hover:to-pink-700 transition-transform"
                        disabled={loading}
                    >
                        {loading == true ? "Loading..." : "Signup"}
                    </button>
                </form>

                <p className="mt-6 text-center text-white/80">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-white font-semibold underline hover:text-yellow-300"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
