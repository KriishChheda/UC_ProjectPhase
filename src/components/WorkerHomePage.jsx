//This is worker home page
import React from 'react';
import { Search, MessageCircle, User, ChevronDown, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';
// import googleplay from "../assets/googleplay.svg"

import { useNavigate } from 'react-router-dom';
const WorkerHomePage= () => {
    const navigate=useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto">
      <header className="py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          
          <div className="mr-2">
                <img src={"./image.png"} alt="CivicSphere Logo" className="w-[78px] h-[78px] mt-[46px]" />
          </div>

          <h1 className="text-3xl font-bold mt-[46px]">
            <span className="text-black">Civic</span>
            <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                  Sphere
            </span>
          </h1>

        </div>
        
        <div className="flex items-center  mt-[61px]">
          <div className="flex items-center text-gray-700 font-medium  ml-[30px] w-[189px]">
            Home
            <ChevronDown size={18} />
          </div>
          
          <div className="bg-gray-200 rounded-full px-4 flex items-center w-[474px] h-[68px]">
            <input 
              type="text" 
              className="bg-transparent outline-none w-full" 
              placeholder="" 
            />
            <Search size={20} className="text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-3 ">
            <button className="p-2 rounded-full bg-gray-200  ml-[10px]">
              <MessageCircle size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-200">
              <User size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="py-12 flex justify-around">
      <div className="grid grid-cols-5 gap-4 max-w-5xl items-center text-center">
          <div className="rounded-2xl overflow-hidden h-[204.05px] w-[143px]">
              <img src="/api/placeholder/100/150" alt="Electrical services" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-[244px] w-[165px]">
              <img src="/api/placeholder/100/150" alt="Cleaning services" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden h-[330px] w-[180px]">
              <img src="/api/placeholder/150/250" alt="Carpentry services" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-[244px] w-[165px]">
              <img src="/api/placeholder/100/150" alt="Plumbing services" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-[204.05px] w-[143px]">
              <img src="/api/placeholder/100/150" alt="repair services" className="h-full w-full object-cover" />
          </div>
      </div>
   </div>
      
      <div className="px-12 py-4">
        <h2 className="text-2xl font-bold mb-6 text-left text-[#220440]">Postings Near You</h2>
        
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-xl shadow-sm p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div className="text-left">
                  <h3 className="font-semibold text-base">Fix My Sink</h3>
                  <p className="text-sm text-gray-500">Posted 2 hours ago</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="mb-1">Username</p>
                <p className="flex items-center text-sm mb-1">
                  <span className="text-red-500 mr-1">📍</span> Downtown
                </p>
                <p className="flex items-center text-sm">
                  <span className="text-green-600 mr-1">⏱</span> ASAP
                </p>
              </div>
              
              <button className="bg-[#220440] text-white py-2 px-4 rounded-md w-full">
                Job Details
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="bg-gray-50 py-12 px-12 border-t border-gray-200">
              <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="mr-2">
                    <img src={"./image.png"} alt="CivicSphere Logo" className="w-[78px] h-[78px] mt-[46px]" />
                  </div>
                  <h1 className="text-3xl font-bold mt-[46px]">
                          <span className="text-black">Civic</span>
                          <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                              Sphere
                          </span>
                  </h1>
                </div>
                  <p className="text-gray-500 text-sm mb-3 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <a href="#" className="text-sm text-purple-900">Learn more</a>
                </div>
                
                <div className='mt-[80px]'>
                  <h3 className="text-[#220440] uppercase text-xs font-bold mb-4">NAVIGATION</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" >Home</a></li>
                    <li><a href="#" >Post Request</a></li>
                    <li><a href="#" onClick={()=>{navigate("/workermessage")}} >Chat</a></li>
                    <li><a href="#" >My Jobs</a></li>
                  </ul>
                </div>
                
                <div className='mt-[80px]'>
                  <h3 className="text-[#220440] uppercase text-xs font-bold mb-4">FOLLOW US</h3>
                  <div className="flex space-x-3 pl-20">
                    <a href="#">
                      <Facebook size={20} className="text-gray-700" />
                    </a>
                    <a href="#" >
                      <Twitter size={20} className="text-gray-700"/>
                    </a>
                    <a href="#" >
                      <Instagram size={20} className="text-gray-700" />
                    </a>
                  </div>
                </div>
                
                <div className='mt-[80px]'>
                  <h3 className="text-[#220440] uppercase text-xs mb-4 font-bold">GET OUR APP</h3>
                  <div className="space-y-2 ml-16">
                    <a href="#" className="block">
                        <div className="rounded-[12px] w-[134px] h-[42px] bg-black text-white flex items-center justify-around">
                            <div>
                                <img src="googleplay" alt="" />
                            </div>
                            <div>
                                <span>Get it on</span> 
                                <br />
                                <span>GooglePlay</span>
                            </div>
                        </div>
                    </a>
                    <a href="#" className="block">
                        <div className="rounded-[12px] w-[134px] h-[42px] bg-black text-white flex items-center justify-around">
                            <div>
                                <img src="googleplay" alt="" />
                            </div>
                            <div>
                                <span>Download on</span> 
                                <br />
                                <span>App Store</span>
                            </div>
                        </div>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
};

export default WorkerHomePage;