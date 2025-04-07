import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, MessageCircle, User, Mail, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Alexa Rawles',
    nickName: '',
    email: 'alexarawles@gmail.com',
    gender: '',
    country: '',
    language: '',
    profilePicture: './image8.png',
    lastUpdated: '1 month ago'
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here We will save data to backend
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };
  
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
      {/* Header Section */}
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
                      <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/userprofile")}>Profile</a>
                      <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => navigate("/userjobs")}>My Jobs</a>
                      <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Settings</a>
                      <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Logout</a>
                    </div>
                  )}
                </div>
              </div>
            </header>
      
      {/* Gradient Banner */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D]"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start">
          <div className="flex flex-col sm:flex-row items-center mr-6 w-full sm:w-auto">
            <div className="relative mb-4 sm:mb-0">
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-1 border-gray-100"
              />
            </div>
            <div className="text-center sm:text-left sm:ml-[10px]">
              <h2 className="text-lg sm:text-xl font-semibold">{profileData.fullName}</h2>
              <p className="text-gray-500 text-sm">{profileData.email}</p>
            </div>
          </div>
          <div className="w-full sm:w-auto sm:ml-auto mt-4">
            <button
              onClick={toggleEditMode}
              className="w-full sm:w-auto bg-blue-500 text-white rounded-[8px] px-6 py-2 font-medium hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        </div>
        
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 text-left">Full Name</label>
              <input
                type="text"
                value={isEditing ? profileData.fullName : "Your First Name"}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-left">Nick Name</label>
              <input
                type="text"
                value={isEditing ? profileData.nickName : "Your First Name"}
                onChange={(e) => handleInputChange('nickName', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-left">Gender</label>
              <div className="relative">
                <select
                  value={profileData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Your First Name</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-left">Country</label>
              <div className="relative">
                <select
                  value={profileData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Your First Name</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="India">India</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-left">Language</label>
              <div className="relative">
                <select
                  value={profileData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Your First Name</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
          
          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-left">My Email Address</h3>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Mail size={20} className="text-blue-500" />
              </div>
              <div className='text-left'>
                <p className="text-gray-800">{profileData.email}</p>
                <p className="text-sm text-gray-500">{profileData.lastUpdated}</p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center text-blue-500 font-medium bg-blue-100 p-2 rounded-[7.5px]"
            >
              <Plus size={16} className="mr-1" />
              Add Email Address
            </button>
          </div>
          
          {/* Save Button */}
          {isEditing && (
            <div className="mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-500 text-white rounded px-6 py-2 font-medium hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;