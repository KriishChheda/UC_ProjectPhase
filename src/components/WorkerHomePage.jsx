import React from 'react';
import { useState, useEffect } from 'react';
import { Search, MessageCircle, User, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


    const WorkerHomePage= () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const [rotatedImages, setRotatedImages] = useState([
    "./image1.png",
    "./image2.png",
    "./image3.png",
    "./image4.png",
    "./image5.png"
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatedImages((prevImages) => {
        const newImages = [...prevImages];
        newImages.push(newImages.shift());
        return newImages;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleCount(3)
      else if (width < 768) setVisibleCount(3)
      else if (width < 1024) setVisibleCount(4)
      else setVisibleCount(5)
    }
  
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img src="./image.png" alt="CivicSphere Logo" className="w-12 h-12" />
              <h1 className="text-xl font-bold ml-2">
                <span className="text-black">Civic</span>
                <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">Sphere</span>
              </h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-4">
            <a href="#" className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Home</a>
            <a href="#" onClick={() => { navigate("/needahand"); setIsMobileMenuOpen(false); }} className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Post Request</a>
            <a href="#" onClick={() => { navigate("/usermessage"); setIsMobileMenuOpen(false); }} className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Chat</a>
            <a href="#" onClick={() => { navigate("/userjobs"); setIsMobileMenuOpen(false); }} className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">My Jobs</a>
            <a href="#" className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Settings</a>
            <a href="#" className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Logout</a>
          </nav>
          <div className="mt-8">
            <div className="bg-gray-200 rounded-full px-4 flex items-center h-12">
              <input 
                type="text" 
                className="bg-transparent outline-none w-full" 
                placeholder="Search..." 
              />
              <Search size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

 <header className="py-4 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between relative">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="./image.png" alt="CivicSphere Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-[78px] md:h-[78px]" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-black">Civic</span>
              <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                Sphere
              </span>
            </h1>
          </div>
          
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center flex-wrap gap-2 md:gap-4 mt-4 md:mt-0">
          <div className="flex items-center text-gray-700 font-medium w-auto cursor-pointer">
            Home <ChevronDown size={18} />
          </div>

          <div className="bg-gray-200 rounded-full px-4 flex items-center w-full md:w-[280px] lg:w-[430px] h-[40px]">
            <input 
              type="text" 
              className="bg-transparent outline-none w-full" 
              placeholder="Search..." 
            />
            <Search size={20} className="text-gray-500" />
          </div>

          <div className="flex items-center space-x-3 user-menu">
            <button className="p-2 rounded-full bg-gray-200" onClick={() => navigate("/usermessage")}>
              <MessageCircle size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-200" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User size={20} className="text-gray-500" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-1 mt-40 w-44 bg-white shadow-lg rounded-lg p-2 border border-gray-200 transform translate-y-16 md:translate-y-2 transition-all duration-200 z-40">
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/workerprofile")}>Profile</a>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/workerjobs")}>My Jobs</a>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Settings</a>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Logout</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="py-8 md:py-12 px-4 flex justify-center">
      <div
        className={`flex gap-3 sm:gap-5 max-w-6xl w-full items-center text-center 
        grid-cols-${visibleCount}`}
      >
        {rotatedImages.slice(0, visibleCount).map((img, index) => {
          const centerIndex = Math.floor(visibleCount / 2)
          const sizeClass =
            index === centerIndex
              ? 'h-[160px] sm:h-[220px] md:h-[300px] w-[100px] sm:w-[140px] md:w-[180px]'
              : index === centerIndex - 1 || index === centerIndex + 1
              ? 'h-[130px] sm:h-[180px] md:h-[240px] w-[85px] sm:w-[120px] md:w-[160px]'
              : 'h-[110px] sm:h-[150px] md:h-[200px] w-[75px] sm:w-[105px] md:w-[140px]'

          return (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-500 mx-auto ${sizeClass}`}
            >
              <img
                src={img}
                className="h-full w-full object-cover"
                alt={`Rotating image ${index + 1}`}
              />
            </div>
          )
        })}
      </div>
    </div>
      
    <div className="px-4 md:px-12 py-4">
  <h2 className="text-2xl font-bold mb-6 text-left text-[#220440]">Postings Near You</h2>

        {/* Mobile: horizontal scroll | Desktop: grid layout */}
        <div className="md:grid md:grid-cols-3 md:gap-6 flex space-x-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="min-w-[250px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto border rounded-xl shadow-sm p-6 bg-white"
            >
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

      <footer className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 md:px-12 border-t border-gray-200">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <img src="./image.png" alt="CivicSphere Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-2" />
                    <h1 className="text-xl sm:text-2xl font-bold">
                      <span className="text-black">Civic</span>
                      <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">Sphere</span>
                    </h1>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                  <a href="#" className="text-sm text-[#220440]">Learn more</a>
                </div>
      
                <div className="mt-4 sm:mt-0">
                  <h3 className="text-[#220440] uppercase text-xs font-medium mb-4">Navigation</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#">Home</a></li>
                    <li><a href="#" onClick={() => navigate("/needahand")}>Post Request</a></li>
                    <li><a href="#" onClick={() => navigate("/workermessage")}>Chat</a></li>
                    <li><a href="#" onClick={() => navigate("/workerjobs")}>My Jobs</a></li>
                  </ul>
                </div>
      
                <div className="mt-4 md:mt-0">
                  <h3 className="text-[#220440] uppercase text-xs font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    <a href="#"><Facebook size={20} className="text-gray-700" /></a>
                    <a href="#"><Twitter size={20} className="text-gray-700" /></a>
                    <a href="#"><Instagram size={20} className="text-gray-700" /></a>
                  </div>
                </div>
      
                <div className="mt-4 md:mt-0">
                    <h3 className="text-[#220440] uppercase text-xs mb-4 font-bold">Get Our App</h3>
                    <div className="flex-col md:flex-row block">
                      <a href="#" className="block w-full md:w-48">
                        <div className="rounded-lg bg-black text-white flex items-center gap-3 py-2 px-4 hover:bg-gray-800 transition mb-2">
                          <img src="./google-play.png" alt="Google Play" className="w-10 h-10 md:w-12 md:h-12" />
                          <div>
                            <span className="text-[10px] md:text-xs block">Get it on</span>
                            <span className="text-sm md:text-base font-semibold">Google Play</span>
                          </div>
                        </div>
                      </a>
      
                      <a href="#" className="block w-full md:w-48">
                        <div className="rounded-lg bg-black text-white flex items-center gap-3 py-2 px-4 hover:bg-gray-800 transition">
                          <img src="./app-store.png" alt="App Store" className="w-10 h-10 md:w-12 md:h-12 sm:h-5 sm:w-5" />
                          <div>
                            <span className="text-[10px] md:text-xs block">Download on</span>
                            <span className="text-sm md:text-base font-semibold">App Store</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
      
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} CivicSphere. All rights reserved.</p>
              </div>
            </footer>
    </div>
  );
};

export default WorkerHomePage;