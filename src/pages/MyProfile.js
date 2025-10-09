import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Profile update
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('firstname', userData.firstname)
      formData.append('lastname', userData.lastname)
      formData.append('contactNo', userData.contactNo)
      formData.append('email', userData.email)
      formData.append('address', JSON.stringify(userData.address))
      image && formData.append('image', image)

      const { data } = await axios.put(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        setUserData(data.userData)
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Change password
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/change-password`, 
        { currentPassword, newPassword }, 
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Delete account request
  const handleDeleteRequest = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/request-delete`, {}, { headers: { token } })
      if (data.success) toast.success(data.message)
      else toast.error(data.message)
      setShowDeleteConfirm(false)
    } catch (error) {
      toast.error(error.message)
      setShowDeleteConfirm(false)
    }
  }

  return userData && (
    <div className="flex flex-col md:flex-row gap-10 mt-6 max-w-5xl mx-auto text-sm">

      {/* LEFT SIDE - Profile Info */}
      <div className="md:w-1/2 flex flex-col gap-2 text-neutral-700">
        {
          isEdit 
          ? <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img 
                  className="w-24 h-24 rounded-full object-cover opacity-75" 
                  src={image ? URL.createObjectURL(image) : userData.image} 
                  alt=""
                />
                <img 
                  className="w-8 absolute bottom-2 right-2" 
                  src={image ? '' : assets.upload_icon} 
                  alt=""
                />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
            </label>
          : <img 
              className="w-24 h-24 rounded-full object-cover" 
              src={userData.image} 
              alt="" 
            />
        }

        {isEdit ? (
          <div className="flex gap-2 mt-4">
            <input
              className="bg-gray-50 text-3xl font-medium max-w-60"
              type="text"
              value={userData.firstname}
              onChange={e => setUserData(prev => ({ ...prev, firstname: e.target.value }))}
            />
            <input
              className="bg-gray-50 text-3xl font-medium max-w-60"
              type="text"
              value={userData.lastname}
              onChange={e => setUserData(prev => ({ ...prev, lastname: e.target.value }))}
            />
          </div>
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.firstname} {userData.lastname}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Contact No:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52" type="text" 
              value={userData.contactNo} 
              onChange={e => setUserData(prev => ({ ...prev, contactNo: e.target.value }))} />
          ) : (
            <p className="text-blue-400">{userData.contactNo}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input className="bg-gray-50 mb-1" 
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                value={userData.address.line1} 
                type="text" />
              <br />
              <input className="bg-gray-50" 
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                value={userData.address.line2} 
                type="text" />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}<br />{userData.address.line2}
            </p>
          )}
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}>
              Save Information
            </button>
          ) : (
            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Change Password + Delete Account */}
      <div className="md:w-1/2 flex flex-col gap-8">

        {/* Change Password */}
        <div className="p-5 border rounded-2xl shadow-md bg-white relative">
          <h2 className="text-lg font-semibold mb-3">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />
          <div className="flex justify-end">
            <button
              onClick={handleChangePassword}
              className="bg-primary text-white px-6 py-2 rounded hover:opacity-90 transition-all"
            >
              Change
            </button>
          </div>
        </div>

        {/* Delete Account Request */}
        <div className="p-5 border rounded-2xl shadow-md bg-white relative">
          <h2 className="text-lg font-semibold mb-3">Request to Delete Account</h2>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white transition-all"
            >
              Request Now
            </button>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-3">Are you sure?</h3>
              <p className="text-gray-600 mb-5">
                Do you really want to request account deletion?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRequest}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
