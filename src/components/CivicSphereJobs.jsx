import React, { useState } from 'react';

const CivicSphereJobs = () => {
  // State for job listings and selected job
  const [selectedJob, setSelectedJob] = useState(null);
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

  // State for service providers
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

  // Handle job selection
  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  // Render star ratings
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

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/40/40" alt="Logo" className="h-10" />
            <h1 className="ml-2 text-2xl font-bold">Civic<span className="text-purple-800">Sphere</span></h1>
          </div>
          <div className="relative ml-16">
            <button className="flex items-center px-4 py-2 text-lg font-semibold">
              Home
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative mx-4">
            <input
              type="text"
              placeholder=""
              className="w-64 px-4 py-2 bg-gray-200 rounded-full"
            />
            <svg className="absolute w-5 h-5 right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="p-2 mx-2">
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - My Jobs */}
        <div className="w-96 border-r border-gray-200">
          <h2 className="p-4 text-2xl font-bold text-purple-900">My Jobs</h2>
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
          <h2 className="text-2xl font-bold mb-4">Fix My Sink</h2>
          
          <div className="flex mb-4">
            <div className="flex items-center mr-8">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">17:00 | 27 Feb 2025</span>
            </div>
          </div>
          
          {/* Service Providers */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {serviceProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-36 bg-yellow-100 flex items-center justify-center">
                  <img src={provider.image} alt={provider.name} className="h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-center font-medium mb-1">{provider.name}</h3>
                  <p className="text-center text-sm text-gray-600 mb-2">{provider.profession}</p>
                  <div className="flex justify-center mb-3">
                    {renderStars(provider.rating)}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button className="px-4 py-1 text-sm border border-gray-300 rounded">Chat</button>
                    <button className="px-4 py-1 text-sm text-white bg-purple-800 rounded">Hire Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CivicSphereJobs;