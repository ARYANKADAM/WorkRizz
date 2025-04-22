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
    status: "Active",
  });

  // Fetch all jobs
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

  // Form field handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update job
  // Create or update job
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("You must be logged in as a recruiter to post jobs");
  }

  try {
    const res = await fetch(
      isEditing ? `/api/jobs/${editJobId}` : "/api/jobs",
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      }
    );

    // Check if response is ok before attempting to parse as JSON
    if (!res.ok) {
      const errorData = await res.text(); // Fetch the response body as text to debug
      console.error("Error:", errorData);  // Log the error response body
      throw new Error(`Failed to ${isEditing ? 'update' : 'create'} job. ${errorData}`);
    }

    const result = await res.json(); // If no error, parse the JSON

    // Refresh & reset
    fetchJobs();
    setNewJob({
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditJobId(null);
    setShowForm(false);
  } catch (err) {
    console.error("Error saving job:", err);
    alert(err.message);
  }
};

  // Delete job
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(err.message);
    }
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${showForm ? "overflow-hidden" : ""}`}>
      <DashboardNavBar />

      <div className={`container mx-auto px-4 py-8 ${showForm ? "filter blur-sm" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Manage Jobs</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setEditJobId(null);
              setNewJob({
                title: "",
                description: "",
                requirements: "",
                location: "",
                salary: "",
                status: "Active",
              });
            }}
          >
            Post New Job
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
            <p className="mt-2 text-gray-600">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {jobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No jobs posted yet.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Job Title","Location","Salary","Status","Applicants","Actions"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{job.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.applicants?.length || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {
                            setNewJob({
                              title: job.title,
                              description: job.description,
                              requirements: job.requirements,
                              location: job.location,
                              salary: job.salary,
                              status: job.status,
                            });
                            setEditJobId(job._id);
                            setIsEditing(true);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{isEditing ? "Edit Job" : "Post New Job"}</h2>
                <button
                  onClick={() => { setShowForm(false); setIsEditing(false); setEditJobId(null); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {[
                  { label: "Job Title*", name: "title", type: "text" },
                  { label: "Job Description*", name: "description", as: "textarea" },
                  { label: "Requirements*", name: "requirements", as: "textarea" },
                ].map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                    {field.as === "textarea" ? (
                      <textarea
                        name={field.name}
                        rows="4"
                        value={newJob[field.name]}
                        onChange={handleInputChange}
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                      />
                    ) : (
                      <input
                        name={field.name}
                        type={field.type}
                        value={newJob[field.name]}
                        onChange={handleInputChange}
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                      />
                    )}
                  </div>
                ))}

                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Location*", name: "location" },
                    { label: "Salary Range*", name: "salary" },
                  ].map((fld) => (
                    <div key={fld.name}>
                      <label className="block text-gray-700 text-sm font-bold mb-2">{fld.label}</label>
                      <input
                        name={fld.name}
                        type="text"
                        value={newJob[fld.name]}
                        onChange={handleInputChange}
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select
                    name="status"
                    value={newJob.status}
                    onChange={handleInputChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setIsEditing(false); setEditJobId(null); }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isEditing ? "Update Job" : "Post Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
