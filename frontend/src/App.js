import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import TreatmentCard from './components/TreatmentCard';
import PackageCard from './components/PackageCard';
import EnquiryForm from './components/EnquiryForm';
import LoadingSpinner from './components/LoadingSpinner';
import AdminPanel from './pages/AdminPanel';
import './styles/App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');  // New state for current query

  const handleSearch = (results, query) => {
  setSearchResults(results);
  setSearchQuery(query);  // Assuming you added searchQuery state in App.js
  setEnquirySubmitted(false);
  };

  const handleEnquire = (pkg) => {
    setSelectedPackage(pkg);
    setShowEnquiryForm(true);
  };

  const handleEnquirySubmit = () => {
    setShowEnquiryForm(false);
    setEnquirySubmitted(true);
    setSelectedPackage(null);
  };

  const handleCloseEnquiry = () => {
    setShowEnquiryForm(false);
    setSelectedPackage(null);
  };

  if (showAdmin) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Cosma Beauty</h1>
        <button className="admin-btn" onClick={() => setShowAdmin(true)}>Admin Panel</button>
      </header>

      <main className="main-content">
  <SearchBar onSearch={handleSearch} setLoading={setLoading} />

  {enquirySubmitted && (
    <div className="success-message">
      <h3>✅ Enquiry Submitted Successfully!</h3>
      <p>We will get back to you soon.</p>
    </div>
  )}

  {/* Show big spinner only if loading AND no results yet */}
  {loading && !searchResults && <LoadingSpinner />}

  {/* Show results (don’t hide them while loading) */}
  {searchResults && searchQuery.length >= 2 && (
    <>
      <h2>Results for "{searchQuery}"</h2>

      {searchResults.treatments?.length > 0 && (
        <section className="treatments-section">
          <h3>Treatments</h3>
          <div className="treatments-grid">
            {searchResults.treatments.map(treatment => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </section>
      )}

      {searchResults.packages?.length > 0 && (
        <section className="packages-section">
          <h3>Packages</h3>
          <div className="packages-grid">
            {searchResults.packages.map(pkg => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onEnquire={() => handleEnquire(pkg)}
              />
            ))}
          </div>
        </section>
      )}

      {(!searchResults.treatments || searchResults.treatments.length === 0) && (
        <p>No treatments found for this concern.</p>
      )}
    </>
  )}
</main>


      {showEnquiryForm && selectedPackage && (
        <EnquiryForm package={selectedPackage} onSubmit={handleEnquirySubmit} onClose={handleCloseEnquiry} />
      )}
    </div>
  );
} 

export default App;
