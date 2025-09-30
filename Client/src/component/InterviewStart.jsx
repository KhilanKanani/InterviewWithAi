import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../main";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FindCandidateDetails from "../FindCurrentUser/FindCandidateDetails";
import { useSelector } from "react-redux";

const InterviewStart = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    FindCandidateDetails(id);
    const interview = useSelector((state) => state.interview.interviewdata);

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${SERVER_URL}/api/question/generate/${id}`, { withCredentials: true });
            setQuestions(res.data.questions);
            setCurrent(0);
        } catch (err) {
            navigate(`/details/${id}`);
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateQuestions();
    }, [id])

    // Call this when current question changes or user selects an answer
    useEffect(() => {
        if (questions.length === 0) return;

        setTimeLeft(40); // reset timer only when question changes

        const countdown = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);

                    setQuestions((prevQuestions) => {
                        const updated = [...prevQuestions];
                        if (!updated[current].answer) {
                            updated[current].answer = "Not Answered";
                        }
                        return updated;
                    });

                    if (current < questions.length - 1) {
                        setCurrent((prev) => prev + 1);
                    } else {
                        submitAnswers();
                    }

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [current, questions.length]);

    const handleNext = async () => {
        if (!questions[current].answer) {
            toast.error("Please select an answer!");
            return;
        }

        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            submitAnswers();
        }
    };

    const handleAnswer = (option) => {
        const updated = [...questions];
        updated[current].answer = option;
        setQuestions(updated);
    };

    const generateSummary = async (score) => {
        setLoading(true);
        try {
            await axios.put(`${SERVER_URL}/api/question/generateSummary/${id}`, { answers: questions, score }, { withCredentials: true });
            toast.success("Summary generated successfully!");
            navigate(`/history`);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Error generating summary!");
        } finally {
            setLoading(false);
        }
    };

    const submitAnswers = async () => {
        try {
            let score = 0;
            questions.forEach((q) => {
                if (q.answer === q.correctAnswer) score += 100 / questions.length;
            });

            await axios.put(`${SERVER_URL}/api/interview/savedata/${id}`, {
                answers: questions,
                score,
            }, { withCredentials: true });

            toast.success(`Completed! Score: ${score.toFixed(0)}%`);
            await generateSummary(score);
        } catch (err) {
            toast.error("Error saving interview!");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white p-4">
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                        <div className="w-16 h-16 md:w-20 md:h-20 border-8 border-white/30 border-t-purple-400 rounded-full animate-spin shadow-[0_0_30px_rgba(168,85,247,0.7)]"></div>
                        <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-8 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-xl md:text-2xl font-extrabold tracking-wide flex items-center">
                        {questions.length === 0 ? "Generating Questions" : "Generating Summary"}
                        <span className="animate-bounce ml-2 text-3xl md:text-4xl">...</span>
                    </p>
                    <p className="text-white/80 text-sm md:text-base italic animate-pulse">
                        {questions.length === 0 ? "Please wait while AI prepares your interview" : "Please wait while AI analyzes your answers"}
                    </p>
                </div>
            </div>
        );
    }

    const q = questions[current] || null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 p-4 md:p-6">
            <div className="w-full max-w-xl md:max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col">
                <h1 className="text-2xl md:text-4xl font-bold text-white text-center  mb-4 md:mb-6">{interview?.user?.title}</h1>
                <hr className="h-1 mb-3 bg-purple-500 border-0 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
                {/* <hr className="h-1 mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-0 rounded-full shadow-md" /> */}
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-2 md:gap-0">
                    <p className="text-lg md:text-xl text-white/90 font-semibold">
                        Question {current + 1} of {questions?.length}
                    </p>
                    <p className="text-lg md:text-xl text-yellow-300 font-bold text-center">
                        Time Left: {timeLeft}s
                    </p>
                </div>

                <p className="text-white text-base md:text-lg mb-4 md:mb-6">{q?.question}</p>

                <div className="flex flex-col gap-3">
                    {q?.options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className={`px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium text-white shadow-md transition
                                ${q?.answer === opt ? "bg-purple-600" : "bg-white/20 hover:bg-white/30"}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="mt-4 md:mt-6 py-2 md:py-3 rounded-3xl cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold hover:scale-105 transition shadow-lg"
                >
                    {current < questions?.length - 1 ? "Next" : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default InterviewStart;