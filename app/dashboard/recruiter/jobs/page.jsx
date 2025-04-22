"use client";

import React, { useState, useEffect } from "react";
import DashboardNavBar from "@/app/components/DashboardNavbar";

const JobsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    status: "Draft",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setJobs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token)
      return alert("You must be logged in as a recruiter to post jobs");

    try {
      const jobData = {
        ...newJob,
        salary: isNaN(Number(newJob.salary))
          ? newJob.salary
          : Number(newJob.salary),
      };

      const res = await fetch(
        isEditing ? `/api/jobs/${editJobId}` : "/api/jobs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(
          `Failed to ${isEditing ? "update" : "create"} job. ${errorData}`
        );
      }

      await res.json();
      fetchJobs();
      setNewJob({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        status: "Draft",
      });
      setIsEditing(false);
      setEditJobId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving job:", err);
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete job.");
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={`bg-gray-100 min-h-screen`}>
      <DashboardNavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setNewJob({
                title: "",
                description: "",
                requirements: "",
                location: "",
                salary: "",
                status: "Draft",
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            Post Job
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-10">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No jobs available yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Title",
                    "Location",
                    "Salary",
                    "Status",
                    "Applicants",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left font-semibold text-gray-600 uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{job.location}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {typeof job.salary === "number"
                        ? `${job.salary.toFixed(1)} LPA`
                        : job.salary}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : job.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {job.applicationsCount || 0}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setNewJob({ ...job });
                          setEditJobId(job._id);
                          setIsEditing(true);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Job" : "Post Job"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Job Title", name: "title" },
                { label: "Description", name: "description", textarea: true },
                { label: "Requirements", name: "requirements", textarea: true },
              ].map(({ label, name, textarea }) => (
                <div key={name}>
                  <label className="block font-medium text-gray-700">
                    {label}
                  </label>
                  {textarea ? (
                    <textarea
                      name={name}
                      rows="3"
                      value={newJob[name]}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded mt-1"
                    />
                  ) : (
                    <input
                      name={name}
                      value={newJob[name]}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded mt-1"
                    />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["location", "salary", "status"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium text-gray-700 capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={newJob[field]}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditJobId(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Update Job" : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
