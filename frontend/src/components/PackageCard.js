import React from 'react';

const PackageCard = ({ package: pkg, onEnquire }) => (
  <div className="package-card">
    <h4>{pkg.package_name}</h4>
    <p>{pkg.clinic_name}</p>
    <p>₹{pkg.price.toLocaleString()}</p>
    <button className="enquire-btn" onClick={onEnquire}>Enquire Now</button>
  </div>
);

export default PackageCard;
