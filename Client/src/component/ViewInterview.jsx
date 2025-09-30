import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FindCandidateDetails from "../FindCurrentUser/FindCandidateDetails";
import { useSelector } from "react-redux";

const ViewInterview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    FindCandidateDetails(id);
    const interview = useSelector((state) => state.interview.interviewdata);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 p-4 md:p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center mb-6 md:mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 cursor-pointer rounded-full bg-purple-700 text-white hover:bg-purple-800 transition z-10"
                >
                    <FaArrowLeft size={18} />
                </button>
                <h1 className="flex-grow text-center text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg px-8 md:px-0">
                    {interview?.user?.title || "AI Interview"}
                </h1>
            </div>

            {/* Questions & Answers */}
            <div className="flex flex-col gap-6 items-center justify-center">
                {interview?.user?.questions.map((q, idx) => {
                    const userAnswerObj = interview?.user?.interviewHistory?.find(
                        (h) => h.question === q.question
                    );
                    const userAnswer = userAnswerObj?.answer || "Not Answered";
                    const correctAnswer = q.correctAnswer;

                    return (
                        <div
                            key={idx}
                            className="bg-white/20 w-full max-w-3xl backdrop-blur-lg p-4 md:p-6 rounded-2xl shadow-2xl border border-white/20"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                {idx + 1}. {q.question}
                            </h3>
                            <ul className="text-white/90 mb-2 space-y-1">
                                {q.options.map((opt, i) => (
                                    <li
                                        key={i}
                                        className={`ml-4 list-disc ${opt === correctAnswer
                                                ? "text-green-400 font-semibold"
                                                : opt === userAnswer
                                                    ? "text-yellow-400"
                                                    : ""
                                            }`}
                                    >
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-white text-sm md:text-base">
                                <b>Your Answer:</b> {userAnswer}
                            </p>
                            <p className="text-white text-sm md:text-base">
                                <b>Correct Answer:</b> {correctAnswer}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewInterview;