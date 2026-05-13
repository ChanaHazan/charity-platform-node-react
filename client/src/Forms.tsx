import React, { useState } from 'react';
import { solicitorService } from './services';
import './Forms.css';

interface AddSolicitorFormProps {
  groupId: string;
  onSuccess?: () => void;
}

export const AddSolicitorForm: React.FC<AddSolicitorFormProps> = ({ groupId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetAmount: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const targetAmount = parseFloat(formData.targetAmount);
      if (isNaN(targetAmount) || targetAmount <= 0) {
        throw new Error('Please enter a valid target amount');
      }

      const newSolicitor = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        groupId,
        targetAmount,
        raisedAmount: 0,
      };

      await solicitorService.addSolicitor(newSolicitor);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        targetAmount: '',
      });
      
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add solicitor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h4>Add New Solicitor</h4>
      
      {success && <div className="form-success">✓ Solicitor added successfully!</div>}
      {error && <div className="form-error">✗ {error}</div>}

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input-small"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input-small"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="form-input-small"
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount ($)"
          value={formData.targetAmount}
          onChange={handleChange}
          className="form-input-small"
          min="1"
          step="0.01"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="submit-btn-small">
        {loading ? 'Adding...' : 'Add Solicitor'}
      </button>
    </form>
  );
};
