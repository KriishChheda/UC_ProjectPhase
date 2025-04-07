import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, User, ChevronDown, Send, Paperclip, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CivicSphereWorkerMessaging = () => {
  const [message, setMessage] = useState('');
  const [activeClient, setActiveClient] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Username 1', 
      requestType: 'Plumbing', 
      avatar: 'bg-purple-300',
      messages: [
        { id: 1, text: 'Hi there! I have a leaky faucet issue. Can you help?', time: '5 min', isWorker: false },
        { id: 2, text: 'Do you have availability this Thursday afternoon?', time: '4 min', isWorker: false }
      ]
    },
    { 
      id: 2, 
      name: 'Username 2', 
      requestType: 'Electrical', 
      avatar: 'bg-purple-300',
      messages: [
        { id: 1, text: 'I need help rewiring my old home. Are you available?', time: '5 min', isWorker: false },
        { id: 2, text: 'Should I get a quote for the full house or just specific rooms?', time: '4 min', isWorker: false }
      ]
    },
    { 
      id: 3, 
      name: 'Username 3', 
      requestType: 'Carpentry', 
      avatar: 'bg-purple-300',
      messages: [
        { id: 1, text: 'I would like to request some custom cabinets for my kitchen.', time: '5 min', isWorker: false },
        { id: 2, text: 'Would you recommend oak or maple wood for the finish?', time: '4 min', isWorker: false }
      ]
    }
  ]);

  // Check screen size to set sidebar visibility on initial load and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // If activeClient is null, set the first client as active by default
  useEffect(() => {
    if (!activeClient && clients.length > 0) {
      setActiveClient(clients[0]);
    }
  }, [activeClient, clients]);

  const handleClientClick = (client) => {
    setActiveClient(client);
    // On mobile, hide the sidebar after selecting a client
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && activeClient) {
      const updatedClients = clients.map(client => {
        if (client.id === activeClient.id) {
          return {
            ...client,
            messages: [
              ...client.messages,
              { 
                id: client.messages.length + 1, 
                text: message, 
                time: 'Just now',
                isWorker: true
              }
            ]
          };
        }
        return client;
      });
      
      setClients(updatedClients);
      setActiveClient(updatedClients.find(c => c.id === activeClient.id));
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Mobile Menu Overlay - Keep original */}
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
            <a href="#" onClick={() => { navigate("/workermessage"); setIsMobileMenuOpen(false); }} className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">Chat</a>
            <a href="#" onClick={() => { navigate("/workerjobs"); setIsMobileMenuOpen(false); }} className="block py-2 text-lg font-medium text-gray-700 hover:text-[#220440]">My Jobs</a>
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

      {/* Original Header - Keep as is */}
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

      {/* Improved Responsive Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Toggle button for sidebar on mobile */}
        {!showSidebar && activeClient && (
          <button 
            onClick={toggleSidebar}
            className="absolute top-2 left-2 z-10 p-2 bg-gray-200 rounded-full md:hidden"
          >
            <MessageCircle size={20} className="text-gray-500" />
          </button>
        )}

        {/* Messages Sidebar - Improved responsive behavior */}
        <div 
          className={`${
            showSidebar ? 'block' : 'hidden'
          } w-full md:w-96 border-r bg-gray-50 flex-shrink-0 z-20`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold text-[#220440]">Messages</h2>
            <button 
              onClick={toggleSidebar}
              className="p-1 md:hidden"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="overflow-y-auto h-full pb-16">
            {clients.map((client) => (
              <div 
                key={client.id} 
                className={`flex items-start p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${activeClient && activeClient.id === client.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleClientClick(client)}
              >
                <div className={`w-10 h-10 mr-3 ${client.avatar} rounded-full flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">{client.name}</h3>
                    <span className="text-xs text-gray-500">
                      {client.messages.length > 0 ? client.messages[client.messages.length - 1].time : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {client.messages.length > 0 ? client.messages[client.messages.length - 1].text : ''}
                  </p>
                  <p className="text-xs text-gray-500">{client.requestType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area - Improved responsive view */}
        {activeClient && (
          <div className={`flex flex-col flex-1 ${showSidebar ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b">
              <div className={`w-10 h-10 mr-3 ${activeClient.avatar} rounded-full`}></div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#220440]">{activeClient.name}</h2>
                <span className="text-sm text-gray-500">{activeClient.requestType}</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {activeClient.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isWorker ? 'justify-end' : 'justify-start'} mb-3`}>
                  <div 
                    className={`max-w-xs sm:max-w-md p-4 rounded-lg ${
                      msg.isWorker ? 'bg-gray-300' : 'bg-gray-200'
                    }`}
                  >
                    <p className="text-gray-800">{msg.text}</p>
                    <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4">
              <div className="flex items-center p-2 bg-gray-200 rounded-full">
                <button className="p-2 text-purple-800">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message..."
                  className="flex-1 px-4 py-2 bg-transparent outline-none"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full ${message.trim() ? 'text-purple-800' : 'text-gray-400'}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Empty state when no client is selected */}
        {!activeClient && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-700">No conversation selected</h3>
              <p className="text-gray-500 mt-2">Select a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CivicSphereWorkerMessaging;