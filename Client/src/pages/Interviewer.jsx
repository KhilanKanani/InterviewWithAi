import React, { useEffect, useState } from "react";
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GetAllInterviewData from "../FindCurrentUser/GetAllInterviewData";
import { useSelector } from "react-redux";

const Interviewer = () => {
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortScoreAsc, setSortScoreAsc] = useState(true);
  const [sortNameAsc, setSortNameAsc] = useState(true);
  const [sortTitleAsc, setSortTitleAsc] = useState(true);

  // Fetch all candidates
  GetAllInterviewData();
  const candidates = useSelector((state) => state.interview.allInterview);

  // Search
  useEffect(() => {
    const filteredData = candidates?.user?.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, candidates]);

  // Sort functions
  const handleSortByScore = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortScoreAsc ? a.score - b.score : b.score - a.score
    );
    setFiltered(sorted);
    setSortScoreAsc(!sortScoreAsc);
  };
  const handleSortByName = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortNameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFiltered(sorted);
    setSortNameAsc(!sortNameAsc);
  };
  const handleSortByTitle = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortTitleAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setFiltered(sorted);
    setSortTitleAsc(!sortTitleAsc);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4 md:p-6">
      {/* Header */}
      <header className="w-full right-3 left-3 flex justify-between items-center p-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl mb-6 gap-3">
        <div className="flex items-center justify-start gap-3 sm:flex-wrap">
          <img src="ai.png" alt="Logo" className="w-12 h-12 rounded-xl shadow-lg" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg sm:text-left">
            <p className="sm:hidden block">Dashboard</p>
            <p className="hidden sm:block">Interviewer Dashboard</p>
          </h1>
        </div>
        <button
          onClick={() => navigate("/logout")}
          className="text-white flex gap-2 cursor-pointer items-center font-semibold hover:text-gray-200 mt-2 sm:mt-0"
        >
          <FaSignOutAlt className="sm:mt-1 cursor-pointer sm:text-lg text-2xl" /> <p className="hidden sm:block">Logout</p>
        </button>
      </header>

      {/* Search + Sort */}
      <div className=" z-20 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700 p-3 md:p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center mb-6">
        {/* Search */}
        <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-xl px-3 py-2 w-full sm:w-96">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name..."
            className="bg-transparent outline-none text-white placeholder-white w-full"
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
          <button
            onClick={handleSortByScore}
            className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-3 md:px-4 py-2 rounded-xl text-white font-bold hover:scale-105 transition shadow-lg text-sm md:text-base"
          >
            Score {sortScoreAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
          <button
            onClick={handleSortByName}
            className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 px-3 md:px-4 py-2 rounded-xl text-white font-bold hover:scale-105 transition shadow-lg text-sm md:text-base"
          >
            Name {sortNameAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
          <button
            onClick={handleSortByTitle}
            className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 px-3 md:px-4 py-2 rounded-xl text-white font-bold hover:scale-105 transition shadow-lg text-sm md:text-base"
          >
            Role {sortTitleAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>

      {/* Candidate Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 flex-1">
        {filtered?.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c._id}
              className="bg-white/20 h-fit backdrop-blur-lg rounded-3xl p-4 md:p-6 shadow-2xl border border-white/20 transition hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-md mb-2 truncate">{c.name}</h2>
                <p className="text-white/90 text-sm md:text-base"><b>Role:</b> {c.title}</p>
                <p className="text-white/90 text-sm md:text-base"><b>Email:</b> {c.email}</p>
                <p className="text-white/90 text-sm md:text-base"><b>Phone:</b> {c.phone}</p>
                <p className="text-white/90 text-sm md:text-base"><b>Score:</b> {c.score.toFixed(0)}%</p>
                <p className={`mt-2 inline-block cursor-pointer px-3 py-1 rounded-full font-semibold text-sm ${c.completed ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                  {c.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => navigate(!c.completed ? "" : `/view/${c._id}`)}
                  className={`w-full py-2 md:py-3 rounded-3xl font-bold text-white shadow-lg transition-all ${c.completed ? "bg-blue-500 hover:bg-blue-600" : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:scale-105"}`}
                >
                  {c.completed ? "View Details" : "Pending"}
                </button>
                {c.completed && (
                  <button
                    onClick={() => navigate(`/summary/${c._id}`)}
                    className="w-full py-2 md:py-3 rounded-3xl font-bold text-white shadow-lg transition-all bg-green-500 hover:bg-green-600"
                  >
                    View Summary
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white font-semibold col-span-full text-center">No candidates found</p>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center  mt-6 text-white font-semibold text-sm md:text-base">
        © 2025 AI Interview Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default Interviewer;
