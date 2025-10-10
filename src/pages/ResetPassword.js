import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const backendUrl = "http://localhost:8081";
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      const { data } = await axios.post(`${backendUrl}/api/password/reset-password`, { email, password });
      if (data.success) {
        toast.success("Password reset successfully!");
        localStorage.removeItem('resetEmail');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Reset Password</button>
      </form>
    </div>
  );
}
export default ResetPassword;
