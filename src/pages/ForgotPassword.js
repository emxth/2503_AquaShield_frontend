import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const backendUrl = "http://localhost:8081"; // adjust if different

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/password/forgot-password`, { email });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem('resetEmail', email);
        navigate("/otp-verification");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Send OTP</button>
      </form>
    </div>
  );
}
export default ForgotPassword;
