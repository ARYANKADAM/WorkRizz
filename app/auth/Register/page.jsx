'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaCalendarAlt,
  FaGraduationCap,
  FaBookOpen,
} from 'react-icons/fa';

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    graduation: '',
    currentCourse: '',
    workStatus: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/auth/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.message });
      } else {
        setMessage({ type: 'success', text: 'Account created successfully!' });
        setForm({
          username: '',
          email: '',
          phone: '',
          password: '',
          age: '',
          graduation: '',
          currentCourse: '',
          workStatus: '',
        });

        setTimeout(() => {
          router.push('/auth/Login');
        }, 1500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong!' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 py-8">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-xl space-y-6 text-white border border-gray-700">
        <div className="flex justify-center">
          <div className="bg-orange-500 text-white p-4 rounded-full">
            <FaBriefcase size={24} />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Sign up to get started</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-1 rounded-md font-medium border ${
              role === 'employee'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            }`}
            onClick={() => setRole('employee')}
          >
            Employee
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded-md font-medium border ${
              role === 'recruiter'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            }`}
            onClick={() => setRole('recruiter')}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Username" name="username" icon={<FaUser />} value={form.username} onChange={handleChange} />
          <Input label="Email" name="email" type="email" icon={<FaEnvelope />} value={form.email} onChange={handleChange} />
          <Input label="Phone Number" name="phone" type="tel" icon={<FaPhone />} value={form.phone} onChange={handleChange} />

          {role === 'employee' && (
            <>
              {/* Work Status UI */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Work status<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={`flex-1 p-3 rounded-md border text-left ${
                      form.workStatus === 'experienced'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                    onClick={() => setForm({ ...form, workStatus: 'experienced' })}
                  >
                    <strong>I'm experienced</strong>
                    <p className="text-sm">I have work experience (excluding internships)</p>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-3 rounded-md border text-left ${
                      form.workStatus === 'fresher'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                    onClick={() => setForm({ ...form, workStatus: 'fresher' })}
                  >
                    <strong>I'm a fresher</strong>
                    <p className="text-sm">I am a student/ Haven't worked after graduation</p>
                  </button>
                </div>
              </div>

              <Input label="Age" name="age" type="number" icon={<FaCalendarAlt />} value={form.age} onChange={handleChange} />
              <Input label="Graduation" name="graduation" icon={<FaGraduationCap />} value={form.graduation} onChange={handleChange} placeholder="e.g., B.Tech" />
              <Input label="Current Course" name="currentCourse" icon={<FaBookOpen />} value={form.currentCourse} onChange={handleChange} placeholder="If any" />
            </>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="pl-10 pr-10 py-2 w-full border rounded-md bg-gray-700 border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
            disabled={loading}
          >
            <FaUser className="inline-block mr-2 mb-1" />
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {message.text && (
          <p className={`text-center text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message.text}
          </p>
        )}

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/Login" className="text-orange-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, icon, name, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1 text-white">
        {label}<span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          id={name}
          name={name}
          {...props}
          className="pl-10 pr-4 py-2 w-full border rounded-md bg-gray-700 border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          required
        />
      </div>
    </div>
  );
}
