import React, { useState,useEffect } from 'react';
import { ChevronDown, Search, MessageCircle, User, Mail, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate=useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Alexa Rawles',
    nickName: '',
    email: 'alexarawles@gmail.com',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
    profilePicture: './image8.png',
    lastUpdated: '1 month ago'
  });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          
          <div className="mr-2">
                <img src="./image.png" alt="CivicSphere Logo" className="w-[78px] h-[78px] mt-[46px]" />
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
          
          <div className="bg-gray-200 rounded-full px-4 flex items-center w-[460px] h-[55px]">
            <input 
              type="text" 
              className="bg-transparent outline-none w-full" 
              placeholder="" 
            />
            <Search size={20} className="text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-3 user-menu">
            <button className="p-2 rounded-full bg-gray-200  ml-[10px]">
              <MessageCircle size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-200" onClick={()=>{setIsUserMenuOpen(!isUserMenuOpen)}}>
              <User size={20} className="text-gray-500" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-1 mt-2 w-44 bg-white shadow-lg rounded-lg p-2 border border-gray-200 transform translate-y-2 transition-all duration-200">
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={()=>{navigate("/userprofile")}}>Profile</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">My Jobs</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Settings</a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Logout</a>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-24 bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D]"></div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start">
          
          <div className="flex items-center mr-6">
            <div className="relative">
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="w-28 h-28 rounded-full border-1 border-gray-100 "
              />
            </div>
            <div className="mt-2 text-left ml-[10px]">
              <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
              <p className="text-gray-500 text-sm">{profileData.email}</p>
            </div>
          </div>

          <div className="ml-auto mt-4">
            <button 
              onClick={toggleEditMode}
              className="bg-blue-500 text-white rounded-[8px] px-6 py-2 font-medium hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Full Name */}
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
           {/* if editing is allowed disabled is false and vice versa  */}
        
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

            <div>
              <label className="block text-gray-700 mb-2 text-left">Time Zone</label>
              <div className="relative">
                <select
                  value={profileData.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Your First Name</option>
                  <option value="est">Eastern Time (ET)</option>
                  <option value="cst">Central Time (CT)</option>
                  <option value="mst">Mountain Time (MT)</option>
                  <option value="pst">Pacific Time (PT)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

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

          {isEditing && (
            <div className="mt-6">
              <button 
                type="submit"
                className="bg-blue-500 text-white rounded px-6 py-2 font-medium hover:bg-blue-600 transition"
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