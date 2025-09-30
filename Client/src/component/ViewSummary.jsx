import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FindCandidateDetails from "../FindCurrentUser/FindCandidateDetails";
import { FaArrowLeft } from "react-icons/fa";

const ViewSummary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    FindCandidateDetails(id);
    const interview = useSelector((state) => state.interview.interviewdata);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 sm:p-8 p-4 flex justify-center items-center">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 p-2 cursor-pointer rounded-full bg-purple-700 text-white hover:bg-purple-800 transition z-10"
            >
                <FaArrowLeft size={18} />
            </button>

            <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg sm:p-8 p-3 rounded-3xl shadow-xl text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">Interview Summary</h1>
                <p className="text-yellow-300 text-lg font-semibold mb-6">Score: {interview?.user?.score.toFixed(0)}%</p>
                <div className="whitespace-pre-line text-lg">{interview?.user?.summary}</div>
            </div>
        </div>
    );
};

export default ViewSummary;
