import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import dogAnimation from '../assets/dog.json';
import BubbleBackground from './Bubbles';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-white text-center p-4 relative overflow-hidden">
      <Lottie animationData={dogAnimation} loop={true} className="w-[300px] h-[300px]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold text-orange-600 mt-4">
          Welcome to Corgi Insurance
        </h1>

        <p className="text-lg text-gray-600 mt-2 max-w-md">
          Upload your docs and let our AI handle the rest—fast and reliable.<br/>
          Caring for Claims, Paw by Paw.
        </p>

        <button 
          onClick={handleGetStarted}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </button>
      </motion.div>
      <BubbleBackground/> 
    </div>
  );
};

export default Landing;
