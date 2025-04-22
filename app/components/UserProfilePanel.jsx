'use client'
import React, { useState, useEffect, useRef } from "react";
import { List, Settings, LogOut, Briefcase, FileText } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const ProfilePanel = ({ isOpen, onClose, user }) => {
  const panelRef = useRef(null);
  const router = useRouter(); 

  const handleLogout = () => {
    router.push('/');
  };

  // Recruiter navigation functions
  const navigateToDashboard = () => {
    router.push('/dashboard/recruiter');
    onClose();
  };

  const navigateToJobs = () => {
    router.push('/dashboard/recruiter/jobs');
    onClose();
  };

  // Employee navigation functions
  const navigateToAppliedJobs = () => {
    router.push('/applied-jobs');
    onClose();
  };

  const navigateToResume = () => {
    router.push('/resume');
    onClose();
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload-profile-photo', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // handle UI refresh or local update
        console.log("Photo uploaded", data.url);
      } else {
        console.error("Failed to upload photo");
      }
    } catch (err) {
      console.error("Error uploading photo", err);
    }
  };

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

  if (!user) return null;

  const isEmployee = user.role === 'employee';
  const isRecruiter = user.role === 'recruiter';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      ref={panelRef}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicUpload}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              {isEmployee && (
                <>
                  <p>Age: {user.age || 'N/A'}</p>
                  <p>Graduation: {user.graduation || 'N/A'}</p>
                  <p>Course: {user.course || 'N/A'}</p>
                </>
              )}
              {isRecruiter && (
                <>
                  <p>Company: {user.company || 'N/A'}</p>
                  <p>Position: {user.position || 'N/A'}</p>
                </>
              )}
            </div>
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
              onClick={() => {
                router.push('/profile');
                onClose();
              }}
            >
              View & Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Your profile performance</h3>
          <span className="text-gray-500 text-sm">Last 90 days</span>
        </div>

        <div className="bg-blue-50 rounded-md p-4">
          <div className="flex justify-between">
            {isEmployee && (
              <>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-700">Search Appearances</p>
                  <button className="text-blue-600 text-sm mt-1">View all</button>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-700">Applications</p>
                  <button className="text-blue-600 text-sm mt-1">View all</button>
                </div>
              </>
            )}
            {isRecruiter && (
              <>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-700">Jobs Posted</p>
                  <button className="text-blue-600 text-sm mt-1">View all</button>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-700">Applicants</p>
                  <button className="text-blue-600 text-sm mt-1">View all</button>
                </div>
              </>
            )}
          </div>
        </div>
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
                  onClick={navigateToAppliedJobs}
                >
                  <Briefcase className="mr-3" size={20} />
                  <span>Applied Jobs</span>
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center text-gray-800 hover:text-blue-600 w-full"
                  onClick={navigateToResume}
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