import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Search,
  MessageCircle,
  User,
  Menu,
  X,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import API from "../api";

const CivicSphereJobs = () => {
  // State for job listings and selected job
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJobSidebarOpen, setIsJobSidebarOpen] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);
  const { logout } = useAuthStore();
  const [myJobs, setMyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // State for filtering jobs by status
  const [activeTab, setActiveTab] = useState("pending");

  // State for service providers (will be populated from offers)
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // State for tracking when a job is being assigned
  const [isAssigning, setIsAssigning] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/usersignuplogin");
  };

  // Replace the current useEffect for fetching jobs with this:
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/jobs/");
        const jobsData = response.data;

        // Fetch offers for each job
        const jobsWithOffers = await Promise.all(
          jobsData.map(async (job) => {
            try {
              const offersRes = await API.get(`/jobs/${job.job_id}/offers/`);
              return {
                ...job,
                offersCount: offersRes.data.length,
                offers: offersRes.data,
              };
            } catch (error) {
              console.error(
                `Failed to fetch offers for job ${job.job_id}:`,
                error
              );
              return {
                ...job,
                offersCount: 0,
                offers: [],
              };
            }
          })
        );

        setMyJobs(jobsWithOffers);

        // Select the first pending job by default if available
        const pendingJobs = jobsWithOffers.filter(job => job.status === 'open');
        if (pendingJobs.length > 0) {
          const firstJob = pendingJobs[0];
          setSelectedJob(firstJob);
          setServiceProviders(transformOffersToProviders(firstJob.offers));
        } else if (jobsWithOffers.length > 0) {
          // If no pending jobs, select the first job
          setSelectedJob(jobsWithOffers[0]);
          setServiceProviders(transformOffersToProviders(jobsWithOffers[0].offers));
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Add this helper function
  const transformOffersToProviders = (offers) => {
    return offers.map((offer) => ({
      id: offer.id,
      worker_id: offer.worker, // Make sure to get worker ID for hiring
      name: offer.worker_name,
      profession: "Service Provider",
      rating: 3,
      image: "/api/placeholder/100/100",
      message: offer.message,
      proposedAmount: offer.proposed_amount,
    }));
  };

  // Then modify the handleJobSelect function to use the cached offers
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setServiceProviders(transformOffersToProviders(job.offers || []));

    if (window.innerWidth < 768) {
      setIsJobSidebarOpen(false);
    }
  };

  // New function to handle hiring a worker
  const handleHireWorker = async (workerId, jobId) => {
    if (isAssigning) return; // Prevent multiple clicks
    
    try {
      setIsAssigning(true);
      
      // Call the API to accept the job
      const response = await API.put(`/jobs/${jobId}/accept/`, {
        worker_id: workerId
      });
      
      // Update the job status locally
      const updatedJobs = myJobs.map(job => {
        if (job.job_id === jobId) {
          return { ...job, status: 'assigned' };
        }
        return job;
      });
      
      setMyJobs(updatedJobs);
      setSelectedJob(prev => ({ ...prev, status: 'assigned' }));
      
      // Show success message
      alert("Worker hired successfully!");
      
    } catch (error) {
      console.error("Failed to hire worker:", error);
      alert("Failed to hire worker. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 md:w-5 md:h-5 ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
    };

    // Close mobile menus when resizing to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        // On desktop, always show job sidebar
        setIsJobSidebarOpen(true);
      } else {
        // On mobile, hide job sidebar by default
        setIsJobSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} | ${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  // Filter jobs by status (pending = 'open', assigned = 'assigned')
  const filteredJobs = myJobs.filter(job => 
    activeTab === "pending" ? job.status === "open" : job.status === "assigned"
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img
                src="./image.png"
                alt="CivicSphere Logo"
                className="w-12 h-12"
              />
              <h1 className="text-xl font-bold ml-2">
                <span className="text-black">Civic</span>
                <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                  Sphere
                </span>
              </h1>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:bg-gray-100 p-2 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-4">
            <a
              href="#"
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => {
                navigate("/needahand");
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
            >
              Post Request
            </a>
            <a
              href="#"
              onClick={() => {
                navigate("/usermessage");
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
            >
              Chat
            </a>
            <a
              href="#"
              onClick={() => {
                navigate("/userjobs");
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
            >
              My Jobs
            </a>
            <a
              href="#"
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
            >
              Settings
            </a>
            <a
              href="#"
              className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
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

      {/* Header */}
      <header className="py-4 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between relative border-b border-gray-200">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center">
            <div className="mr-2">
              <img
                src="./image.png"
                alt="CivicSphere Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-black">Civic</span>
              <span className="bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D] bg-clip-text text-transparent">
                Sphere
              </span>
            </h1>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} className="text-gray-700" />
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
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => navigate("/usermessage")}
            >
              <MessageCircle size={20} className="text-gray-500" />
            </button>
            <button
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User size={20} className="text-gray-500" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-4 top-16 md:top-auto md:mt-8 w-44 bg-white shadow-lg rounded-lg p-2 border border-gray-200 transition-all duration-200 z-40">
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => navigate("/userprofile")}
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => navigate("/userjobs")}
                >
                  My Jobs
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - On mobile: toggle with button, On desktop: always visible */}
        <div
          className={`${
            isJobSidebarOpen ? "block" : "hidden"
          } md:block fixed md:static inset-0 z-20 md:z-0 overflow-y-auto w-full md:w-64 lg:w-96 bg-gray-100 md:max-h-[calc(100vh-115px)]`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#220440]">
              My Jobs
            </h2>
            <button
              className="md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsJobSidebarOpen(false)}
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Status tabs */}
          <div className="flex border-b border-gray-200 px-4">
            <button
              className={`py-2 px-4 mr-2 ${
                activeTab === "pending"
                  ? "border-b-2 border-[#220440] text-[#220440] font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "assigned"
                  ? "border-b-2 border-[#220440] text-[#220440] font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("assigned")}
            >
              Assigned
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-170px)]">
            {isLoading ? (
              <div className="p-4 text-center">Loading jobs...</div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.job_id}
                  className={`p-3 md:p-4 m-2 md:m-4 bg-white rounded-lg shadow cursor-pointer transition-all duration-200 ${
                    selectedJob && selectedJob.job_id === job.job_id
                      ? "border-2 border-[#220440]"
                      : ""
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base md:text-lg font-medium">
                      {job.title}
                    </h3>
                    {/* We'll calculate offers when job is selected */}
                    {job.status === 'open' && job.offersCount > 0 && (
                      <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-full">
                        {job.offersCount} offers!
                      </span>
                    )}
                    {job.status === 'assigned' && (
                      <span className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full">
                        Assigned
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-y-1 gap-x-4">
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 md:w-3 md:h-3 mr-1 md:mr-2 rounded-full ${
                          job.status === "open"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      <span className="text-xs md:text-sm capitalize">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 mr-1 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs md:text-sm">Local Area</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs md:text-sm">
                        {job.time_preference}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                {activeTab === "pending" 
                  ? "No pending jobs found. Post a new job to get started!" 
                  : "No assigned jobs found."}
              </div>
            )}
          </div>
        </div>

        {/* Overlay for mobile job sidebar */}
        {isJobSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsJobSidebarOpen(false)}
          ></div>
        )}

        {/* Main Area - Job Details */}
        <div className="flex flex-col flex-1 p-3 md:p-6 overflow-y-auto">
          {/* Mobile toggle for jobs list */}
          <button
            className="md:hidden mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center w-full"
            onClick={() => setIsJobSidebarOpen(!isJobSidebarOpen)}
          >
            {isJobSidebarOpen ? "Hide Jobs" : "Show Jobs"}
          </button>

          {selectedJob ? (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {selectedJob.title}
              </h2>

              <div className="flex flex-col sm:flex-row gap-y-2 mb-4">
                <div className="flex items-center sm:mr-8">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs md:text-sm text-gray-600">
                    {selectedJob.category}
                  </span>
                </div>

                <div className="flex items-center sm:mr-8">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs md:text-sm text-gray-600">
                    {formatDate(selectedJob.created_at)}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs md:text-sm text-gray-600">
                    ₹{selectedJob.amount}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-700">
                  {selectedJob.description}
                </p>
              </div>

              {/* Service Providers / Offers */}
              {selectedJob.status === 'open' ? (
                serviceProviders.length > 0 ? (
                  <>
                    <h3 className="text-lg font-medium mb-4">
                      Service Provider Offers
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {serviceProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center border-t border-l border-r rounded-t-lg overflow-hidden">
                            <img
                              src="./image7.png"
                              alt={provider.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-3 md:p-4 border-b border-l border-r rounded-b-lg">
                            <h3 className="text-center font-medium text-sm md:text-base mb-1">
                              {provider.name}
                            </h3>
                            <p className="text-center text-xs md:text-sm text-gray-600 mb-2">
                              {provider.profession}
                            </p>
                            <div className="flex justify-center mb-2 md:mb-3">
                              {renderStars(provider.rating)}
                            </div>
                            <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                              {provider.message}
                            </p>
                            <p className="text-sm font-medium text-center mb-3">
                              Offer: ₹{provider.proposedAmount}
                            </p>
                            <div className="flex justify-between mt-2 md:mt-4">
                              <button className="px-3 py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200 flex-1 mr-2 text-center">
                                Chat
                              </button>
                              <button 
                                className={`px-3 py-1 text-xs md:text-sm text-white bg-[#220440] hover:bg-[#39096b] transition-colors duration-200 rounded flex-1 ml-2 text-center ${isAssigning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleHireWorker(provider.worker_id, selectedJob.job_id)}
                                disabled={isAssigning}
                              >
                                {isAssigning ? 'Hiring...' : 'Hire Now'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      No offers yet for this job
                    </p>
                    <p className="text-sm text-gray-500">
                      Service providers will submit their offers soon
                    </p>
                  </div>
                )
              ) : (
                // Show assigned worker info
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-blue-600">
                    Job Assigned
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    This job has been assigned to a service provider. You can contact them through the chat system.
                  </p>
                  <button 
                    className="px-4 py-2 text-sm text-white bg-[#220440] hover:bg-[#39096b] transition-colors duration-200 rounded"
                    onClick={() => navigate("/usermessage")}
                  >
                    Go to Chat
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl text-gray-500 mb-4">
                Select a job to view details
              </p>
              {myJobs.length === 0 && !isLoading && (
  <button
    className="px-4 py-2 bg-[#220440] text-white rounded-lg"
    onClick={() => navigate("/needahand")}
  >
    Post a New Job
  </button>
)}
 </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CivicSphereJobs;