import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Search, MessageCircle, User, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react';
import CivicSphereJobs from './CivicSphereJobs';
import API from '../api';

const CivicSphereHomepage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuthStore();
  const [hiredWorkers, setHiredWorkers] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [rotatedImages, setRotatedImages] = useState([
    './image1.png',
    './image2.png',
    './image3.png',
    './image4.png',
    './image5.png'
  ]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated, loading]);

  if (shouldRedirect) {
    <Navigate to="/usersignuplogin" replace />;
  }

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
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(3);
      else if (width < 768) setVisibleCount(3);
      else if (width < 1024) setVisibleCount(4);
      else setVisibleCount(5);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    const fetchAssignedJobs = async () => {
      try {
        const response = await API.get('/jobs/');
        const assigned = response.data.filter(job => job.status === 'assigned' && job.worker);
  
        const formatted = assigned.map(job => ({
          jobTitle: job.title,
          name: job.worker.user.name || "Worker", // Adjust depending on worker serializer
          profession: job.worker.skills || "Service Provider", // Adjust if you store profession separately
          rating: job.worker.average_rating || 4,
          image: job.worker.user.profile_pic || "./default-avatar.png"
        }));
  
        setHiredWorkers(formatted);
      } catch (err) {
        console.error("Failed to fetch hired workers:", err);
      }
    };
  
    fetchAssignedJobs();
  }, []);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate('/usersignuplogin'), 0);
  };


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
            <a href="#" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLogout(); }}
                
              >
                Logout
            </a>
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
            <div className='text-gray-700 font-medium w-auto'>Hello, {user?.name} </div>
            <button className="p-2 rounded-full bg-gray-200" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User size={20} className="text-gray-500" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-1 mt-40 w-44 bg-white shadow-lg rounded-lg p-2 border border-gray-200 transform translate-y-16 md:translate-y-2 transition-all duration-200 z-40">
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/userprofile")}>Profile</a>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/userjobs")}>My Jobs</a>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Settings</a>
                <a href="#" 
                    onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleLogout(); }}
                    
                    className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
                  >
                    Logout
                </a>
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


      <div className="py-8 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#220440] mb-2">Need a Hand?</h2>
            <p className="text-gray-700 mb-6">Let us find you a skilled worker. <br /> Post a request now!</p>
            <button className="bg-[#220440] text-white font-medium py-2 rounded-[14px] h-[45px] sm:h-[55px] w-[140px] sm:w-[174px]" onClick={() => navigate("/needahand")}>POST NOW</button>
          </div>
          <div className="w-48 sm:w-56 md:w-64">
            <img src="./image6.png" alt="Person peeking" className="w-full" />
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-10 px-4 sm:px-6 md:px-12">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-bold text-[#220440] mb-4 sm:mb-5">Hire Again</h2>
    
    {hiredWorkers.length > 0 ? (
      <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {hiredWorkers.map((worker, index) => (
          <div key={index} className="min-w-[230px] sm:min-w-[270px] flex-shrink-0 border border-black rounded-xl shadow-md p-4">
            <div className="flex space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden">
                <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium">{worker.name}</p>
                <p className="text-gray-500 text-sm">{worker.profession}</p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= worker.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 py-8">
        <p className="text-lg font-medium">No workers hired yet</p>
        <p className="text-sm text-gray-400">Your hired workers will appear here after assigning them to a job.</p>
      </div>
    )}
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
              <li><a href="#" onClick={() => navigate("/usermessage")}>Chat</a></li>
              <li><a href="#" onClick={() => navigate("/userjobs")}>My Jobs</a></li>
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

export default CivicSphereHomepage;