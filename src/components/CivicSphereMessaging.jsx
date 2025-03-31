// User Chats
import React, { useState } from 'react';
import { Search, MessageCircle, User, ChevronDown } from 'lucide-react';

const CivicSphereMessaging = () => {
  const [message, setMessage] = useState('');
  const [activeContact, setActiveContact] = useState(null);
  
  const [contacts, setContacts] = useState([
    { 
      id: 1, 
      name: 'Steve', 
      profession: 'Plumber', 
      avatar: 'bg-gray-400',
      messages: [
        { id: 1, text: 'Hi there! I can help with your leaky faucet issue.', time: '5 min', isUser: false },
        { id: 2, text: 'I have availability this Thursday afternoon.', time: '4 min', isUser: false }
      ]
    },
    { 
      id: 2, 
      name: 'Sarah', 
      profession: 'Electrician', 
      avatar: 'bg-purple-300',
      messages: [
        { id: 1, text: 'I specialize in rewiring old homes. What can I help with?', time: '20 min', isUser: false },
        { id: 2, text: 'Do you need a quote for the full house or just specific rooms?', time: '18 min', isUser: false }
      ]
    },
    { 
      id: 3, 
      name: 'Mike', 
      profession: 'Carpenter', 
      avatar: 'bg-blue-300',
      messages: [
        { id: 1, text: 'I received your request about the custom cabinets.', time: '1 hr', isUser: false },
        { id: 2, text: 'Would you prefer oak or maple wood for the finish?', time: '55 min', isUser: false }
      ]
    },
    { 
      id: 4, 
      name: 'Lisa', 
      profession: 'Landscaper', 
      avatar: 'bg-green-300',
      messages: [
        { id: 1, text: 'Your garden design project sounds interesting!', time: '2 hrs', isUser: false },
        { id: 2, text: 'I have some native plant suggestions that would work well.', time: '1.5 hrs', isUser: false }
      ]
    }
  ]);
// contacts is an array of object where each object is a person . The person has an id , a name , a profession , an avatar and a message
// avatar is the profile pocture of the user
  if (!activeContact && contacts.length > 0) {
    setActiveContact(contacts[0]);
  }
// if actieContact is null means we havent clicked on any contact explicitely yet then we show the chats of the first contact by default
  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const handleSendMessage = () => {
    if (message.trim() && activeContact) {
      const updatedContacts = contacts.map(contact => {
        if (contact.id === activeContact.id) {
          return {
            ...contact,
            messages: [
              ...contact.messages,
              { 
                id: contact.messages.length + 1, 
                text: message, 
                time: 'Just now',
                isUser: true
              }
            ]
          };
        }
        return contact;
      });
      
      setContacts(updatedContacts);
      setActiveContact(updatedContacts.find(c => c.id === activeContact.id));
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


      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 border-r bg-gray-50 ">
          <h2 className="p-4 text-2xl font-bold text-[#220440]">Messages</h2>
          <div className="overflow-y-auto">
            {/* one by one every single object from contacts array of object will be initialised to contact  */}
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`flex items-start p-4 border border-gray-200 hover:bg-gray-100 cursor-pointer ${activeContact && activeContact.id === contact.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className={`w-10 h-10 mr-3 ${contact.avatar} rounded-full`}></div> 
                {/* each avatar is a 10x10 box rounded fully */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">{contact.name} | {contact.profession}</h3>
                    <span className="text-xs text-gray-500">
                      {contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].time : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].text : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeContact && (
          <div className="flex flex-col flex-1">
            <div className="flex items-center p-4">
              <div className={`w-10 h-10 mr-3 ${activeContact.avatar} rounded-full`}></div>
              <h2 className="text-lg font-semibold text-[#220440]">{activeContact.name} | {activeContact.profession}</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {activeContact.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 my-2 rounded-lg ${msg.isUser ? 'bg-gray-300' : 'bg-gray-200'}`}>
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

export default CivicSphereMessaging;