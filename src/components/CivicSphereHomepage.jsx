import React from 'react';
import { Search, MessageCircle, User, ChevronDown, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';

const CivicSphereHomepage = () => {
  return (
    <div className="bg-white min-h-screen">
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

      <div className="py-8 px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-[#220440] mb-2 text-left">Need a Hand?</h2>
            <p className="text-gray-700 mb-6 text-left">Let us find you a skilled worker. <br /> Post a request now!</p>
            <button className="bg-[#220440] text-white font-medium py-2 rounded-[14px] h-[55px] w-[174px] mr-[140px]">
              POST NOW
            </button>
          </div>
          <div className="w-64 mr-[150px]">
            <img src="/api/placeholder/250/200" alt="Person peeking" className="w-full" />
          </div>
        </div>
      </div>

      <div className="py-10 px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#220440] text-left mb-[5px]">Hire Again</h2>
          
          <div className="relative">
            <div className="flex space-x-6 overflow-hidden">
              {[1, 2, 3].map((item) => (
                <div key={item} className=" border border-black rounded-xl shadow-md p-4 w-72">
                  <div className="flex space-x-4 w-[376px] border-black">

                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="/api/placeholder/100/100" alt="Worker profile" className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <p className="font-medium">Lorem Ipsum</p>
                      <p className="text-gray-500 text-sm">Plumber</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
              <ChevronRight className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#220440] text-left mb-[5px]">Trending in your area</h2>
          
          <div className="relative">
            <div className="flex space-x-6 overflow-hidden">
              {[1, 2, 3].map((item) => (
                <div key={item} className=" border border-black rounded-xl shadow-md p-4 w-72">
                  <div className="flex space-x-4 w-[376px] border-black">

                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="/api/placeholder/100/100" alt="Worker profile" className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <p className="font-medium">Lorem Ipsum</p>
                      <p className="text-gray-500 text-sm">Plumber</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
              <ChevronRight className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
            <a href="#" className="text-sm text-[#220440]">Learn more</a>
          </div>
          
          <div className='mt-[80px]'>
            <h3 className="text-[#220440] uppercase text-xs font-medium mb-4">NAVIGATION</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" >Home</a></li>
              <li><a href="#" >Post Request</a></li>
              <li><a href="#" >Chat</a></li>
              <li><a href="#" >My Jobs</a></li>
            </ul>
          </div>
          
          <div className='mt-[80px]'>
            <h3 className="text-[#220440] uppercase text-xs font-medium mb-4">FOLLOW US</h3>
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
                          <img src="./googleplay.svg" alt="" />
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
                          <img src="./googleplay.svg" alt="" />
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

export default CivicSphereHomepage;