import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="min-h-screen  bg-gray-900 text-white">
      <Navbar />
      <main className=" md:h-96 relative w-full py-16">
        {/* Decorative elements */}
        <div className="absolute top-20 left-8">
          <div className="text-pink-400 text-3xl">✧</div>
        </div>

        {/* Profile circles - Left side */}
        <div className="hidden md:block">
          <div className="absolute top-40 left-20">
            <div className="w-20 h-20 rounded-full bg-blue-300 overflow-hidden"></div>
          </div>
          <div className="absolute top-80 left-32">
            <div className="w-24 h-24 rounded-full bg-pink-300 overflow-hidden"></div>
          </div>
        </div>

        {/* Profile circles - Right side */}
        <div className="hidden md:block">
          <div className="absolute top-40 right-20">
            <div className="w-20 h-20 rounded-full bg-orange-300 overflow-hidden"></div>
          </div>
          <div className="absolute top-80 right-32">
            <div className="w-24 h-24 rounded-full bg-red-300 overflow-hidden"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mt-12 mx-auto px-4 text-center">
          {/* Hero text */}
          <div className="mb-10">
            <h1 className="text-6xl md:text-8xl font-bold mb-10">
              Find a dream jobs
              <br />
              in New Castle
            </h1>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              When you're searching for a job, there are a few things you can do
              to get the most out of your search:
            </p>
          </div>

          {/* Search bar */}
          <div className="h-16 flex mb-4">
            <div className="w-full bg-white border-2 border-orange-500  rounded-md flex items-center overflow-hidden ">
              <div className="  ml-2 rounded-md p-3 bg-orange-500 text-white flex items-center justify-center">
                <FiSearch size={18} />
              </div>
              <input
                type="text"
                placeholder="Job title, keyword or company"
                className="flex-1 p-3 outline-none text-gray-700 placeholder:text-gray-700 font-semibold bg-transparent"
              />
              <div className="bg-gray-100 border-gray-700 mr-2 rounded-md flex items-center">
                <div className="text-orange-500 mx-3">●</div>
                <select className="bg-transparent text-gray-700 py-3 pr-4 outline-none appearance-none">
                  <option>Any location</option>
                  <option>Remote</option>
                  <option>New Castle</option>
                  <option>Other cities</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs counter */}
          <div className="text-green-400 font-medium">
            21,701,403 Total Jobs Posted
          </div>
        </div>
      </main>
    </div>
  );
}
