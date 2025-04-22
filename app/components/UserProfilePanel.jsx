"use client";
import React, { useState, useEffect, useRef } from "react";
import { List, Settings, LogOut, Briefcase, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePanel = ({ isOpen, onClose, user }) => {
  const panelRef = useRef(null);
  const router = useRouter();
  const [calculating, setIsCalculating] = useState(false);
  const [userScore, setUserScore] = useState({ profileScore: undefined });

  const handleLogout = () => {
    router.push("/");
  };

  // Recruiter navigation functions
  const navigateToDashboard = () => {
    router.push("/dashboard/recruiter");
    onClose();
  };

  const navigateToJobs = () => {
    router.push("/dashboard/recruiter/jobs");
    onClose();
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.profileScore) {
      setUserScore({
        profileScore: storedUser.profileScore,
        explanation: storedUser.explanation || "",
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const calculateScore = async () => {
    try {
      setIsCalculating(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Stored user data:", storedUser); // Debug log

      if (!storedUser) {
        alert("Please log in first");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing");
        return;
      }

      const response = await fetch("/api/employee/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: storedUser.email,
          username: storedUser.username,
          workExperience: storedUser.workExperience || "No experience",
          graduation: storedUser.graduation || 0,
          currentCourse: storedUser.currentCourse || "Not specified",
          workStatus: storedUser.workStatus || "Not specified",
          age: storedUser.age || 0,
          role: storedUser.role,
        }),
      });

      console.log("API Response status:", response.status); // Debug log

      if (!response.ok) {
        throw new Error("Failed to generate score");
      }

      const data = await response.json();
      console.log("Score data:", data); // Debug log

      setUserScore({
        profileScore: data.score,
        explanation: data.explanation,
      });

      const updatedUser = {
        ...storedUser,
        profileScore: data.score,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error calculating score:", error);
      alert("Failed to generate profile score");
    } finally {
      setIsCalculating(false);
    }
  };

  if (!user) return null;

  const isEmployee = user.role === "employee";
  const isRecruiter = user.role === "recruiter";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      ref={panelRef}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 py-4 border-b">
        <div className="flex items-start">
          <div className="relative mr-4">
            <label htmlFor="profilePic" className="cursor-pointer">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>Email: {user.email}</p>
              {isEmployee && (
                <>
                  <p>Age: {user.age || "N/A"}</p>
                  <p>Graduation: {user.graduation || "N/A"}</p>
                  <p>Course: {user.currentCourse || "N/A"}</p>
                  <p>Open for : {user.workStatus || "N/A"}</p>
                </>
              )}
              {isRecruiter && (
                <>
                  <p>Company: {user.company || "N/A"}</p>
                  <p>Position: {user.position || "N/A"}</p>
                </>
              )}
            </div>
            <button
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
              onClick={() => {
                router.push("/profile");
                onClose();
              }}
            >
              View & Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 bg-white rounded-xl ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Your Profile Performance
          </h3>
        </div>

        {/* Profile Score Section */}
        {/* Profile Score Section */}
        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-800 font-medium">
              Your Profile Score
            </p>
            <span className="text-xl font-bold text-blue-700">
              {userScore?.profileScore
                ? `${userScore.profileScore}/100`
                : "Not generated"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-blue-300 h-2 mt-2 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${userScore?.profileScore || 0}%` }}
            />
          </div>

          {/* Generate Score Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={calculateScore}
              disabled={calculating}
              className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-300 ${
                calculating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {calculating ? "Calculating..." : "Generate Score"}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="bg-blue-100 rounded-lg p-4">
          <div className="flex justify-between gap-4">
            {isEmployee && (
              <>
                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
                  <p className="text-2xl font-bold text-blue-700">12</p>
                  <p className="text-gray-700 mt-1">Search Appearances</p>
                  <button className="text-sm text-blue-500 mt-2 hover:underline">
                    View all
                  </button>
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
                  <p className="text-2xl font-bold text-blue-700">5</p>
                  <p className="text-gray-700 mt-1">Applications</p>
                  <button className="text-sm text-blue-500 mt-2 hover:underline">
                    View all
                  </button>
                </div>
              </>
            )}

            {isRecruiter && (
              <>
                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
                  <p className="text-2xl font-bold text-blue-700">8</p>
                  <p className="text-gray-700 mt-1">Jobs Posted</p>
                  <button className="text-sm text-blue-500 mt-2 hover:underline">
                    View all
                  </button>
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
                  <p className="text-2xl font-bold text-blue-700">23</p>
                  <p className="text-gray-700 mt-1">Applicants</p>
                  <button className="text-sm text-blue-500 mt-2 hover:underline">
                    View all
                  </button>
                </div>
              </>
            )}
          </div>
        </div> */}
      </div>

      <div className="px-6 py-4">
        <ul className="space-y-4">
          {/* Conditional navigation based on user role */}
          {isRecruiter && (
            <>
              <li>
                <button
                  className="flex items-center text-gray-800 hover:text-blue-600 w-full"
                  onClick={navigateToDashboard}
                >
                  <List className="mr-3" size={20} />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <Link href={"/dashboard/recruiter/jobs"}>
                  <button
                    className="flex items-center text-gray-800 hover:text-blue-600 w-full"
                    onClick={navigateToJobs}
                  >
                    <Settings className="mr-3" size={20} />
                    <span>Jobs</span>
                  </button>
                </Link>
              </li>
            </>
          )}

          {isEmployee && (
            <>
              <li>
                <button
                  className="flex items-center text-gray-800 hover:text-blue-600 w-full"
                  //   onClick={navigateToAppliedJobs}
                >
                  <Briefcase className="mr-3" size={20} />
                  <span>Applied Jobs</span>
                </button>
              </li>
              <li>
                <button
                  className="flex items-center text-gray-800 hover:text-blue-600 w-full"
                  //   onClick={navigateToResume}
                >
                  <FileText className="mr-3" size={20} />
                  <span>Resume</span>
                </button>
              </li>
            </>
          )}

          {/* Logout button for both roles */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-800 hover:text-blue-600 w-full"
            >
              <LogOut className="mr-3" size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePanel;
