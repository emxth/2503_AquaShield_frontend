// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/SideNav.js";
// import {
//   PencilIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
//   ArrowUpTrayIcon,
// } from "@heroicons/react/24/solid";

// function ViewAllSpecies() {
//   // Sample species data
//   const [species, setSpecies] = useState([
//     {
//       commonName: "Lion",
//       scientificName: "Panthera leo",
//       status: "Endangered",
//       protected: true,
//       habitat: "Savannah",
//     },
//     {
//       commonName: "Clownfish",
//       scientificName: "Amphiprioninae",
//       status: "Common",
//       protected: false,
//       habitat: "Marine",
//     },
//     {
//       commonName: "Elephant",
//       scientificName: "Loxodonta",
//       status: "Endangered",
//       protected: true,
//       habitat: "Savannah",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // Filter species based on search
//   const filteredSpecies = species.filter(
//     (sp) =>
//       sp.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sp.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDelete = (index) => {
//     const newSpecies = [...species];
//     newSpecies.splice(index, 1);
//     setSpecies(newSpecies);
//   };

//   const handleEdit = (index) => {
//     navigate(`/viewOneSpecies`)
//   };

//   const handleExport = () => {
//     alert("Export functionality triggered!");
//   };

//   return (
//     <div className="flex h-screen bg-[#F5F5F5]">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#0E6C91] text-white">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <h1 className="text-3xl font-bold mb-6 text-[#0E6C91]">All Species</h1>

//         <div className="bg-white rounded-2xl shadow p-6">
//           {/* Search Bar */}
//           <div className="flex items-center mb-6">
//             <div className="relative w-full md:w-1/3">
//               <input
//                 type="text"
//                 placeholder="Search Species"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
//               />
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-100 rounded-lg text-center">
//               <thead className="bg-[#17A9D3] text-white">
//                 <tr>
//                   <th className="px-4 py-2 border">Common Name</th>
//                   <th className="px-4 py-2 border">Scientific Name</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Protected</th>
//                   <th className="px-4 py-2 border">Habitat</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSpecies.map((sp, index) => (
//                   <tr
//                     key={index}
//                     className={index % 2 === 0 ? "bg-gray-50" : ""}
//                   >
//                     <td className="px-4 py-2 border">{sp.commonName}</td>
//                     <td className="px-4 py-2 border">{sp.scientificName}</td>
//                     <td className="px-4 py-2 border">{sp.status}</td>
//                     <td className="px-4 py-2 border">
//                       {sp.protected ? "Yes" : "No"}
//                     </td>
//                     <td className="px-4 py-2 border">{sp.habitat}</td>
//                     <td className="px-4 py-2 border flex justify-center space-x-2">
//                       <button
//                         className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white p-2 rounded"
//                         onClick={() => handleEdit(index)}
//                       >
//                         <PencilIcon className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
//                         onClick={() => handleDelete(index)}
//                       >
//                         <TrashIcon className="h-4 w-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Export Button */}
//             <div className="mt-6">
//               <button
//                 onClick={handleExport}
//                 className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white px-4 py-2 rounded flex items-center space-x-2"
//               >
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
// export default ViewAllSpecies;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/SideNav.js";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

function ViewAllSpecies() {
  const [species, setSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null); // species ID to delete
  const [showConfirm, setShowConfirm] = useState(false); // modal visibility
  const navigate = useNavigate();

  // Fetch species from backend
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/species/getAllSpecies"
        );
        setSpecies(res.data);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };
    fetchSpecies();
  }, []);

  // Filter species based on search
  const filteredSpecies = species.filter(
    (sp) =>
      (sp.CommonName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sp.ScientificName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Open modal for confirmation
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleEdit = (id) => {
    navigate(`/viewOneSpecies/${id}`);
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
                {filteredSpecies.length > 0 ? (
                  filteredSpecies.map((sp, index) => (
                    <tr
                      key={sp._id}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td className="px-4 py-2 border">{sp.CommonName || "-"}</td>
                      <td className="px-4 py-2 border">{sp.ScientificName || "-"}</td>
                      <td className="px-4 py-2 border">{sp.ProtectionLevel || "-"}</td>
                      <td className="px-4 py-2 border">
                        {sp.ProtectionStatus ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 border">{sp.Habitat || "-"}</td>
                      <td className="px-4 py-2 border flex justify-center space-x-2">
                        <button
                          className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white p-2 rounded"
                          onClick={() => handleEdit(sp._id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          onClick={() => handleDelete(sp._id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 border">
                      No species found.
                    </td>
                  </tr>
                )}
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this species?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `http://localhost:8081/species/deleteSpecies/${deleteId}`
                    );
                    setSpecies(species.filter((sp) => sp._id !== deleteId));
                    setShowConfirm(false);
                  } catch (error) {
                    console.error("Error deleting species:", error);
                    alert("Failed to delete species.");
                    setShowConfirm(false);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllSpecies;

