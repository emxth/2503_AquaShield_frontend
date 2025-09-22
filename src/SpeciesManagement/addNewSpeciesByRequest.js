import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/SideNav.js";

function AddNewSpeciesByRequest() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showActions, setShowActions] = useState(false); // First modal
  const [showMessageModal, setShowMessageModal] = useState(false); // Second modal for message input
  const [actionType, setActionType] = useState(""); // 'reject' or 'add'
  const [message, setMessage] = useState(""); // message to researcher

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/speciesRequest/getOneSpeciesRequests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error("Error fetching request:", err);
      }
    };
    fetchRequest();
  }, [id]);

  if (!request) return <div>Loading...</div>;

  // Step 1: Action button clicked
  const handleActionClick = (type) => {
    setActionType(type); // store action type
    setShowActions(false); // close first modal
    setShowMessageModal(true); // open message modal
  };

  // Step 2: Submit message
  const handleSubmitMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message!");
      return;
    }
    // Here you can also send message to backend or update request status
    console.log("Action:", actionType, "Message to researcher:", message);

    // Reset modal states
    setShowMessageModal(false);
    setMessage("");
    alert(actionType === "reject" ? "Request rejected!" : "Species added!");
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className="w-64 bg-[#0E6C91] text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F5F5F5] pl-[125px] overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-[#0E6C91] text-left">
          View Requested Species
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-4xl space-y-8">
          {/* Image */}
          <div className="w-full md:w-64 h-64 bg-gray-200 flex items-center justify-center rounded-xl">
            {request.ImageURL ? (
              <img
                src={request.ImageURL}
                alt="Species"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-500 font-semibold">No Image</span>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Requester Name", value: request.RequesterName, key: "RequesterName" },
              { label: "Scientific Name", value: request.ScientificName, key: "ScientificName" },
              { label: "Common Name", value: request.CommonName, key: "CommonName" },
              { label: "Category", value: request.SpeciesCategory, key: "SpeciesCategory" },
              { label: "Protection Level", value: request.ProtectionLevel, key: "ProtectionLevel" },
              { label: "Habitat", value: request.Habitat, key: "Habitat" },
              { label: "Updated Date", value: new Date(request.updatedDate).toLocaleDateString(), key: "updatedDate" },
              { label: "Request Status", value: request.RequestStatus, key: "RequestStatus" },
            ].map((field) => (
              <div className="flex flex-col" key={field.key}>
                <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left mt-5">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  readOnly={!isEdit}
                  onChange={(e) =>
                    setRequest((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    isEdit ? "focus:ring-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}

            <div className="flex items-center mt-4 md:mt-0">
              <input
                type="checkbox"
                checked={request.ProtectionStatus}
                disabled={!isEdit}
                onChange={(e) =>
                  setRequest((prev) => ({ ...prev, ProtectionStatus: e.target.checked }))
                }
                className="h-5 w-5 text-blue-500"
              />
              <label className="ml-2 text-lg font-semibold text-[#0E6C91] text-left">
                Protected
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-lg font-semibold text-[#0E6C91] mb-1 text-left mt-5">
              Description
            </label>
            <textarea
              rows="4"
              value={request.Description}
              readOnly={!isEdit}
              onChange={(e) => setRequest((prev) => ({ ...prev, Description: e.target.value }))}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                isEdit ? "focus:ring-blue-500 bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
              onClick={() => setIsEdit(true)}
            >
              View / Edit
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
              onClick={() => setShowActions(true)}
            >
              Actions
            </button>
          </div>
        </div>
      </div>

      {/* First Modal: Actions */}
      {showActions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center space-y-6">
            <h2 className="text-2xl font-bold text-[#0E6C91]">Choose Action</h2>
            <p className="text-gray-700">
              What would you like to do with this species request?
            </p>
            <div className="flex justify-around gap-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
                onClick={() => handleActionClick("reject")}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
                onClick={() => handleActionClick("add")}
              >
                Add Species
              </button>
            </div>
            <button
              className="mt-4 text-gray-500 underline"
              onClick={() => setShowActions(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Second Modal: Message to Researcher */}
      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center space-y-6">
            <h2 className="text-2xl font-bold text-[#0E6C91]">
              {actionType === "reject" ? "Reason for Rejection" : "Message to Researcher"}
            </h2>
            <textarea
              rows="4"
              placeholder={
                actionType === "reject"
                  ? "Enter reason for rejection..."
                  : "Enter a message to the researcher..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-center gap-4">
              <button
                className={`${
                  actionType === "reject" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold py-2 px-6 rounded-lg`}
                onClick={handleSubmitMessage}
              >
                {actionType === "reject" ? "Reject" : "Add Species"}
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
                onClick={() => setShowMessageModal(false)}
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

export default AddNewSpeciesByRequest;
