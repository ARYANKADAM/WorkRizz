"use client";
import { useState, useEffect } from "react";
import DashboardNavBar from "@/app/components/DashboardNavbar";

export default function EmployeeDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs when search term, location filter, or jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      const results = jobs.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation =
          locationFilter === "" ||
          job.location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesLocation;
      });

      setFilteredJobs(results);
    }
  }, [searchTerm, locationFilter, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs");

      if (!response.ok) {
        throw new Error(HTTP`error ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // const handleApply = async (jobId) => {
  //   try {
  //     // Get current user ID and token from storage
  //     const userId = localStorage.getItem("userId");
  //     const token = localStorage.getItem("token");

  //     if (!userId || !token) {
  //       alert("You must be logged in to apply for jobs");
  //       return;
  //     }

  //     const response = await fetch(`/api/jobs/${jobId}/apply`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`  // Added bearer token for authentication
  //       },
  //       body: JSON.stringify({ userId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to apply for this job");
  //     }

  //     // Update UI to show application status
  //     alert("Successfully applied for this job!");

  //     // Refresh jobs to update application status
  //     fetchJobs();
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //     alert(error.message);
  //   }
  // };

  const handleApply = async (jobId) => {
    try {
      // Get user data from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login to apply for jobs");
        return;
      }

      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          profileScore: user.profileScore || 0, // Fallback to 0 if no score exists
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      alert("Successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.message || "Failed to apply for the job");
    }
  };
  // Extract unique locations for filter dropdown
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  // Get current date for job cards
  const today = new Date();
  const formattedDate = `${today.getDate()}${getDaySuffix(
    today.getDate()
  )} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getMonthName(month) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months[month];
  }

  // Function to determine card background color based on job type
  const getCardBackgroundColor = (jobTitle) => {
    if (jobTitle.toLowerCase().includes("senior")) {
      return "bg-yellow-200";
    } else if (jobTitle.toLowerCase().includes("junior")) {
      return "bg-cyan-200";
    } else if (
      jobTitle.toLowerCase().includes("ui") ||
      jobTitle.toLowerCase().includes("ux")
    ) {
      return "bg-green-200";
    } else {
      return "bg-purple-200"; // Default color for other job types
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Find Your Next Opportunity
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Jobs
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, skills, or keywords"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Location
              </label>
              <select
                id="location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No job postings found matching your criteria.
            </div>
          </div>
        )}

        {/* Jobs Grid - Updated to match the new card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="rounded-lg overflow-hidden shadow-md">
              {/* Card Container with dynamic background color */}
              <div
                className={`relative p-6 rounded-t-lg ${getCardBackgroundColor(
                  job.title
                )}`}
              >
                {/* Date and Notification Icon */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white rounded-full px-3 py-1 text-sm font-medium">
                    {formattedDate}
                  </div>
                  <div className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                </div>

                {/* Company and Title */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-black">
                    {job.company || "Amazon"}
                  </h3>
                  <h2 className="text-2xl font-bold text-black">{job.title}</h2>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-white/80 rounded-full px-3 py-1 text-sm">
                    {job.jobType || "Part Time"}
                  </span>
                  <span className="bg-white/80 rounded-full px-3 py-1 text-sm">
                    {job.level || "Senior level"}
                  </span>
                  <span className="bg-white/80 rounded-full px-3 py-1 text-sm">
                    {job.remote ? "Remote" : "Distant"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/80 rounded-full px-3 py-1 text-sm">
                    Project Work
                  </span>
                </div>
              </div>

              {/* Bottom section with salary and location */}
              <div className="bg-white p-6 flex justify-between items-center rounded-b-lg">
                <div>
                  <div className="font-bold text-lg">
                    {job.salary || `${(Math.random() * 30 + 5).toFixed(1)} LPA`}
                  </div>
                  <div className="text-gray-600">
                    {job.location || "Goregaon, India"}
                  </div>
                </div>
                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
