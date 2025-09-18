// import React, { useState, useEffect } from "react";
// import Navbar from "./components/SideNav.js";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ViewOneSpecies() {
//   const { id } = useParams();

//   const [species, setSpecies] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Fetch species
//   useEffect(() => {
//     const fetchSpecies = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8081/species/getOneSpecies/${id}`);
//         setSpecies(res.data);
//         setFormData({
//           ScientificName: res.data.ScientificName || "",
//           CommonName: res.data.CommonName || "",
//           SpeciesCategory: res.data.SpeciesCategory || "",
//           ProtectionLevel: res.data.ProtectionLevel || "",
//           Habitat: res.data.Habitat || "",
//           updatedDate: new Date(res.data.updatedDate).toISOString().substring(0, 10),
//           ProtectionStatus: res.data.ProtectionStatus || false,
//           Description: res.data.Description || "",
//           ImageURL: res.data.ImageURL || "",
//         });
//       } catch (error) {
//         console.error("Error fetching species:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSpecies();
//   }, [id]);

//   // Input change
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleEdit = () => setEditMode(true);

//   const handleCancel = () => {
//     setEditMode(false);
//     if (species) {
//       setFormData({
//         ScientificName: species.ScientificName || "",
//         CommonName: species.CommonName || "",
//         SpeciesCategory: species.SpeciesCategory || "",
//         ProtectionLevel: species.ProtectionLevel || "",
//         Habitat: species.Habitat || "",
//         updatedDate: new Date(species.updatedDate).toISOString().substring(0, 10),
//         ProtectionStatus: species.ProtectionStatus || false,
//         Description: species.Description || "",
//         ImageURL: species.ImageURL || "",
//       });
//       setSelectedFile(null);
//     }
//   };

//   const handleUpdate = () => setShowUpdateConfirm(true);

