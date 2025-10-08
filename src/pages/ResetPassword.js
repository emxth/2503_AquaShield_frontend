import React, { useState } from 'react';


function ResetPassword() {
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');


const handleSubmit = (e) => {
e.preventDefault();
setError('');
if (password.length < 8) {
setError('Password must be at least 8 characters');
return;
}
if (password !== confirmPassword) {
setError('Passwords do not match');
return;
}
// Call API to reset password
console.log('Reset password:', password);
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
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
required
/>
<input
type="password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
placeholder="Confirm Password"
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
required
/>
{error && <div className="text-red-600 text-sm">{error}</div>}
<button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Reset Password</button>
</form>
</div>
);
}


export default ResetPassword;