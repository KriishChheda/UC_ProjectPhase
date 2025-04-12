import React from 'react';
import { X } from 'lucide-react';

const JobDetailsModal = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#220440] mb-4">{job.title}</h2>

        {job.image && (
          <div className="mb-4">
            <img
              src={job.image}
              alt="Job Visual"
              className="w-full h-52 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-2">
          <p><strong>Customer:</strong> {job.customer_name || 'N/A'}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Amount:</strong> ₹{job.amount}</p>
          <p><strong>Time Preference:</strong> {job.time_preference}</p>
          <p><strong>Posted On:</strong> {new Date(job.created_at).toLocaleString()}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => alert('Offer sent!')}
            className="w-full bg-[#220440] text-white py-2 px-4 rounded-lg hover:bg-[#39096b] transition"
          >
            Send Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
