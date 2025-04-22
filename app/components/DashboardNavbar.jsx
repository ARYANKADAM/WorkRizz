"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import ProfilePanel from "./UserProfilePanel"; // Import the ProfilePanel component

const DashboardNavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    // Get user data from localStorage (where it's stored after login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to capitalize first letter of username
  const capitalizeUsername = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "User";
  };

  // Toggle profile panel
  const toggleProfilePanel = () => {
    setProfilePanelOpen(!profilePanelOpen);
  };

  // Close profile panel
  const closeProfilePanel = () => {
    setProfilePanelOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between py-3 px-6 bg-gray-900 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-orange-500 font-bold text-xl">WorkRizz</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 ml-20">
          <a
            href="/find-jobs"
            className="text-white hover:text-orange-400 font-medium"
          >
            Find Jobs
          </a>
          <a
            href="/people"
            className="text-white hover:text-orange-400 font-medium"
          >
            People
          </a>
          <a
            href="/education"
            className="text-white hover:text-orange-400 font-medium"
          >
            Education
          </a>
          <a
            href="/blog"
            className="text-white hover:text-orange-400 font-medium"
          >
            Blog
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-1 mx-6">
          <div className="relative flex items-center w-full max-w-lg">
            <input
              type="text"
              placeholder="Search jobs here"
              className="pl-4 pr-12 py-2 border border-gray-600 rounded-full w-full bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="cursor-pointer absolute right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full flex items-center justify-center">
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-6">
          <button className="text-white relative">
            <Bell size={22} className="cursor-pointer" />
            <span className=" absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile - Clickable username that opens profile panel */}
          <button
            className=" cursor-pointer text-white font-medium hover:text-orange-400"
            onClick={toggleProfilePanel}
          >
            {user ? capitalizeUsername(user.username) : "User"}
          </button>

          {/* Sign Up / Sign In buttons (shown when no user) */}
          {!user && (
            <div className="flex space-x-4">
              <a
                href="/signup"
                className="border border-white text-white px-4 py-1.5 rounded hover:bg-white hover:text-gray-900 transition"
              >
                Sign Up
              </a>
              <a
                href="/signin"
                className="bg-white text-gray-900 px-4 py-1.5 rounded hover:bg-gray-200 transition"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Panel */}
      <ProfilePanel
        isOpen={profilePanelOpen}
        onClose={closeProfilePanel}
        user={user}
      />
    </>
  );
};

export default DashboardNavBar;
