import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OTPVerification() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const backendUrl = "http://localhost:8081";
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/password/verify-otp`, { email, otp });
      if (data.success) {
        toast.success("OTP Verified!");
        navigate("/reset-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Submit OTP</button>
      </form>
    </div>
  );
}
export default OTPVerification;
