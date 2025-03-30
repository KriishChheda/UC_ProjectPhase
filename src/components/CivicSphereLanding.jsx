import React from 'react';
const CivicSphereLanding = () => {
  return (
    <div className="w-full h-screen overflow-hidden" style={{ background: 'linear-gradient(144.74deg, #220440 20.77%, #4F1E4F 42.35%, #7B375D 63.92%)' }}>
      <header className="flex justify-between items-center p-6 bg-white">
        <div className="flex items-center">
          <div className="mr-2">
          <div className="mr-2">
              <img src={"./image.png"} alt="CivicSphere Logo" className="w-[78px] h-[78px] mt-[46px]" />
          </div>
        </div>
          <h1 className="text-3xl font-bold mt-[46px]">
            <span className="text-black">Civic</span>
            <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                  Sphere
            </span>
          </h1>
        </div>
        <button className="w-[220px] h-[48px] mt-[66px] rounded-[15px] bg-yellow-400 hover:bg-yellow-500">
          LOGIN
        </button>
      </header>

      <div className="flex items-center w-full h-5/6">
        <div className="w-1/2 pl-12 z-10">
        <div className="w-[533px] h-[150px] ml-[95px] text-left">
            <h2 className="text-5xl font-bold text-yellow-400 mb-2">
              Get Jobs Done.
            </h2>
            <h2 className="text-5xl font-bold text-yellow-400 mb-8">
              Anytime, Anywhere.
            </h2>
        </div>
          <p className="text-white text-left ml-[95px]">
            Post a task, connect with skilled workers, and get it done hassle-free.
          </p>
        </div>

        <div className="w-1/2 pr-6 flex justify-center items-center">
          <div className="relative">
          <img src={"./image2.png"} alt="CivicSphere Logo" className="w-[78px] h-[78px] mt-[46px]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H1440V40C1080 120 360 0 0 80V100Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default CivicSphereLanding;