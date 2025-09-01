// import React from "react";
// import Navbar from './components/SideNav.js';
// import { PencilIcon, TrashIcon, MagnifyingGlassIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
// function viewAllSpecies() {
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar / Navbar */}
//             <div className="w-64 bg-green-500 p-0 text-white">
//                 <Navbar />
//             </div>
//             <div className="flex flex-col h-screen bg-gray-100 p-6 w-full">
//                 {/* Page Title */}
//                 <h1 className="text-3xl font-bold mb-6">All Species</h1>

//                 {/* Blue Rectangle Layout */}
//                 <div className="border-4 border-blue-500 rounded-lg p-6 bg-white shadow">

//                     {/* Search Bar */}
//                     <div className="flex items-center mb-6">
//                         <div className="relative w-1/3">
//                             <input
//                                 type="text"
//                                 placeholder="Search Species"
//                                 className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             {/* Search Icon */}
//                             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
//                         </div>
//                     </div>

//                     {/* Table */}
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full border border-gray-100 rounded-lg">
//                             <thead className="bg-blue-500">
//                                 <tr>
//                                     <th className="px-4 py-2 border">Common Name</th>
//                                     <th className="px-4 py-2 border">Scientific Name</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                     <th className="px-4 py-2 border">Protected</th>
//                                     <th className="px-4 py-2 border">Habitat</th>
//                                     <th className="px-4 py-2 border">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* Example Row */}
//                                 <tr className="text-center">
//                                     <td className="px-4 py-2 border">Lion</td>
//                                     <td className="px-4 py-2 border">Panthera leo</td>
//                                     <td className="px-4 py-2 border">Endangered</td>
//                                     <td className="px-4 py-2 border">Yes</td>
//                                     <td className="px-4 py-2 border">Savannah</td>
//                                     <td className="px-4 py-2 border flex justify-center space-x-2">
//                                         {/* Edit Button */}
//                                         <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
//                                             <PencilIcon className="h-4 w-4" />
//                                         </button>
//                                         {/* Delete Button */}
//                                         <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
//                                             <TrashIcon className="h-4 w-4" />
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 {/* Add more rows dynamically */}
//                             </tbody>
//                         </table><br></br>
//                         <div>
//                             <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-[180px] flex items-center space-x-2">
//                                 <ArrowUpTrayIcon className="h-5 w-5" />
//                                 <span>Export Report</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default viewAllSpecies;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/SideNav.js";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";

function ViewAllSpecies() {
  // Sample species data
  const [species, setSpecies] = useState([
    {
      commonName: "Lion",
      scientificName: "Panthera leo",
      status: "Endangered",
      protected: true,
      habitat: "Savannah",
    },
    {
      commonName: "Clownfish",
      scientificName: "Amphiprioninae",
      status: "Common",
      protected: false,
      habitat: "Marine",
    },
    {
      commonName: "Elephant",
      scientificName: "Loxodonta",
      status: "Endangered",
      protected: true,
      habitat: "Savannah",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter species based on search
  const filteredSpecies = species.filter(
    (sp) =>
      sp.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    const newSpecies = [...species];
    newSpecies.splice(index, 1);
    setSpecies(newSpecies);
  };

  const handleEdit = (index) => {
    navigate(`/viewOneSpecies`)
  };

  const handleExport = () => {
    alert("Export functionality triggered!");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0E6C91] text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#0E6C91]">All Species</h1>

        <div className="bg-white rounded-2xl shadow p-6">
          {/* Search Bar */}
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search Species"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-100 rounded-lg text-center">
              <thead className="bg-[#17A9D3] text-white">
                <tr>
                  <th className="px-4 py-2 border">Common Name</th>
                  <th className="px-4 py-2 border">Scientific Name</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Protected</th>
                  <th className="px-4 py-2 border">Habitat</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpecies.map((sp, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2 border">{sp.commonName}</td>
                    <td className="px-4 py-2 border">{sp.scientificName}</td>
                    <td className="px-4 py-2 border">{sp.status}</td>
                    <td className="px-4 py-2 border">
                      {sp.protected ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 border">{sp.habitat}</td>
                    <td className="px-4 py-2 border flex justify-center space-x-2">
                      <button
                        className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white p-2 rounded"
                        onClick={() => handleEdit(index)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Export Button */}
            <div className="mt-6">
              <button
                onClick={handleExport}
                className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllSpecies;

