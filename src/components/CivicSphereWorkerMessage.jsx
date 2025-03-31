import React, { useState } from 'react';
import { Search, MessageCircle, User, ChevronDown } from 'lucide-react';

const CivicSphereWorkerMessaging = () => {
  const [message, setMessage] = useState('');
  const [activeClient, setActiveClient] = useState(null);
  
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

  // If activeClient is null, set the first client as active by default
  if (!activeClient && clients.length > 0) {
    setActiveClient(clients[0]);
  }

  const handleClientClick = (client) => {
    setActiveClient(client);
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
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
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
        
        <div className="flex items-center mt-[61px]">
          <div className="flex items-center text-gray-700 font-medium ml-[30px] w-[189px]">
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
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-gray-200 ml-[10px]">
              <MessageCircle size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-200">
              <User size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 border-r bg-gray-50">
          <h2 className="p-4 text-2xl font-bold text-[#220440]">Messages</h2>
          <div className="overflow-y-auto">
            {clients.map((client) => (
              <div 
                key={client.id} 
                className={`flex items-start p-4 border border-gray-200 hover:bg-gray-100 cursor-pointer ${activeClient && activeClient.id === client.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleClientClick(client)}
              >
                <div className={`w-10 h-10 mr-3 ${client.avatar} rounded-full`}></div>
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

        {activeClient && (
          <div className="flex flex-col flex-1">
            <div className="flex items-center p-4">
              <div className={`w-10 h-10 mr-3 ${activeClient.avatar} rounded-full`}></div>
              <h2 className="text-lg font-semibold text-[#220440]">{activeClient.name}</h2>
              <span className="ml-2 text-sm text-gray-500">{activeClient.requestType}</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {activeClient.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isWorker ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 my-2 rounded-lg ${msg.isWorker ? 'bg-gray-300' : 'bg-gray-200'}`}>
                    <p className="text-gray-800">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CivicSphereWorkerMessaging;