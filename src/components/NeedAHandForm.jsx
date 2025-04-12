import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { ImagePlus, ArrowLeft } from 'lucide-react';

const NeedAHandForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    amount: '',
    timePreference: 'Now',
    image: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'This field is required';
    if (!formData.category) newErrors.category = 'This field is required';
    if (!formData.description.trim()) newErrors.description = 'This field is required';
    if (!formData.amount) newErrors.amount = 'This field is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('category', formData.category);
    payload.append('amount', formData.amount);
    payload.append('time_preference', formData.timePreference);
    if (formData.image) payload.append('image', formData.image);

    try {
      const response = await API.post('/jobs/create/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Job posted successfully!');
      console.log(response.data);
      setFormData({ title: '', category: '', description: '', amount: '', timePreference: 'Now', image: null });
    } catch (error) {
      console.error('Job posting failed:', error);
      console.log("❌ Server response:", error.response?.data);
    }
  };

  return (
    <div className="p-8 md:px-44 border border-black w-full rounded-[20px]">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm mb-4 text-[#220440] font-medium">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>
      <h1 className="text-[#220440] text-5xl mb-12 text-center">Need a Hand?</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-normal">What do you need help with? *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Example: "Fix my sink"' className={`w-full p-3 bg-gray-100 rounded-[17px] text-gray-600 ${errors.helpNeeded ? 'border border-red-500' : ''}`} />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-normal">Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} className={`w-full p-3 bg-gray-100 rounded-[17px] ${errors.category ? 'border border-red-500' : ''}`}>
            <option value="" disabled>Select a category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Gardening">Gardening</option>
            <option value="Painting">Painting</option>
            <option value="Shifting/Moving">Shifting/Moving</option>
            <option value="Repair">Repair</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-normal">Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder='Describe the issue...' className={`w-full p-3 bg-gray-100 rounded-[17px] min-h-32 text-gray-600 ${errors.description ? 'border border-red-500' : ''}`} />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-normal">Amount Offered (₹) *</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} className={`w-full p-3 bg-gray-100 rounded-[17px] ${errors.amount ? 'border border-red-500' : ''}`} />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-normal">Upload an Image</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => document.getElementById('imageInput').click()} className="bg-gray-200 p-3 rounded-full hover:bg-gray-300">
              <ImagePlus className="w-5 h-5 text-[#220440]" />
            </button>
            <input id="imageInput" type="file" onChange={handleFileChange} className="hidden" />
            {formData.image && <span className="text-sm text-gray-600">{formData.image.name}</span>}
          </div>
        </div>

        <div className="mb-10">
          <label className="block mb-2 text-lg font-normal text-[#220440]">When do you need it?</label>
          <div className="flex bg-gray-200 w-fit rounded-full">
            <button type="button" onClick={() => setFormData({ ...formData, timePreference: 'Now' })} className={`px-8 py-2 rounded-full ${formData.timePreference === 'Now' ? 'bg-gray-300' : 'text-gray-700'}`}>Now</button>
            <button type="button" onClick={() => setFormData({ ...formData, timePreference: 'Later' })} className={`px-8 py-2 rounded-full ${formData.timePreference === 'Later' ? 'bg-gray-300' : 'text-gray-700'}`}>Later</button>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <button type="submit" className="w-full bg-[#220440] text-white rounded-full py-3 font-medium text-lg">Post Now!</button>
        </div>
      </form>
    </div>
  );
};

export default NeedAHandForm;