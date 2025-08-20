import React from 'react';

const TreatmentCard = ({ treatment }) => {
  const icons = {
    'Microneedling': '💉',
    'Chemical Peel': '🧪',
    'Laser Resurfacing': '✨',
    'Under-eye Filler': '👁️',
    'PRP Under-eye': '🩸',
    'HIFU': '🔥',
    'Kybella': '💊'
  };

  return (
    <div className="treatment-card">
      <div className="treatment-icon"><h4>{treatment.name}</h4></div>
    </div>
  );
};

export default TreatmentCard;
