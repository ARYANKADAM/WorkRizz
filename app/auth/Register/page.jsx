"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaPhone,
} from "react-icons/fa";

export default function Register() {
  const router = useRouter();

  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/auth/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({ type: "success", text: "Account created successfully!" });
        setForm({ username: "", email: "", phone: "", password: "" });

        // Redirect to login page after 1.5s delay
        setTimeout(() => {
          router.push("/auth/Login");
        }, 1500);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 py-8">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-xl space-y-6 text-white border border-gray-700">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-orange-500 text-white p-4 rounded-full">
            <FaBriefcase size={24} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Sign up to get started</p>
        </div>

        {/* Role Switch */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-1 rounded-md font-medium border ${
              role === "employee"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-700 text-gray-300 border-gray-600"
            }`}
            onClick={() => setRole("employee")}
          >
            Employee
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded-md font-medium border ${
              role === "recruiter"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-700 text-gray-300 border-gray-600"
            }`}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-gray-700 border-gray-600 text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {role === "recruiter" && (
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                // type={showPassword ? 'text' : 'password'}
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Access key"
                className="pl-10 pr-10 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-gray-700 border-gray-600 text-white"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
            disabled={loading}
          >
            <FaUser className="inline-block mr-2 mb-1" />
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Message Display */}
        {message.text && (
          <p
            className={`text-center text-sm ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/Login" className="text-orange-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
