import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/SideNav.js";
import {
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";

function SpeciesAddRequest() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8081/speciesRequest/getAllSpeciesRequests");
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests
  const filteredRequests = requests.filter((req) =>
    req.RequesterName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id) => {
    navigate(`/AddNewSpeciesByRequest/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(``);
      setRequests(requests.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
    }
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
                  <th className="px-4 py-2 border">Request Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req._id} className="bg-gray-50">
                    <td className="px-4 py-2 border">{req.RequesterName}</td>
                    <td className="px-4 py-2 border">{req.ScientificName}</td>
                    <td className="px-4 py-2 border">{req.CommonName}</td>
                    <td className="px-4 py-2 border">
                      {req.ProtectionStatus ? "Protected" : "Not Protected"}
                    </td>
                    <td className="px-4 py-2 border">{req.RequestStatus}</td>
                    <td className="px-4 py-2 border flex justify-center space-x-2">
                      <button
                        className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white p-2 rounded"
                        onClick={() => handleView(req._id)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        onClick={() => handleDelete(req._id)}
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
