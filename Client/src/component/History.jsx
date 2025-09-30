import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FindUserHistory from "../FindCurrentUser/FindUserHistory";
import { FaArrowLeft } from "react-icons/fa";

const InterviewHistory = () => {
    const User = useSelector((state) => state.user.userdata);
    const History = useSelector((state) => state.interview.history);
    FindUserHistory(User?.user?._id);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 p-6 flex flex-col">
            {/* Header / Back Button */}
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 p-2 cursor-pointer rounded-full bg-purple-700 text-white hover:bg-purple-800 transition z-10"
                >
                    <FaArrowLeft size={18} />
                </button>
                <h1 className="flex-grow text-center text-4xl font-extrabold text-white drop-shadow-lg">
                    Interview History
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
                {History?.history?.length === 0 ? (
                    <div className="w-full text-center text-white/90 text-lg font-medium">
                        You haven’t attempted any interviews yet.
                    </div>
                ) : (
                    History?.history?.map((interview, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-between w-full sm:w-100 md:w-140 p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-300"
                        >
                            {/* Header: Title and Status */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="sm:text-2xl text-xl font-bold text-white drop-shadow-lg">
                                    {interview.title || "AI Interview"}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full font-semibold text-sm ${interview.completed
                                            ? "bg-green-500 text-white shadow-md"
                                            : "bg-yellow-500 text-white shadow-md"
                                        }`}
                                >
                                    {interview.completed ? "Completed" : "Pending"}
                                </span>
                            </div>

                            {/* Date Info */}
                            <p className="text-white mb-4">
                                <b>Date:</b>{" "}
                                {new Date(interview.createdAt).toLocaleString()}
                            </p>

                            {/* Candidate Info */}
                            <div className="flex flex-col gap-1 mb-2 text-white/90">
                                <p><b>Candidate:</b> {interview.name || "N/A"}</p>
                                <p><b>Email:</b> {interview.email || "N/A"}</p>
                                <p><b>Phone:</b> {interview.phone || "N/A"}</p>
                            </div>

                            <p className="mb-2 text-white font-semibold">
                                <b>Score:</b> {interview.score?.toFixed(0) || 0}%
                            </p>

                            {/* Button */}
                            <button
                                onClick={() =>
                                    navigate(
                                        !interview.completed
                                            ? `/details/${interview._id}`
                                            : `/view/${interview._id}`
                                    )
                                }
                                className={`mt-auto cursor-pointer w-full py-3 rounded-3xl font-bold text-white shadow-lg transition-all ${interview.completed
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:scale-105"
                                    }`}
                            >
                                {interview.completed ? "View Details" : "Start"}
                            </button>

                            {interview.completed && (
                                <button
                                    onClick={() => navigate(`/summary/${interview._id}`)}
                                    className="flex-1 cursor-pointer py-3 mt-3 rounded-3xl font-bold text-white shadow-lg transition-all bg-green-500 hover:bg-green-600"
                                >
                                    View Summary
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InterviewHistory;
