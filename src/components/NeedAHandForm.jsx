import React, { useState } from 'react';

const NeedAHandForm = () => {
  const [formData, setFormData] = useState({
    helpNeeded: '',
    category: '',
    description: '',
    timePreference: 'Now',
    photos: []
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.helpNeeded.trim()) newErrors.helpNeeded = 'This field is required';
    if (!formData.category) newErrors.category = 'This field is required';
    if (!formData.description.trim()) newErrors.description = 'This field is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form has been successfully submitted!');
      console.log(formData);
      setFormData({ helpNeeded: '', category: '', description: '', timePreference: 'Now', photos: [] });
    }
  };

  return (
    <div className="p-8 md:px-44 border border-black w-full rounded-[20px]">
      <h1 className="text-[#220440] text-5xl mb-12 text-center">Need a Hand?</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-normal text-center md:px-44">
            What do you need help with? <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="helpNeeded"
            value={formData.helpNeeded}
            onChange={handleChange}
            placeholder='Example: "Fix my sink"' 
            className={`w-full p-3 bg-gray-100 rounded-[17px] text-gray-600 ${errors.helpNeeded ? 'border border-red-500' : ''}`}
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-normal text-center">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-100 rounded-[17px] appearance-none ${errors.category ? 'border border-red-500' : ''}`}
            >
              <option value="" disabled>Select a category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-lg font-normal">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Example: "Sink is leaking under the cabinet, need help ASAP."'
            className={`w-full p-3 bg-gray-100 rounded-[17px] min-h-32 text-gray-600 ${errors.description ? 'border border-red-500' : ''}`}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="flex items-center mb-2 text-lg font-medium">
            Photos
            <input 
              type="file" 
              multiple
              className="hidden" 
              id="fileInput"
              onChange={handleFileChange} 
            />
            <svg onClick={() => document.getElementById('fileInput').click()} className="w-5 h-5 ml-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </label>
        </div>
        
        <div className="mb-10">
          <label className="block mb-2 text-lg font-normal text-[#220440] text-left">When do you need it?</label>
          <div className="flex bg-gray-200 w-fit rounded-full">
            <button 
              type="button"
              onClick={() => setFormData({ ...formData, timePreference: 'Now' })}
              className={`px-8 py-2 rounded-full ${formData.timePreference === 'Now' ? 'bg-gray-300' : 'text-gray-700'}`}
            >
              Now
            </button>
            <button 
              type="button"
              onClick={() => setFormData({ ...formData, timePreference: 'Later' })}
              className={`px-8 py-2 rounded-full ${formData.timePreference === 'Later' ? 'bg-gray-300' : 'text-gray-700'}`}
            >
              Later
            </button>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <button type="submit" className="w-full bg-[#220440] text-white rounded-full py-3 font-medium text-lg">
            Post Now!
          </button>
        </div>
      </form>
    </div>
  );
};

export default NeedAHandForm;
