import React, { useState } from "react";
import Navbar from "./components/SideNav.js";

function ViewOneSpecies() {
  const [species] = useState({
    scientificName: "Panthera leo",
    commonName: "Lion",
    category: "Mammal",
    protectionLevel: "Endangered",
    habitat: "Savannah",
    protected: true,
    updatedDate: "26-Aug-2025",
    description:
      "Lions are large carnivorous mammals known as the king of the jungle. They live in groups called prides.",
  });

  const handleEdit = () => alert("Edit clicked!");
  const handleCancel = () => alert("Cancel clicked!");
  const handleNewPhoto = () => alert("Upload new photo!");
  const handleRemovePhoto = () => alert("Remove photo!");

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0E6C91] text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#0E6C91]">View Species</h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Image + Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-full md:w-64 h-64 bg-[#B3D9EA] rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-[#0E6C91] font-semibold">Image Placeholder</span>
            </div>

            <div className="flex flex-col gap-4 md:mt-0 mt-4">
              <button
                onClick={handleNewPhoto}
                className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
              >
                Upload New Photo
              </button>
              <button
                onClick={handleRemovePhoto}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
              >
                Remove Photo
              </button>
            </div>
          </div>

          {/* Species Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Scientific Name", value: species.scientificName },
              { label: "Common Name", value: species.commonName },
              { label: "Category", value: species.category },
              { label: "Protection Level", value: species.protectionLevel },
              { label: "Habitat", value: species.habitat },
              { label: "Updated Date", value: species.updatedDate },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">
                  {item.label}
                </label>
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-[#F5F5F5] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                />
              </div>
            ))}

            {/* Protected Checkbox */}
            <div className="flex items-center mt-6 md:mt-0">
              <input
                type="checkbox"
                checked={species.protected}
                className="h-5 w-5 text-[#17A9D3]"
                disabled
              />
              <label className="ml-2 text-lg font-semibold text-[#0E6C91] text-left">
                Protected
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-[#0E6C91] text-left mb-1">
              Description
            </label>
            <textarea
              rows="4"
              readOnly
              value={species.description}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#F5F5F5] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
            />
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOneSpecies;
