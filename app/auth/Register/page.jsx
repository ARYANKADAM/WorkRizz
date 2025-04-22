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
  FaGraduationCap,
  FaClock,
  FaSuitcase,
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
    accessKey: "",
    age: "",
    workExperience: "",
    graduation: "",
    currentCourse: "",
    workStatus: "",
    profileScore: 0,
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
        body: JSON.stringify({
          ...form,
          role,
          accessKey: role === "recruiter" ? form.accessKey : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({ type: "success", text: "Account created successfully!" });
        setForm({
          username: "",
          email: "",
          phone: "",
          password: "",
          accessKey: "",
          age: "",
          workExperience: "",
          graduation: "",
          currentCourse: "",
          workStatus: "",
          profileScore: 0,
        });

        setTimeout(() => {
          router.push("/auth/Login");
        }, 1500);
      }
    } catch (err) {
      console.error("Registration error:", err);
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
          <h2 className="text-2xl font-bold">Create Account</h2>
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
          {/* Username */}
          <InputField
            icon={<FaUser />}
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          {/* Email */}
          <InputField
            icon={<FaEnvelope />}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {/* Phone */}
          <InputField
            icon={<FaPhone />}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full rounded-md text-sm bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Recruiter Access Key */}
          {role === "recruiter" && (
            <>
              <InputField
                icon={<FaLock />}
                type={showPassword ? "text" : "password"}
                name="accessKey"
                placeholder="Access Key"
                value={form.accessKey}
                onChange={handleChange}
              />

              <InputField
                icon={<FaUser />}
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
              />
              <InputField
                icon={<FaSuitcase />}
                type="text"
                name="workExperience"
                placeholder="Company Name"
                value={form.workExperience}
                onChange={handleChange}
              />

            
              <InputField
                icon={<FaBriefcase />}
                type="text"
                name="workStatus"
                placeholder="Work Status (full-time, part-time)"
                value={form.workStatus}
                onChange={handleChange}
              />
            </>
          )}

          {/* Extra Fields for Employee */}
          {role === "employee" && (
            <>
              <InputField
                icon={<FaUser />}
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
              />
              <InputField
                icon={<FaSuitcase />}
                type="text"
                name="workExperience"
                placeholder="Work Experience"
                value={form.workExperience}
                onChange={handleChange}
              />
              <InputField
                icon={<FaGraduationCap />}
                type="number"
                name="graduation"
                placeholder="Graduation Year"
                value={form.graduation}
                onChange={handleChange}
              />
              <InputField
                icon={<FaClock />}
                type="text"
                name="currentCourse"
                placeholder="Current Course"
                value={form.currentCourse}
                onChange={handleChange}
              />
              <InputField
                icon={<FaBriefcase />}
                type="text"
                name="workStatus"
                placeholder="Work Status (full-time, part-time)"
                value={form.workStatus}
                onChange={handleChange}
              />
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Message */}
        {message.text && (
          <p
            className={`text-center text-sm ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Login Redirect */}
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

// 🔧 Reusable Input Field
const InputField = ({ icon, type, name, value, onChange, placeholder }) => (
  <div className="relative">
    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-10 pr-4 py-2 w-full border rounded-md text-sm bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      required
    />
  </div>
);
