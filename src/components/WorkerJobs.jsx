import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, User } from "lucide-react";

const WorkerJobs = () => {
  // State for job listings and selected job
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate=useNavigate();
  const [myJobs, setMyJobs] = useState([
    { 
      id: 1, 
      title: 'Fix my sink', 
      location: 'Downtown', 
      status: 'open', 
      timeframe: 'ASAP',
      offers: 3
    },
    { 
      id: 2, 
      title: 'Fix my sink', 
      location: 'Downtown', 
      status: 'ongoing', 
      timeframe: '2 hrs',
      offers: 0
    }
  ]);
  // myJobs is an array of objects where each object is one job requested by the user.
  // State for service providers
  // on the left side we have the jobs requested by the user , on the right side we have all the workers who are interested in the jobs
  const [serviceProviders, setServiceProviders] = useState([
    {
      id: 1,
      name: 'Lorem Ipsum',
      profession: 'Plumber',
      rating: 3,
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      profession: 'Plumber',
      rating: 3,
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Lorem Ipsum',
      profession: 'Plumber',
      rating: 3,
      image: '/api/placeholder/100/100'
    }
  ]);
  // serviceProviders are the array of objects where each object is one worker who is willing to work
  // Handle job selection
  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

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

  return (
<div className="flex flex-col h-screen bg-white">

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
      <div className="flex flex-1 overflow-hidden">
        <div className="w-96  bg-gray-100">
          <h2 className="p-4 text-2xl font-bold text-[#220440]">My Jobs</h2>
          <div className="overflow-y-auto">
            {myJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-4 m-4 bg-white rounded-lg shadow cursor-pointer"
                onClick={() => handleJobSelect(job)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  {job.offers > 0 && (
                    <span className="px-3 py-1 text-xs text-white bg-green-500 rounded-full">
                      {job.offers} offers!
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 mr-2 rounded-full ${job.status === 'open' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className="text-sm capitalize">{job.status}</span>
                  </div>
                  <div className="flex items-center ml-6">
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center ml-6">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{job.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Area - Job Details */}
        <div className="flex flex-col flex-1 p-6">
          
        </div>
      </div>
    </div>
  );
};

export default WorkerJobs;