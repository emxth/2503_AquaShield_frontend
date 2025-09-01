// import React from "react";
// import Navbar from './components/SideNav.js';
// import { EyeIcon, TrashIcon, MagnifyingGlassIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
// function speciesAddRequest() {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar / Navbar */}
//       <div className="w-64 bg-green-500 p-0 text-white">
//         <Navbar />
//       </div>

//       <div className="flex flex-col h-screen bg-gray-100 p-6 w-full">
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold mb-6">All Species Requests</h1>

//         {/* Blue Rectangle Layout */}
//         <div className="border-4 border-blue-500 rounded-lg p-6 bg-white shadow">

//           {/* Search Bar */}
//           <div className="flex items-center mb-6">
//             <div className="relative w-1/3">
//               <input
//                 type="text"
//                 placeholder="Search requester by name"
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-100 rounded-lg">
//               <thead className="bg-blue-500 text-white">
//                 <tr>
//                   <th className="px-4 py-2 border">Requester Name</th>
//                   <th className="px-4 py-2 border">Scientific Name</th>
//                   <th className="px-4 py-2 border">Common Name</th>
//                   <th className="px-4 py-2 border">Protection Status</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Example Row */}
//                 <tr className="text-center">
//                   <td className="px-4 py-2 border">John Doe</td>
//                   <td className="px-4 py-2 border">Panthera leo</td>
//                   <td className="px-4 py-2 border">Lion</td>
//                   <td className="px-4 py-2 border">Endangered</td>
//                   <td className="px-4 py-2 border flex justify-center space-x-2">
//                     {/* View Button */}
//                     <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
//                       <EyeIcon className="h-4 w-4" />
//                     </button>
//                     {/* Delete Button */}
//                     <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </tr>
//                 {/* Add more rows dynamically */}
//               </tbody>
//             </table>

//             <br />

//             {/* Export Button */}
//             <div>
//               <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-[180px] flex items-center space-x-2">
//                 <ArrowUpTrayIcon className="h-5 w-5" />
//                 <span>Export Report</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default speciesAddRequest;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/SideNav.js";
import {
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";

function SpeciesAddRequest() {
  // Sample requests data
  const [requests, setRequests] = useState([
    {
      requester: "John Doe",
      scientificName: "Panthera leo",
      commonName: "Lion",
      protectionStatus: "Endangered",
    },
    {
      requester: "Jane Smith",
      scientificName: "Amphiprioninae",
      commonName: "Clownfish",
      protectionStatus: "Common",
    },
    {
      requester: "Alice Johnson",
      scientificName: "Loxodonta",
      commonName: "Elephant",
      protectionStatus: "Endangered",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter requests by requester name
  const filteredRequests = requests.filter((req) =>
    req.requester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (index) => {
    navigate(`/AddNewSpeciesByRequest`)
  };

  const handleDelete = (index) => {
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
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
        <h1 className="text-3xl font-bold mb-6 text-[#0E6C91]">
          All Species Requests
        </h1>

        <div className="bg-white rounded-2xl shadow p-6">
          {/* Search Bar */}
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search requester by name"
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
                  <th className="px-4 py-2 border">Requester Name</th>
                  <th className="px-4 py-2 border">Scientific Name</th>
                  <th className="px-4 py-2 border">Common Name</th>
                  <th className="px-4 py-2 border">Protection Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2 border">{req.requester}</td>
                    <td className="px-4 py-2 border">{req.scientificName}</td>
                    <td className="px-4 py-2 border">{req.commonName}</td>
                    <td className="px-4 py-2 border">{req.protectionStatus}</td>
                    <td className="px-4 py-2 border flex justify-center space-x-2">
                      <button
                        className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white p-2 rounded"
                        onClick={() => handleView(index)}
                      >
                        <EyeIcon className="h-4 w-4" />
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

export default SpeciesAddRequest;

