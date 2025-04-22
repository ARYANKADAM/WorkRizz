"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-gray-900 sticky top-0 z-50 border-b-1 border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center relative">
          <div className="w-8 h-8 rounded-full bg-orange-500 absolute"></div>
          <span className="text-xl font-semibold text-white ml-2 z-1">
            WorkRizz
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden ml-12 md:flex gap-8 text-gray-300 font-medium">
          <Link href="/" className="hover:text-white transition">
            Find Jobs
          </Link>
          <Link href="/people" className="hover:text-white transition">
            People
          </Link>
          <Link href="/education" className="hover:text-white transition">
            Education
          </Link>
          <Link href="/blog" className="hover:text-white transition">
            Blog
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/auth/Register"
            className="text-white border border-gray-700 px-4 py-2 rounded-md font-medium hover:bg-orange-500 transition flex items-center"
          >
            <span className="mr-1">Sign Up</span>
          </Link>
          <Link
            href="/auth/Login"
            className="text-white border border-gray-700 px-4 py-2 rounded-md font-medium hover:bg-orange-500 transition flex items-center"
          >
            <span className="mr-1">Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
