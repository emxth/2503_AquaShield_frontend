// import Navbar from './components/SideNav.js';
// import React from "react";

// function AddSpecies() {
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar / Navbar */}
//             <div className="w-64 bg-green-500 p-0 text-white">
//                 <Navbar />
//             </div>

//             {/* Main Working Area */}
//             <div className="flex-1 bg-gray-100 pl-[125px] overflow-auto item-center p-5">
//                 {/* Top Topic */}
//                 <h1 className="text-3xl font-bold mb-6">Add Species</h1>

//                 {/* Blue Border Rectangle Layout */}
//                 <div className="border-4 w-[1000px] border-blue-500 rounded-lg p-10 bg-white shadow">
//                     <form className="space-y-6">
//                         {/* Row 1: Basic Identification */}
//                         <div>
//                             <label className="block text-left font-semibold mb-3 text">
//                                 Basic Identification
//                             </label>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <input
//                                     type="text"
//                                     placeholder="Scientific Name"
//                                     className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Common Name"
//                                     className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Row 2: Category */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Category
//                                 </label>
//                                 <select className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                                     <option>Select Category</option>
//                                 </select>
//                             </div>
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Protection Level
//                                 </label>
//                                 <select className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                                     <option>Select Level</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Row 3: Habitat + Protection Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Habitat
//                                 </label>
//                                 <select className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                                     <option>Select Habitat</option>
//                                 </select>
//                             </div>
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Protection Status
//                                 </label>
//                                 <div className="flex items-center mt-2">
//                                     <input type="checkbox" id="protected" className="h-5 w-5 text-blue-500 ml-10 mt-3" />
//                                     <label htmlFor="protected" className="ml-2 text-sm font-medium mt-3">
//                                         Protected
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Row 4: Updated Date + Image Upload */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Updated Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     className="w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="flex flex-col items-start">
//                                 <label className="block text-left font-medium mb-2 mt-3">
//                                     Image Upload
//                                 </label>
//                                 <input
//                                     type="file"
//                                     className="w-2/3 text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Row 5: Description */}
//                         <div>
//                             <label className="block text-left font-medium mb-2 mt-3 w-[1000px]">
//                                 Description
//                             </label>
//                             <textarea
//                                 rows="4"
//                                 placeholder="Enter description..."
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             ></textarea>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-center gap-6 mt-6">
//                             <button
//                                 type="button"
//                                 className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddSpecies;

import React, { useState } from "react";
import Navbar from "./components/SideNav";

function AddSpecies() {
  // Form state
  const [form, setForm] = useState({
    scientificName: "",
    commonName: "",
    category: "",
    protectionLevel: "",
    habitat: "",
    isProtected: false,
    updatedDate: "",
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Add your API call or logic here
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0E6C91] text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0E6C91]">Add Species</h1>

        <div className="bg-white rounded-2xl shadow p-8 max-w-4xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Row 1: Basic Identification */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#0E6C91]">
                Basic Identification
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="scientificName"
                  placeholder="Scientific Name"
                  value={form.scientificName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                />
                <input
                  type="text"
                  name="commonName"
                  placeholder="Common Name"
                  value={form.commonName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                />
              </div>
            </div>

            {/* Row 2: Category & Protection Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                >
                  <option value="">Select Category</option>
                  <option value="Fish">Fish</option>
                  <option value="Mammal">Mammal</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Protection Level</label>
                <select
                  name="protectionLevel"
                  value={form.protectionLevel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                >
                  <option value="">Select Level</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Common">Common</option>
                </select>
              </div>
            </div>

            {/* Row 3: Habitat & Protected Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Habitat</label>
                <select
                  name="habitat"
                  value={form.habitat}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                >
                  <option value="">Select Habitat</option>
                  <option value="Freshwater">Freshwater</option>
                  <option value="Marine">Marine</option>
                </select>
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="isProtected"
                  name="isProtected"
                  checked={form.isProtected}
                  onChange={handleChange}
                  className="h-5 w-5 text-[#17A9D3]"
                />
                <label htmlFor="isProtected" className="ml-2 font-medium text-[#0E6C91]">
                  Protected
                </label>
              </div>
            </div>

            {/* Row 4: Updated Date & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Updated Date</label>
                <input
                  type="date"
                  name="updatedDate"
                  value={form.updatedDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Image Upload</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                />
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Enter description..."
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-2 px-6 rounded-lg shadow"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSpecies;

