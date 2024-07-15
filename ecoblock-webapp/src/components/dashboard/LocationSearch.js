import React, { useState } from 'react';
import axios from 'axios';
import './LocationSearch.css';

const LocationSearch = ({ setCoordinates }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`);
      setSuggestions(response.data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
    setCoordinates({ lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) });
  };

  return (
    <div className="location-search">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Enter a location"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