//   // Image handlers
//   const handleNewPhoto = () => {
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.onchange = (e) => {
//       if (e.target.files.length > 0) setSelectedFile(e.target.files[0]);
//     };
//     fileInput.click();
//   };

//   const handleRemovePhoto = () => {
//     setSelectedFile(null);
//     setFormData({ ...formData, ImageURL: "" });
//   };

//   if (loading) return <p className="p-6">Loading species...</p>;
//   if (!species) return <p className="p-6 text-red-500">Species not found!</p>;

//   return (
//     <div className="flex h-screen bg-[#F5F5F5]">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#0E6C91] text-white">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto">
//         <h1 className="text-3xl font-bold mb-8 text-[#0E6C91]">View Species</h1>

//         <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
//           {/* Image */}
//           <div className="flex flex-col md:flex-row md:items-start gap-8">
//             <div className="w-full md:w-64 h-64 bg-[#B3D9EA] rounded-xl flex items-center justify-center shadow-inner">
//               {selectedFile ? (
//                 <img
//                   src={URL.createObjectURL(selectedFile)}
//                   alt={formData.CommonName}
//                   className="w-full h-full object-cover rounded-xl"
//                 />
//               ) : formData.ImageURL ? (
//                 <img
//                   src={formData.ImageURL}
//                   alt={formData.CommonName}
//                   className="w-full h-full object-cover rounded-xl"
//                 />
//               ) : (
//                 <span className="text-[#0E6C91] font-semibold">Image Placeholder</span>
//               )}
//             </div>

//             {editMode && (
//               <div className="flex flex-col gap-4 md:mt-0 mt-4">
//                 <button
//                   onClick={handleNewPhoto}
//                   className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
//                 >
//                   Upload New Photo
//                 </button>
//                 <button
//                   onClick={handleRemovePhoto}
//                   className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
//                 >
//                   Remove Photo
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Species Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Scientific Name */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Scientific Name</label>
//               <input
//                 type="text"
//                 name="ScientificName"
//                 value={formData.ScientificName}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//                 className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
//                   editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
//                 }`}
//               />
//             </div>

//             {/* Common Name */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Common Name</label>
//               <input
//                 type="text"
//                 name="CommonName"
//                 value={formData.CommonName}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//                 className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
//                   editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
//                 }`}
//               />
//             </div>

//             {/* Category */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Category</label>
//               {editMode ? (
//                 <select
//                   name="SpeciesCategory"
//                   value={formData.SpeciesCategory}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
//                 >
//                   <option value={formData.SpeciesCategory}>{formData.SpeciesCategory || "Select Category"}</option>
//                   {["Freshwater", "Saltwater-Marine", "Brackish-Fresh and Salt water Mix", "Reef-associated", "Migratory"].filter((opt) => opt !== formData.SpeciesCategory).map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   name="SpeciesCategory"
//                   value={formData.SpeciesCategory}
//                   readOnly
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
//                 />
//               )}
//             </div>

//             {/* Protection Level */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Protection Level</label>
//               {editMode ? (
//                 <select
//                   name="ProtectionLevel"
//                   value={formData.ProtectionLevel}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
//                 >
//                   <option value={formData.ProtectionLevel}>{formData.ProtectionLevel || "Select Level"}</option>
//                   {["Least Concern", "Near Threatened", "Vulnerable", "Endangered", "Critically Endangered", "Extinct", "Data Deficient", "Not Evaluated"].filter((opt) => opt !== formData.ProtectionLevel).map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   name="ProtectionLevel"
//                   value={formData.ProtectionLevel}
//                   readOnly
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
//                 />
//               )}
//             </div>

//             {/* Habitat */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Habitat</label>
//               {editMode ? (
//                 <select
//                   name="Habitat"
//                   value={formData.Habitat}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
//                 >
//                   <option value={formData.Habitat}>{formData.Habitat || "Select Habitat"}</option>
//                   {["Lakes", "Ponds", "Streams", "Ocean", "Open Sea", "Coral Reefs", "Coral Reefs", "Mangroves", "Deep Sea"].filter((opt) => opt !== formData.Habitat).map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   name="Habitat"
//                   value={formData.Habitat}
//                   readOnly
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
//                 />
//               )}
//             </div>

//             {/* Updated Date */}
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Updated Date</label>
//               <input
//                 type="date"
//                 name="updatedDate"
//                 value={formData.updatedDate}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//                 className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
//                   editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
//                 }`}
//               />
//             </div>

//             {/* Protected Checkbox */}
//             <div className="flex items-center mt-6 md:mt-0">
//               <input
//                 type="checkbox"
//                 name="ProtectionStatus"
//                 checked={formData.ProtectionStatus}
//                 onChange={handleInputChange}
//                 disabled={!editMode}
//                 className="h-5 w-5 text-[#17A9D3]"
//               />
//               <label className="ml-2 text-lg font-semibold text-[#0E6C91] text-left">Protected</label>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-lg font-semibold text-[#0E6C91] text-left mb-1">Description</label>
//             <textarea
//               name="Description"
//               rows="4"
//               value={formData.Description}
//               onChange={handleInputChange}
//               readOnly={!editMode}
//               className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
//                 editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
//               }`}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               onClick={handleCancel}
//               className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
//             >
//               Cancel
//             </button>
//             {editMode ? (
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
//               >
//                 Update
//               </button>
//             ) : (
//               <button
//                 onClick={handleEdit}
//                 className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Update Confirmation Modal */}
//         {showUpdateConfirm && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white rounded-xl p-6 w-96 text-center">
//               <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
//               <p className="mb-6">Are you sure you want to update this species?</p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={async () => {
//                     try {
//                       const fd = new FormData();
//                       Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
//                       if (selectedFile) fd.append("image", selectedFile);

//                       const res = await axios.put(
//                         `http://localhost:8081/species/updateSpecies/${id}`,
//                         fd,
//                         { headers: { "Content-Type": "multipart/form-data" } }
//                       );

//                       setSpecies(res.data);
//                       setEditMode(false);
//                       setShowUpdateConfirm(false);
//                       setSelectedFile(null);
//                       alert("Species updated successfully!");
//                     } catch (error) {
//                       console.error("Error updating species:", error);
//                       alert("Failed to update species!");
//                       setShowUpdateConfirm(false);
//                     }
//                   }}
//                   className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => setShowUpdateConfirm(false)}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ViewOneSpecies;

import React, { useState, useEffect } from "react";
import Navbar from "./components/SideNav.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewOneSpecies() {
  const { id } = useParams();

  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateError, setDateError] = useState(""); // <-- Date validation state

  // Fetch species
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/species/getOneSpecies/${id}`);
        setSpecies(res.data);
        setFormData({
          ScientificName: res.data.ScientificName || "",
          CommonName: res.data.CommonName || "",
          SpeciesCategory: res.data.SpeciesCategory || "",
          ProtectionLevel: res.data.ProtectionLevel || "",
          Habitat: res.data.Habitat || "",
          updatedDate: new Date(res.data.updatedDate).toISOString().substring(0, 10),
          ProtectionStatus: res.data.ProtectionStatus || false,
          Description: res.data.Description || "",
          ImageURL: res.data.ImageURL || "",
        });
      } catch (error) {
        console.error("Error fetching species:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecies();
  }, [id]);

  // Input change with date validation
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Date validation
    if (name === "updatedDate") {
      const today = new Date();
      const selectedDate = new Date(value);
      if (selectedDate > today) {
        setDateError("Updated date cannot be a future date.");
      } else {
        setDateError("");
      }
    }

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setDateError("");
    if (species) {
      setFormData({
        ScientificName: species.ScientificName || "",
        CommonName: species.CommonName || "",
        SpeciesCategory: species.SpeciesCategory || "",
        ProtectionLevel: species.ProtectionLevel || "",
        Habitat: species.Habitat || "",
        updatedDate: new Date(species.updatedDate).toISOString().substring(0, 10),
        ProtectionStatus: species.ProtectionStatus || false,
        Description: species.Description || "",
        ImageURL: species.ImageURL || "",
      });
      setSelectedFile(null);
    }
  };

  const handleUpdate = () => setShowUpdateConfirm(true);

  // Image handlers
  const handleNewPhoto = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      if (e.target.files.length > 0) setSelectedFile(e.target.files[0]);
    };
    fileInput.click();
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setFormData({ ...formData, ImageURL: "" });
  };

  if (loading) return <p className="p-6">Loading species...</p>;
  if (!species) return <p className="p-6 text-red-500">Species not found!</p>;

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
          {/* Image */}
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-full md:w-64 h-64 bg-[#B3D9EA] rounded-xl flex items-center justify-center shadow-inner">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={formData.CommonName}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : formData.ImageURL ? (
                <img
                  src={formData.ImageURL}
                  alt={formData.CommonName}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-[#0E6C91] font-semibold">Image Placeholder</span>
              )}
            </div>

            {editMode && (
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
            )}
          </div>

          {/* Species Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scientific Name */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Scientific Name</label>
              <input
                type="text"
                name="ScientificName"
                value={formData.ScientificName}
                onChange={handleInputChange}
                readOnly={!editMode}
                className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                  editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
                }`}
              />
            </div>

            {/* Common Name */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Common Name</label>
              <input
                type="text"
                name="CommonName"
                value={formData.CommonName}
                onChange={handleInputChange}
                readOnly={!editMode}
                className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                  editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
                }`}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Category</label>
              {editMode ? (
                <select
                  name="SpeciesCategory"
                  value={formData.SpeciesCategory}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
                >
                  <option value={formData.SpeciesCategory}>{formData.SpeciesCategory || "Select Category"}</option>
                  {["Freshwater", "Saltwater-Marine", "Brackish-Fresh and Salt water Mix", "Reef-associated", "Migratory"].filter((opt) => opt !== formData.SpeciesCategory).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="SpeciesCategory"
                  value={formData.SpeciesCategory}
                  readOnly
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
                />
              )}
            </div>

            {/* Protection Level */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Protection Level</label>
              {editMode ? (
                <select
                  name="ProtectionLevel"
                  value={formData.ProtectionLevel}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
                >
                  <option value={formData.ProtectionLevel}>{formData.ProtectionLevel || "Select Level"}</option>
                  {["Least Concern", "Near Threatened", "Vulnerable", "Endangered", "Critically Endangered", "Extinct", "Data Deficient", "Not Evaluated"].filter((opt) => opt !== formData.ProtectionLevel).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="ProtectionLevel"
                  value={formData.ProtectionLevel}
                  readOnly
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
                />
              )}
            </div>

            {/* Habitat */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Habitat</label>
              {editMode ? (
                <select
                  name="Habitat"
                  value={formData.Habitat}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-white"
                >
                  <option value={formData.Habitat}>{formData.Habitat || "Select Habitat"}</option>
                  {["Lakes", "Ponds", "Streams", "Ocean", "Open Sea", "Coral Reefs", "Coral Reefs", "Mangroves", "Deep Sea"].filter((opt) => opt !== formData.Habitat).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="Habitat"
                  value={formData.Habitat}
                  readOnly
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] bg-[#F5F5F5] text-gray-800"
                />
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#0E6C91] text-left mb-1">Updated Date</label>
              <input
                type="date"
                name="updatedDate"
                value={formData.updatedDate}
                onChange={handleInputChange}
                readOnly={!editMode}
                className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                  editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
                }`}
              />
              {dateError && <span className="text-red-500 mt-1">{dateError}</span>}
            </div>

            {/* Protected Checkbox */}
            <div className="flex items-center mt-6 md:mt-0">
              <input
                type="checkbox"
                name="ProtectionStatus"
                checked={formData.ProtectionStatus}
                onChange={handleInputChange}
                disabled={!editMode}
                className="h-5 w-5 text-[#17A9D3]"
              />
              <label className="ml-2 text-lg font-semibold text-[#0E6C91] text-left">Protected</label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-[#0E6C91] text-left mb-1">Description</label>
            <textarea
              name="Description"
              rows="4"
              value={formData.Description}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                editMode ? "bg-white" : "bg-[#F5F5F5] text-gray-800"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
            >
              Cancel
            </button>
            {editMode ? (
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Update Confirmation Modal */}
        {showUpdateConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
              <p className="mb-6">Are you sure you want to update this species?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={async () => {
                    if (dateError) {
                      alert("Please correct the errors before updating.");
                      return;
                    }

                    try {
                      const fd = new FormData();
                      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
                      if (selectedFile) fd.append("image", selectedFile);

                      const res = await axios.put(
                        `http://localhost:8081/species/updateSpecies/${id}`,
                        fd,
                        { headers: { "Content-Type": "multipart/form-data" } }
                      );

                      setSpecies(res.data);
                      setEditMode(false);
                      setShowUpdateConfirm(false);
                      setSelectedFile(null);
                      alert("Species updated successfully!");
                    } catch (error) {
                      console.error("Error updating species:", error);
                      alert("Failed to update species!");
                      setShowUpdateConfirm(false);
                    }
                  }}
                  className="bg-[#17A9D3] hover:bg-[#0E6C91] text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowUpdateConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOneSpecies;
