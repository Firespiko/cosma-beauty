import React, { useState, useEffect } from 'react';
import { searchConcerns } from '../services/api';

const SearchBar = ({ onSearch, setLoading }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [error, setError] = useState(null);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 2000);

    return () => clearTimeout(handler);
  }, [query]);

  // Run API search when debouncedQuery changes
  useEffect(() => {
  if (!debouncedQuery || debouncedQuery.length < 2) return;

  let isCancelled = false;
  setLoading(true);

  searchConcerns(debouncedQuery)
    .then(results => {
      if (!isCancelled) {
        onSearch(results, debouncedQuery);
        setLoading(false); // ✅ only stop loading after results applied
      }
    })
    .catch(() => {
      if (!isCancelled) {
        setError('Search failed. Please try again.');
        setLoading(false);
      }
    });

  return () => {
    isCancelled = true; // cancel stale requests
  };
}, [debouncedQuery, onSearch, setLoading]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter your skin/hair concern..."
        value={query}
        onChange={e => {
          setError(null);
          setQuery(e.target.value);
        }}
        className="search-input"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;
