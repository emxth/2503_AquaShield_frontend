import React, { useState } from 'react';


function OTPVerification() {
const [otp, setOtp] = useState('');
const [error, setError] = useState('');


const handleSubmit = (e) => {
e.preventDefault();
setError('');
if (!/^\d{4,6}$/.test(otp)) {
setError('Enter a valid 4-6 digit OTP');
return;
}
// Call API to verify OTP
console.log('Verify OTP:', otp);
};


const handleResend = () => {
console.log('Resend OTP');
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
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
required
/>
{error && <div className="text-red-600 text-sm">{error}</div>}
<button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Submit OTP</button>
</form>
<div className="mt-2 text-sm text-slate-600">
Didn't receive OTP?{' '}
<button onClick={handleResend} className="underline text-indigo-600">Resend</button>
</div>
</div>
);
}


export default OTPVerification;