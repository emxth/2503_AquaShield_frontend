import React, { useState } from "react";
import Navbar from "./components/SideNav";

function AddSpecies() {
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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  // --- Validation Logic ---
  const validateField = (name, value, type, files) => {
    let errorMsg = "";

    switch (name) {
      case "scientificName":
        if (!value.trim()) errorMsg = "Scientific Name is required";
        else if (!/^[A-Za-z\s]+$/.test(value))
          errorMsg = "Scientific Name must only contain letters and spaces";
        break;

      case "commonName":
        if (!value.trim()) errorMsg = "Common Name is required";
        break;

      case "category":
        if (!value) errorMsg = "Please select a Category";
        break;

      case "habitat":
        if (!value) errorMsg = "Please select a Habitat";
        break;

      case "updatedDate":
        if (value && new Date(value) > new Date())
          errorMsg = "Updated Date cannot be in the future";
        break;

      case "image":
        if (files && files[0]) {
          const file = files[0];
          if (!["image/jpeg", "image/png"].includes(file.type)) {
            errorMsg = "Only JPG or PNG images are allowed";
          } else if (file.size > 5 * 1024 * 1024) {
            errorMsg = "Image must be smaller than 5MB";
          }
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // --- Update Form Data ---
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    validateField(name, newValue, type, files);
  };

  // --- Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(form).forEach((field) =>
      validateField(
        field,
        form[field],
        field === "isProtected" ? "checkbox" : null,
        field === "image" ? [form.image] : null
      )
    );

    if (Object.values(errors).some((err) => err)) return;

    setLoading(true); // Show loading overlay

    try {
      const formData = new FormData();
      formData.append("scientificName", form.scientificName);
      formData.append("commonName", form.commonName);
      formData.append("speciesCategory", form.category);
      formData.append("protectionLevel", form.protectionLevel);
      formData.append("habitat", form.habitat);
      formData.append("protectionStatus", form.isProtected);
      formData.append("updatedDate", form.updatedDate);
      formData.append("description", form.description);

      if (form.image) formData.append("image", form.image);

      const response = await fetch("http://localhost:8081/species/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Species added successfully!");
        setForm({
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
        setErrors({});
      } else {
        alert("❌ Error: " + data.message);
        console.error("Error response:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while adding species. " + error);
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  // --- UI ---
  return (
    <div className="flex h-screen bg-[#F5F5F5] relative">
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
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="scientificName"
                    placeholder="Scientific Name"
                    value={form.scientificName}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                      errors.scientificName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.scientificName && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.scientificName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    name="commonName"
                    placeholder="Common Name"
                    value={form.commonName}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                      errors.commonName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.commonName && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.commonName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Category & Protection Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Freshwater">Freshwater</option>
                  <option value="Saltwater-Marine">Saltwater-Marine</option>
                  <option value="Brackish-Fresh and Salt water Mix">
                    Brackish-Fresh and Salt water Mix
                  </option>
                  <option value="Reef-associated">Reef-associated</option>
                  <option value="Migratory">Migratory</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.category}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                  Protection Level
                </label>
                <select
                  name="protectionLevel"
                  value={form.protectionLevel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
                >
                  <option value="">Select Level</option>
                  <option value="Least Concern">Least Concern</option>
                  <option value="Near Threatened">Near Threatened</option>
                  <option value="Vulnerable">Vulnerable</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Critically Endangered">
                    Critically Endangered
                  </option>
                  <option value="Extinct">Extinct</option>
                  <option value="Data Deficient">Data Deficient</option>
                  <option value="Not Evaluated">Not Evaluated</option>
                </select>
              </div>
            </div>

            {/* Row 3: Habitat & Protected Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                  Habitat
                </label>
                <select
                  name="habitat"
                  value={form.habitat}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                    errors.habitat ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Habitat</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Lakes">Lakes</option>
                  <option value="Ponds">Ponds</option>
                  <option value="Streams">Streams</option>
                  <option value="Ocean">Ocean</option>
                  <option value="Open Sea">Open Sea</option>
                  <option value="Coral Reef">Coral Reef</option>
                  <option value="Mangroves">Mangroves</option>
                  <option value="Deep Sea">Deep Sea</option>
                </select>
                {errors.habitat && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.habitat}
                  </span>
                )}
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
                <label
                  htmlFor="isProtected"
                  className="ml-2 font-medium text-[#0E6C91]"
                >
                  Protected
                </label>
              </div>
            </div>

            {/* Row 4: Updated Date & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                  Updated Date
                </label>
                <input
                  type="date"
                  name="updatedDate"
                  value={form.updatedDate}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                    errors.updatedDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.updatedDate && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.updatedDate}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                  Image Upload
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className={`w-full text-gray-700 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3] ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.image}
                  </span>
                )}
                {form.image && !errors.image && (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="Preview"
                    className="mt-2 w-48 h-48 object-cover rounded"
                  />
                )}
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-[#0E6C91] mt-2 text-left">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Enter description..."
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A9D3]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow"
                onClick={() => {
                  setForm({
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
                  setErrors({});
                }}
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

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-[#17A9D3] border-gray-300 rounded-full animate-spin"></div>
          <p className="text-white text-lg font-semibold mt-4">
            Adding species...
          </p>
        </div>
      )}
    </div>
  );
}

export default AddSpecies;
