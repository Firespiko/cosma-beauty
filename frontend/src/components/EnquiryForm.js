import React, { useState } from 'react';
import { submitEnquiry } from '../services/api';

const EnquiryForm = ({ package: pkg, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.user_name.trim() || formData.user_name.trim().length < 2) {
      errs.user_name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email)) {
      errs.user_email = 'Invalid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
    setErrors({...errors, [e.target.name]: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await submitEnquiry({ package_id: pkg.id, ...formData });
      onSubmit();
    } catch {
      setErrors({ submit: 'Failed to submit enquiry' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-overlay">
      <div className="enquiry-form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Enquire About: {pkg.package_name}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name *</label>
            <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
            {errors.user_name && <span className="error-text">{errors.user_name}</span>}
          </div>
          <div>
            <label>Email *</label>
            <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} />
            {errors.user_email && <span className="error-text">{errors.user_email}</span>}
          </div>
          <div>
            <label>Message (Optional)</label>
            <textarea name="message" value={formData.message} onChange={handleChange} />
          </div>
          {errors.submit && <div className="error-message">{errors.submit}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Enquiry'}</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
