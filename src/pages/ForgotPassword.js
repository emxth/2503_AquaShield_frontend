import React, { useState } from 'react';


function ForgotPassword() {
const [email, setEmail] = useState('');
const [error, setError] = useState('');


const handleSubmit = (e) => {
e.preventDefault();
setError('');
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
setError('Please enter a valid email address');
return;
}
// Call API to send OTP
console.log('Send OTP to:', email);
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
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
required
/>
{error && <div className="text-red-600 text-sm">{error}</div>}
<button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Send OTP</button>
</form>
</div>
);
}


export default ForgotPassword;