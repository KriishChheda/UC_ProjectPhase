import React, { useState } from 'react';
import { X, User, AlignLeft, Briefcase, Clock, Calendar, IndianRupee, Tag } from 'lucide-react';
import API from '../api';

const JobDetailsModal = ({ job, onClose }) => {
  const [isSending, setIsSending] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendOffer = async () => {
    if (!amount) {
      alert('Please enter an amount.');
      return;
    }

    setIsSending(true);
    try {
      await API.post(`/jobs/${job.job_id}/offers/`, {
        message,
        proposed_amount: amount
      });
      setOfferSent(true);
    } catch (err) {
      console.error('Error sending offer:', err);
      alert('Failed to send offer');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Job Title */}
        <h2 className="text-2xl font-bold text-[#220440] mb-4">{job.title}</h2>

        {/* Image */}
        {job.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img
              src={job.image}
              alt="Job Visual"
              className="w-full h-52 object-cover"
            />
          </div>
        )}

        {/* Job Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <User size={16} /> <strong>Customer:</strong> {job.customer_name || 'N/A'}
          </p>
          <p className="flex items-center gap-2 capitalize">
            <Tag size={16} /> <strong>Status:</strong> {job.status}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase size={16} /> <strong>Category:</strong> {job.category}
          </p>
          <p className="flex items-center gap-2">
            <IndianRupee size={16} /> <strong>Amount:</strong> ₹{job.amount}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} /> <strong>Time:</strong> {job.time_preference}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} /> <strong>Posted:</strong> {new Date(job.created_at).toLocaleString()}
          </p>
          <div className="sm:col-span-2 flex items-start gap-2">
            <AlignLeft size={16} className="mt-1" />
            <div>
              <strong>Description:</strong> {job.description}
            </div>
          </div>
        </div>

        {/* Offer Form */}
        {!offerSent ? (
          <div className="space-y-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#220440] focus:outline-none"
              rows="3"
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input
              type="number"
              placeholder="Proposed Amount (₹)"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#220440] focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={handleSendOffer}
              disabled={isSending}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                isSending
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#220440] hover:bg-[#39096b]'
              }`}
            >
              {isSending ? 'Sending...' : 'Send Offer'}
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold text-lg">🎉 Offer sent successfully!</p>
            <p className="text-sm text-gray-600 mt-1">We'll notify the customer. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsModal;
