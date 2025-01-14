import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdown);
  }, []);

  const handleVerifyOTP = () => {
    const storedOtp = localStorage.getItem('otp');
    const otpTimestamp = localStorage.getItem('otpTimestamp');
    const currentTime = Date.now();

    // Check if OTP is expired
    if (currentTime - otpTimestamp > 30000) {
      alert('OTP expired. Please request a new one.');
      navigate('/');
      return;
    }

    // Check if OTP matches
    if (otp === storedOtp) {
      alert('OTP Verified!');
      navigate('/dashboard');
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('otp', newOtp);
    localStorage.setItem('otpTimestamp', Date.now());
    alert(`New OTP: ${newOtp}`);
    setTimer(30); // Reset timer
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-400">
      <div className="absolute top-0 left-0 py-6 pl-6 flex items-center">
        <img
          src="https://res.cloudinary.com/dlgz2t08o/image/upload/v1736841276/icon_dfgplh.png" // Update to the correct logo path
          alt="Logo"
          className="h-12 mr-4"
        />
        <h1 className="text-3xl font-extrabold tracking-wider text-white">
          BankDash.
        </h1>
      </div>
      <div className="relative p-8 bg-white bg-opacity-80 shadow-xl rounded-lg max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Verify OTP
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Enter the OTP sent to your email. It will expire in{' '}
          <span className="font-bold text-red-500">{timer}s</span>.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border w-full px-4 py-2 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleVerifyOTP}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-2 rounded-md hover:from-indigo-500 hover:to-purple-400 transition duration-300"
        >
          Verify OTP
        </button>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleResendOTP}
            className="text-indigo-500 hover:text-indigo-700 underline"
          >
            Resend OTP
          </button>
          <p className="text-sm text-gray-500">Timeout: {timer}s</p>
        </div>
      </div>
      {/* Image at the bottom right corner */}
      <img
        src="https://res.cloudinary.com/dlgz2t08o/image/upload/v1736841276/man_vbyoq8.png"
        alt="Decorative"
        className="absolute -bottom-1 right-4 sm:right-8 md:right-16 lg:right-32 h-72 sm:h-96 md:h-80 lg:h-full "
      />
    </div>
  );
};

export default VerifyOTP;
