"use client";
import React, { useState, useEffect } from "react";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load jobs from localStorage or API
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);

    // Load logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostJob = () => {
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setNewJob({
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
    });
    setShowModal(false);
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div>
          {user && (
            <p className="text-lg font-semibold text-gray-700">
              Welcome, <span className="text-blue-600">
  {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
</span>
            </p>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Jobs Posted</h2>
          <p className="text-2xl">{jobs.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Applications Received</h2>
          <p className="text-2xl">{jobs.length * 5}</p> {/* Mock number */}
        </div>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Post a New Job
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.description}</p>
              <p>
                <strong>Requirements:</strong> {job.requirements}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> ${job.salary}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
            <div className="space-y-4">
              <input
                name="title"
                type="text"
                placeholder="Job Title"
                value={newJob.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Job Description"
                value={newJob.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="requirements"
                placeholder="Job Requirements"
                value={newJob.requirements}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                value={newJob.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                name="salary"
                type="number"
                placeholder="Salary"
                value={newJob.salary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handlePostJob}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
