import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setInterviewdata } from "../redux/InterviewSlice";
import FindCandidateDetails from "../FindCurrentUser/FindCandidateDetails";
import axios from "axios";
import { SERVER_URL } from "../main";
import { FaArrowLeft } from "react-icons/fa";

const CandidateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    FindCandidateDetails(id);
    const candidate = useSelector((state) => state.interview.interviewdata);

    const [title, settitle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (candidate?.user) {
            settitle(candidate.user.title || "");
            setName(candidate.user.name || "");
            setEmail(candidate.user.email || "");
            setPhone(candidate.user.phone || "");
        }
    }, [candidate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axios.put(`${SERVER_URL}/api/interview/editDetails/${id}`, { title, name, email, phone }, {
                withCredentials: true,
            });

            dispatch(setInterviewdata(res.data));
            toast.success("Your interview will be started");
            navigate(`/interview/${id}`)
            setLoading(false);
        }

        catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 p-4">
            {/* Back Arrow */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 p-2 cursor-pointer rounded-full bg-purple-700 text-white hover:bg-purple-800 transition z-10"
            >
                <FaArrowLeft size={18} />
            </button><div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl sm:p-8 p-4">
                <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-900">
                    Candidate Details
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Fill your information to start the AI-powered interview
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-2">
                            Interview Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="ex..Frontend Development"
                            className={`px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-inner
      ${candidate?.user?.title ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
                            required
                            disabled={candidate?.user?.title} // Disable if title already exists
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe..."
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-inner"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com..."
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-inner"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-2">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 9876543210..."
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-inner"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-3xl cursor-pointer font-bold text-white text-lg shadow-xl transition-all duration-300 ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                            }`}
                    >
                        {loading ? "Submitting..." : "Start Interview"}
                    </button>
                </form>

                {candidate?.user && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                        <h2 className="font-semibold text-gray-800 mb-2">Existing Info</h2>
                        <p><b>Name:</b> {candidate.user.name || "Not set"}</p>
                        <p><b>Email:</b> {candidate.user.email || "Not set"}</p>
                        <p><b>Phone:</b> {candidate.user.phone || "Not set"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CandidateForm;
