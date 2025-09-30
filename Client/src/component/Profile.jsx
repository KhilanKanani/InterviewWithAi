import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../main";
import axios from "axios";
import { setUserdata } from "../redux/UserSlice";
import { toast } from "react-toastify";
import { FaCamera, FaArrowLeft } from "react-icons/fa";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Userdata = useSelector((state) => state.user.userdata);
  console.log(Userdata);

  const [frontendImage, setFrontendImage] = useState(Userdata?.user?.image);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    let formData = new FormData();
    formData.append("image", backendImage);

    try {
      setLoading(true);

      const res = await axios.put(`${SERVER_URL}/api/user/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      dispatch(setUserdata(res.data));
      toast.success("Profile updated successfully!");
      navigate("/");
      setBackendImage(null);
      setLoading(false);
    }

    catch (err) {
      console.error(err);
      toast.error("Failed to update profile image.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative">

      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 cursor-pointer rounded-full bg-purple-700 text-white hover:bg-purple-800 transition z-10"
      >
        <FaArrowLeft size={18} />
      </button>

      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl sm:p-10 p-5 w-full max-w-md flex flex-col items-center relative">

        {/* Profile Image */}
        <div className="relative mb-6 mt-6">
          <img
            src={frontendImage}
            onClick={() => window.open(frontendImage, "_blank")}
            alt="Profile"
            className="w-32 cursor-pointer h-32 rounded-full object-cover border-4 border-white/50"
          />
          <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={imageRef}
            />
          </label>
        </div>

        {/* Readonly User Data */}
        <div className="space-y-4 w-full mb-6">
          <input
            type="text"
            value={Userdata?.user?.fullName || ""}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-white/50 bg-white/20 opacity-80 cursor-not-allowed text-white placeholder-white/70  focus:outline-none"
          />
          <input
            type="text"
            value={Userdata?.user?.email || ""}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-white/50 bg-white/20  opacity-80 cursor-not-allowed text-white placeholder-white/70  focus:outline-none"
          />
          <input
            type="text"
            value={Userdata?.user?.mobileNumber || ""}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-white/50 bg-white/20 opacity-80 cursor-not-allowed text-white placeholder-white/70  focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full px-6 cursor-pointer py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:from-purple-700 hover:to-pink-700 transition-transform disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Image"}
        </button>
      </div>
    </div>
  );
}
