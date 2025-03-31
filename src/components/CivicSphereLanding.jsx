import React from 'react';
import { useNavigate } from 'react-router-dom';

const CivicSphereLanding = () => {
const navigate=useNavigate()
  return (
    <div className="w-full h-screen overflow-hidden" style={{ background: 'linear-gradient(144.74deg, #220440 20.77%, #4F1E4F 42.35%, #7B375D 63.92%)' }}>
      <header className="flex justify-between items-center px-12 pt-8 w-full">
        <div className="flex items-center">
          <div className="mr-2">
            <img src="./image.png" alt="CivicSphere Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold mt-[46px]">
            <span className="text-black">Civic</span>
            <span className="bg-gradient-to-br from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                  Sphere
            </span>
          </h1>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-10 rounded-xl" onClick={()=>{navigate("/usersignuplogin")}}>
          LOGIN
        </button>
      </header>

      <div className="flex items-center w-full h-5/6 px-12">
        <div className="w-1/2 z-10">
          <h2 className="text-5xl font-bold text-yellow-400 text-left mb-2">
            Get Jobs Done.
          </h2>
          <h2 className="text-5xl font-bold text-yellow-400  text-left mb-8">
            Anytime, Anywhere.
          </h2>
          <p className="text-white text-xl max-w-md text-left">
            Post a task, connect with skilled workers, and get it done hassle-free.
          </p>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="relative">
            <img 
              src="./image9.png" 
              alt="Collaboration Illustration" 
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CivicSphereLanding;