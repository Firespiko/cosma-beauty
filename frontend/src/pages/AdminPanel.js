import React, { useState, useEffect } from 'react';
import { getEnquiries } from '../services/api';

const AdminPanel = ({ onBack }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const data = await getEnquiries();
        setEnquiries(data.enquiries);
      } catch {
        setError('Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    }

    fetchEnquiries();
  }, []);

  return (
    <div className="admin-panel">
      <button onClick={onBack}>← Back to Search</button>
      <h2>Customer Enquiries</h2>

      {loading && <p>Loading enquiries...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul>
        {enquiries.map(enq => (
          <li key={enq.id}>
            <strong>{enq.user_name} ({enq.user_email})</strong> enquired about <em>{enq.package_name}</em> from <em>{enq.clinic_name}</em> ({enq.treatment_name}) - ₹{enq.price}
            <p>Message: {enq.message || 'N/A'}</p>
            <small>{new Date(enq.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
