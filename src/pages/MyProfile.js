import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(null);

  const [localUserData, setLocalUserData] = useState({
    firstname: "",
    lastname: "",
    contactNo: "",
    email: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (userData) {
      setLocalUserData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        contactNo: userData.contactNo || "",
        email: userData.email,
        address: userData.address || "",
        image: userData.image || "",
      });
    }
  }, [userData]);

  const checkDeletionRequest = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/check-deletion-request`,
        { headers: { token } }
      );
      setDeletionStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) checkDeletionRequest();
  }, [token]);

  const updateUserProfileData = async () => {
    if (
      !localUserData.firstname ||
      !localUserData.lastname ||
      !localUserData.contactNo
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstname", localUserData.firstname);
      formData.append("lastname", localUserData.lastname);
      formData.append("contactNo", localUserData.contactNo);
      formData.append("email", localUserData.email);
      formData.append("address", localUserData.address);
      if (imageFile) formData.append("image", imageFile);

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);
        setIsEdit(false);
        setImageFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/change-password`,
        { currentPassword, newPassword },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/request-delete`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setDeletionStatus("Pending");
      } else {
        if (data.message === "Deletion request already submitted")
          setDeletionStatus("Pending");
        toast.error(data.message);
      }
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelEdit = () => {
    if (userData) {
      setLocalUserData({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        contactNo: userData.contactNo || "",
        email: userData.email || "",
        address: userData.address || "",
        image: userData.image || "",
      });
    }
    setImageFile(null);
    setIsEdit(false);
  };

  // New useEffect for auto-logout on deletion acceptance
  useEffect(() => {
    if (deletionStatus === "Accepted") {
      toast.info(
        "Your account deletion request has been accepted. You will be logged out."
      );
      setTimeout(() => {
        localStorage.clear(); // clear token
        window.location.href = "/login";
      }, 2000);
    }
  }, [deletionStatus]);

  return (
    <div className="flex flex-col md:flex-row gap-10 mt-6 max-w-5xl mx-auto text-sm">
      {/* LEFT SIDE - Profile Info */}
      <div className="md:w-1/2 flex flex-col gap-2 text-neutral-700">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative w-24 h-24">
              <img
                className="w-full h-full rounded-full object-cover opacity-75"
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : localUserData.image || assets.default_profile
                }
                alt="Profile"
              />
              {!imageFile && (
                <img
                  className="w-8 absolute bottom-2 right-2"
                  src={assets.upload_icon}
                  alt="Upload"
                />
              )}
            </div>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={localUserData.image || assets.default_profile}
            alt="Profile"
          />
        )}

        {isEdit ? (
          <div className="flex gap-2 mt-4">
            <input
              className="bg-gray-50 text-3xl font-medium max-w-60 border border-gray-300 rounded px-3 py-1"
              type="text"
              value={localUserData.firstname}
              onChange={(e) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
              placeholder="First Name"
            />
            <input
              className="bg-gray-50 text-3xl font-medium max-w-60 border border-gray-300 rounded px-3 py-1"
              type="text"
              value={localUserData.lastname}
              onChange={(e) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
              placeholder="Last Name"
            />
          </div>
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {localUserData.firstname} {localUserData.lastname}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{localUserData.email}</p>

          <p className="font-medium">Contact No:</p>
          {isEdit ? (
            <input
              type="text"
              value={localUserData.contactNo}
              onChange={(e) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  contactNo: e.target.value,
                }))
              }
              className="bg-gray-100 max-w-52 border border-gray-300 rounded px-3 py-1"
              placeholder="Contact Number"
            />
          ) : (
            <p>{localUserData.contactNo || "Not provided"}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              type="text"
              value={localUserData.address}
              onChange={(e) =>
                setLocalUserData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="bg-gray-50 mb-1 border border-gray-300 rounded px-3 py-1 w-full"
              placeholder="Address"
            />
          ) : (
            <p>{localUserData.address || "Not provided"}</p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          {isEdit ? (
            <>
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
              <button
                className="border border-gray-500 px-8 py-2 rounded-full hover:bg-gray-500 hover:text-white transition-all"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Password + Delete */}
      <div className="md:w-1/2 flex flex-col gap-8">
        {/* Password Section */}
        <div className="p-5 border rounded-2xl shadow-md bg-white relative">
          <h2 className="text-lg font-semibold mb-3 text-yellow-600">
            Change Password
          </h2>
          {[
            {
              val: currentPassword,
              setter: setCurrentPassword,
              show: showCurrentPassword,
              toggle: setShowCurrentPassword,
              placeholder: "Current Password",
            },
            {
              val: newPassword,
              setter: setNewPassword,
              show: showNewPassword,
              toggle: setShowNewPassword,
              placeholder: "New Password",
            },
            {
              val: confirmPassword,
              setter: setConfirmPassword,
              show: showConfirmPassword,
              toggle: setShowConfirmPassword,
              placeholder: "Confirm Password",
            },
          ].map((input, i) => (
            <div className="relative mb-2" key={i}>
              <input
                type={input.show ? "text" : "password"}
                placeholder={input.placeholder}
                value={input.val}
                onChange={(e) => input.setter(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
                onClick={() => input.toggle((prev) => !prev)}
              >
                {input.show ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={handleChangePassword}
              className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition-all"
            >
              Change
            </button>
          </div>
        </div>

        {/* Account Deletion Section */}
        <div className="p-5 border rounded-2xl shadow-md bg-white relative">
          <h2 className="text-lg font-semibold mb-3 text-red-600">
            Delete Account
          </h2>
          {deletionStatus === "Pending" && (
            <div className="text-center py-4">
              <div className="text-green-600 font-semibold mb-2">
                ✓ Deletion Request Submitted
              </div>
              <p className="text-sm text-gray-600">
                Your account deletion request has been submitted and forwarded
                for admin review.
              </p>
            </div>
          )}
          {deletionStatus === "Rejected" && (
            <div className="text-center py-4">
              <div className="text-red-600 font-bold mb-2">
                ✗ Deletion Request Rejected
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Your account deletion request was rejected. Contact admin for
                details.
              </p>
            </div>
          )}
          {!deletionStatus && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Once you request account deletion, your account will be removed
                after accepted by administrator.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white transition-all"
                >
                  Request Now
                </button>
              </div>
            </div>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-3">Are you sure?</h3>
              <p className="text-gray-600 mb-5">
                Do you really want to request account deletion? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRequest}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Yes, Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
