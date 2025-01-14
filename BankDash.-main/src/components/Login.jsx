import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOTP } from '../utils/otpHelper';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;

    // Check if the email is valid
    if (!email) {
      alert('Please enter your email.');
      return;
    } else if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Generate OTP
    const otp = generateOTP();
    localStorage.setItem('otp', otp);
    localStorage.setItem('otpTimestamp', Date.now());

    // Alert OTP (for demo purposes)
    alert(`Your OTP is: ${otp}`);

    // Navigate to OTP verification page
    navigate('/verify-otp');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      {/* Logo Section */}
      <div className="absolute top-0 left-0 py-6 pl-6 flex items-center">
        <img
          src="https://res.cloudinary.com/dlgz2t08o/image/upload/v1736841277/react_abv0ar.svg" // Update to the correct logo path
          alt="Logo"
          className="h-12 mr-4"
        />
        <h1 className="text-3xl font-extrabold tracking-wider text-white">
          BankDash.
        </h1>
      </div>

      {/* Form Section */}
      <div className="relative p-8 bg-white bg-opacity-80 shadow-xl rounded-lg max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full px-4 py-2 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSendOTP}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-md hover:from-purple-500 hover:to-pink-400 transition duration-300"
        >
          Send OTP
        </button>
      </div>

      {/* Image at the bottom right corner */}
      <img
        src="https://res.cloudinary.com/dlgz2t08o/image/upload/v1736841276/man_vbyoq8.png"
        alt="Decorative"
        className="absolute -bottom-2 right-4 sm:right-8 md:right-16 lg:right-32 h-72 sm:h-96 md:h-80 lg:h-full "
      />
    </div>
  );
};

export default Login;
