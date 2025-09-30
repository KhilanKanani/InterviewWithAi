import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setInterviewdata } from "../redux/InterviewSlice";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const HomePage = () => {
  const Userdata = useSelector((state) => state.user.userdata);

  const [started, setStarted] = useState(false);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleResumeDataStore = async () => {
    if (!resume) {
      toast.error("Please select a resume!");
      return;
    }

    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("resume", resume);

      const result = await axios.put(
        `${SERVER_URL}/api/interview/upload`,
        formData,
        { withCredentials: true }
      );

      dispatch(setInterviewdata(result.data));
      navigate(`/details/${result?.data?.user?._id}`);
      toast.success("Resume Upload Successful...");
      setResume("");
    } catch (err) {
      console.log("ResumeUpload Error :", err.message);
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleViewResume = () => {
    if (!Userdata?.user?.resume) {
      toast.error("No resume uploaded!");
      return;
    }

    const fileUrl = Userdata.user.resume;
    const viewerUrl = `${fileUrl}`;
    window.open(viewerUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 sm:p-6 relative">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl flex-wrap">
        <div className="flex items-center space-x-2 md:space-x-3">
          <img
            src="ai.png"
            alt="Company Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-lg"
          />
          <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg">
            Interview Hub
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 md:space-x-6 mt-2 md:mt-0">
          <button
            className="text-white cursor-pointer font-semibold hover:text-gray-200"
            onClick={() => navigate("/history")}
          >
            History
          </button>
          <button
            className="text-white cursor-pointer font-semibold hover:text-gray-200"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="text-white cursor-pointer font-semibold hover:text-gray-200"
            onClick={() => navigate("/Logout")}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl md:mt-0"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </header>


      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-700 shadow-xl transform transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 text-white">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <nav className="flex items-start flex-col space-y-6 p-6 text-white font-semibold">
          <button onClick={() => navigate("/history")}>History</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/Logout")}>Logout</button>
        </nav>
      </div>

      {/* Main Section */}
      {!started ? (
        <main className="flex flex-col items-center justify-center text-center flex-grow px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Welcome to Interview Hub!
          </h2>
          <p className="text-white/90 mb-6 max-w-xl text-lg drop-shadow-lg">
            Get ready to experience interactive AI-powered interviews. Practice
            your skills, improve your answers, and ace your next interview.
          </p>
          <button
            className="px-8 py-3 cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl text-white text-lg font-bold shadow-xl hover:scale-105 hover:shadow-[0_15px_30px_rgba(255,165,0,0.6)] transition-all duration-300"
            onClick={() => setStarted(true)}
          >
            Start Interview
          </button>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center text-center flex-grow px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl">
            Upload Your Resume
          </h2>
          <p className="text-white/90 mb-4">
            Please upload your resume before starting the interview.
          </p>

          <div className="flex sm:gap-5 items-center flex-col sm:flex-wrap">
            {/* Hidden file input */}
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleResumeUpload}
              ref={fileInputRef}
              className="hidden"
            />

            {/* Custom button */}
            <button
              onClick={triggerFileInput}
              className="mb-4 px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-2xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {resume ? "Change Resume" : "Choose File"}
            </button>

            {resume && (
              <p className="text-white mb-4">
                <span className="font-semibold">{resume.name}</span>
              </p>
            )}
          </div>

          <button
            className={`px-8 py-3 rounded-3xl text-lg font-bold shadow-2xl transition-all duration-300
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,255,0,0.5)] cursor-pointer text-white"
              }`}
            onClick={handleResumeDataStore}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit & Start Interview"}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-white/80 text-center mt-10 text-sm">
        © 2025 AI Interview Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
