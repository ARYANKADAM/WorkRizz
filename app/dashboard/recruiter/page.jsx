"use client";
import React, { useState, useEffect } from "react";
import DashboardNavBar from "@/app/components/DashboardNavbar";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const RecruiterDashboard = () => {
  // Sample data for the line chart
  const applicantData = [
    { day: "Sun", applicants: 450 },
    { day: "Mon", applicants: 580 },
    { day: "Tue", applicants: 650 },
    { day: "Wed", applicants: 590 },
    { day: "Thu", applicants: 620 },
    { day: "Fri", applicants: 730 },
    { day: "Sat", applicants: 500 },
  ];

  // Sample data for the bar chart
  const monthlyApplications = [
    { day: "Mon", female: 120, male: 80 },
    { day: "Tue", female: 140, male: 110 },
    { day: "Wed", female: 100, male: 90 },
    { day: "Thu", female: 130, male: 105 },
    { day: "Fri", female: 150, male: 100 },
    { day: "Sat", female: 90, male: 110 },
    { day: "Sun", female: 85, male: 70 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardNavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="rounded-lg border border-gray-300 py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-gray-800 text-white p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Total applied</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">7500</p>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>Average increase 15%</span>
                </div>
              </div>
              <div className="h-16 w-16 relative">
                <svg viewBox="0 0 36 36" className="h-16 w-16 transform -rotate-90">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2a4365"
                    strokeWidth="3"
                    strokeDasharray="90, 100"
                  />
                </svg>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-sm font-medium">
                  90%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Candidate accepted</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">4200</p>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>Average 22%</span>
                </div>
              </div>
              <div className="h-16 w-16 relative">
                <svg viewBox="0 0 36 36" className="h-16 w-16 transform -rotate-90">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3182ce"
                    strokeWidth="3"
                    strokeDasharray="56, 100"
                  />
                </svg>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-sm font-medium">
                  56%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Rejected Candidates</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">2300</p>
                <div className="flex items-center text-sm text-red-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16 17a1 1 0 01-1-1v-2.586l-4.293 4.293a1 1 0 01-1.414 0L8 16.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 16.586 14.586 13H12a1 1 0 010-2h5a1 1 0 011 1v5a1 1 0 01-1 1z" clipRule="evenodd" />
                  </svg>
                  <span>Average 2%</span>
                </div>
              </div>
              <div className="h-16 w-16 relative">
                <svg viewBox="0 0 36 36" className="h-16 w-16 transform -rotate-90">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e53e3e"
                    strokeWidth="3"
                    strokeDasharray="31, 100"
                  />
                </svg>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-sm font-medium">
                  31%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800">Applicant statistics</h2>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicantData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="applicants" 
                  stroke="#fbbf24" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 8 }}
                  fill="url(#colorUv)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute top-3 right-20 bg-gray-800 text-white px-3 py-1 rounded text-sm">
              Friday
              <div className="text-xs">230 applicant</div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Candidat by genders</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 36 36" className="h-40 w-40 transform -rotate-90">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2a4365"
                    strokeWidth="3"
                    strokeDasharray="55, 100"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeDasharray="45, 100"
                    strokeDashoffset="-55"
                  />
                </svg>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                  <div className="bg-white h-24 w-24 rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold">55%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-800 mr-2"></div>
                <span>55% Female</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                <span>45% Male</span>
              </div>
            </div>
          </div>

          {/* Monthly Applications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Apply this month</h2>
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-gray-800 mr-2"></div>
                  <span>Female</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span>Male</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between h-48">
              {monthlyApplications.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex space-x-1 h-40 items-end">
                    <div 
                      className="w-5 bg-gray-800 rounded-t-sm" 
                      style={{ height: `${(item.female / 150) * 100}%` }}
                    ></div>
                    <div 
                      className="w-5 bg-yellow-400 rounded-t-sm" 
                      style={{ height: `${(item.male / 150) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;