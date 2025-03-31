import React, { useState } from 'react';
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#EA4335"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#1877F2"
      d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#000000"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('hire'); // used to decide if the user is logining or the worker

  const toggleForm = (type) => {
    setIsSignIn(type === 'signin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen md:px-44 bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full h-full flex items-center justify-center">
              <img src="./image10.png" alt="Characters illustration" className="max-w-full max-h-full" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-8">LOGIN TO CONTINUE</h2>

            <div className="space-y-3 mb-6">
              <button className="w-full py-2 px-4 border border-black rounded-full flex items-center justify-evenly">
                <span className="mr-2"><GoogleIcon /></span>
                <span>Continue With Google</span>
              </button>
              <button className="w-full py-2 px-4 border border-black rounded-full flex items-center justify-evenly">
                <span className="mr-2"><FacebookIcon /></span>
                <span>Continue With Facebook</span>
              </button>
              <button className="w-full py-2 px-4 border border-black rounded-full flex items-center justify-evenly">
                <span className="mr-2"><XIcon /></span>
                <span>Continue With X</span>
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-black"></div>
              <span className="mx-4 text-black">OR</span>
              <div className="flex-grow border-t border-black"></div>
            </div>

            <div className="flex mb-6">
              <button 
                className={`flex-1 py-2 px-4 rounded-l-[17px] ${!isSignIn ? 'bg-[#79698899] text-white' : 'bg-[#79698899]  text-white'}`}
                onClick={() => toggleForm('signup')}
              >
                Sign up
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-r-[17px] ${isSignIn ? 'bg-[#220440] text-white' : 'bg-[#220440]  text-white'}`}
                onClick={() => toggleForm('signin')}
              >
                Sign in
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full px-4 py-2 bg-gray-100 rounded-[17px]"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-2 bg-gray-100 rounded-[17px]"
              />
              
              {!isSignIn && (
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg"
                />
              )}
              
              {isSignIn && (
                <div className="text-right">
                  <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
                </div>
              )}
              
              {!isSignIn && (
                <div className="flex space-x-6 mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="userType"
                      checked={userType === 'hire'}
                      onChange={() => setUserType('hire')}
                      className="form-radio h-4 w-4 text-[#220440]"
                    />
                    <span>Hire</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="userType"
                      checked={userType === 'work'}
                      onChange={() => setUserType('work')}
                      className="form-radio h-4 w-4 text-[#220440]"
                    />
                    <span>Work</span>
                  </label>
                </div>
              )}
            </div>

            <button className="w-full py-3 px-4 bg-[#220440] text-white rounded-[17px]">
              {isSignIn ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;