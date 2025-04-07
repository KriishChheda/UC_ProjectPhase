import React from 'react';
import { useNavigate } from 'react-router-dom';

const CivicSphereLanding = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(144.74deg, #220440 20.77%, #4F1E4F 42.35%, #7B375D 63.92%)' }}>
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 w-full">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="mr-2">
            <img src="./image.png" alt="CivicSphere Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold sm:mt-0 md:mt-[46px] flex mb-6">
            <span className="text-white">Civic</span>
            <span className="bg-gradient-to-br from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
              Sphere
            </span>
          </h1>
        </div>
        <button 
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-xl" 
          onClick={() => {navigate("/usersignuplogin")}}
        >
          LOGIN
        </button>
      </header>
      
      <div className="flex flex-col md:flex-row items-center w-full min-h-[70vh] px-4 sm:px-8 md:px-12 py-8 md:py-0">
        <div className="w-full md:w-1/2 z-10 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-center md:text-left mb-2">
            Get Jobs Done.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 text-center md:text-left mb-4 sm:mb-8">
            Anytime, Anywhere.
          </h2>
          <p className="text-white text-lg sm:text-xl max-w-md mx-auto md:mx-0 text-center md:text-left">
            Post a task, connect with skilled workers, and get it done hassle-free.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative">
            <img
              src="./image9.png"
              alt="Collaboration Illustration"
              className="w-full max-w-xs sm:max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CivicSphereLanding;