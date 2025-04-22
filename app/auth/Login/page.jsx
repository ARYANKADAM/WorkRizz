'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaBriefcase,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    
    setError('');
    
    try {
      const res = await fetch('/api/auth/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
  
      const data = await res.json();
      console.log('Response:', res);
      console.log('Data:', data);
    
      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        console.log('Login successful');
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); 
        
        // You can now redirect based on user role
        if (data.user.role === 'employee') {
          router.push('/dashboard/employee');
        } else if (data.user.role === 'recruiter') {
          router.push('/dashboard/recruiter');
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-xl space-y-6 text-white border border-gray-700"
      >
        <div className="flex justify-center">
          <div className="bg-orange-500 text-white p-4 rounded-full">
            <FaBriefcase size={24} />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="flex justify-center gap-4">
          {['employee', 'recruiter'].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-1 rounded-md font-medium border ${
                role === r
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-700 text-gray-300 border-gray-600'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 text-sm bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="pl-10 pr-10 py-2 w-full border rounded-md focus:ring-2 focus:ring-orange-500 text-sm bg-gray-700 border-gray-600 text-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
        >
          <FaLock className="inline-block mr-2 mb-1" />
          Sign In
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/Register" className="text-orange-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}