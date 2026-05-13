import React, { useState } from 'react';
import { useCampaignContext } from './CampaignContext';
import './DonationForm.css';

export const DonationForm: React.FC = () => {
  const { makeDonation } = useCampaignContext();
  const [formData, setFormData] = useState({
    donorId: '',
    donorName: '',
    donorEmail: '',
    solicitorId: '',
    groupId: '',
    amount: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid donation amount');
      }

      const donation = {
        donorId: formData.donorId || `donor_${Date.now()}`,
        solicitorId: formData.solicitorId || 'anonymous',
        groupId: formData.groupId || 'general',
        amount,
        message: formData.message,
      };

      const result = await makeDonation(donation);
      if (result) {
        setSuccess(true);
        setFormData({
          donorId: '',
          donorName: '',
          donorEmail: '',
          solicitorId: '',
          groupId: '',
          amount: '',
          message: '',
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h3>Make a Quick Donation</h3>
      {success && <div className="form-success">✓ Thank you for your donation!</div>}
      {error && <div className="form-error">✗ {error}</div>}
      
      <form onSubmit={handleSubmit} className="donation-form">
        <input
          type="text"
          name="donorName"
          placeholder="Your Name"
          value={formData.donorName}
          onChange={handleChange}
          className="form-input"
        />
        
        <input
          type="email"
          name="donorEmail"
          placeholder="Your Email (optional)"
          value={formData.donorEmail}
          onChange={handleChange}
          className="form-input"
        />
        
        <input
          type="number"
          name="amount"
          placeholder="Donation Amount ($)"
          value={formData.amount}
          onChange={handleChange}
          className="form-input"
          min="1"
          step="0.01"
          required
        />
        
        <textarea
          name="message"
          placeholder="Leave a message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          rows={3}
        />
        
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
};
