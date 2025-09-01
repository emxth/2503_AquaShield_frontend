import React from "react";
import Navbar from "./components/SideNav.js";

function AddNewSpeciesByRequest() {
  return (
    <div className="flex h-screen">
      {/* Sidebar / Navbar */}
      <div className="w-64 bg-[#0E6C91] text-white">
        <Navbar />
      </div>

      {/* Main Working Area */}
      <div className="flex-1 bg-[#F5F5F5] pl-[125px] overflow-auto p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-[#0E6C91] text-left">View Requested Species</h1>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-4xl space-y-8">
          {/* Top Section: Image + Buttons */}
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Image */}
            <div className="w-full md:w-64 h-64 bg-gray-200 flex items-center justify-center rounded-xl">
              <span className="text-gray-500 font-semibold">Image Placeholder</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mt-4 md:mt-0">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200">
                Remove Photo
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200">
                Upload New Photo
              </button>
            </div>
          </div>

          {/* Species Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left mt-5">Requester Name</label>
              <input
                type="text"
                value="John"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left mt-5">Scientific Name</label>
              <input
                type="text"
                value="Panthera leo"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left">Common Name</label>
              <input
                type="text"
                value="Lion"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left">Category</label>
              <input
                type="text"
                value="Mammal"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left">Protection Level</label>
              <input
                type="text"
                value="Endangered"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left">Habitat</label>
              <input
                type="text"
                value="Savannah"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <input type="checkbox" checked className="h-5 w-5 text-blue-500" disabled />
              <label className="ml-2 text-lg font-semibold text-[#0E6C91] text-left">Protected</label>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left">Updated Date</label>
              <input
                type="text"
                value="26-Aug-2025"
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left mt-5">Description</label>
            <textarea
              rows="4"
              readOnly
              value="Lions are large carnivorous mammals known as the king of the jungle. They live in groups called prides."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow">
              Cancel
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow">
              Add Species
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewSpeciesByRequest;
