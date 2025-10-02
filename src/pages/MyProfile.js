import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('firstname', userData.firstname)
      formData.append('lastname', userData.lastname)
      formData.append('contactNo', userData.contactNo)
      formData.append('email', userData.email)
      formData.append('address', JSON.stringify(userData.address))

      image && formData.append('image', image)

      const { data } = await axios.put(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);   // instantly update with new data
        setIsEdit(false);
        setImage(false);
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
  isEdit 
  ? <label htmlFor="image">
      <div className='inline-block relative cursor-pointer'>
        <img 
          className='w-24 h-24 rounded-full object-cover opacity-75' 
          src={image ? URL.createObjectURL(image) : userData.image} 
          alt=""
        />
        <img 
          className='w-8 absolute bottom-2 right-2' 
          src={image ? '' : assets.upload_icon} 
          alt=""
        />
      </div>
      <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
    </label>
  : <img 
      className='w-24 h-24 rounded-full object-cover' 
      src={userData.image} 
      alt="" 
    />
}

      {/* First + Last Name */}
      {
        isEdit
          ? <div className="flex gap-2 mt-4">
            <input
              className='bg-gray-50 text-3xl font-medium max-w-60'
              type="text"
              value={userData.firstname}
              onChange={e => setUserData(prev => ({ ...prev, firstname: e.target.value }))}
            />
            <input
              className='bg-gray-50 text-3xl font-medium max-w-60'
              type="text"
              value={userData.lastname}
              onChange={e => setUserData(prev => ({ ...prev, lastname: e.target.value }))}
            />
          </div>
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>
            {userData.firstname} {userData.lastname}
          </p>
      }


      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email:</p>
        <p className='text-blue-500'>{userData.email}</p>
        <p className='font-medium'>Contact No::</p>
        {
          isEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={userData.contactNo} onChange={e => setUserData(prev => ({ ...prev, contactNo: e.target.value }))} />
            : <p className='text-blue-400'>{userData.contactNo}</p>
        }
        <p className='font-medium'>Address:</p>
        {
          isEdit
            ? <p>
              <input className='bg-gray-50' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
            </p>
            : <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
        }
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile