import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center border rounded-lg h-12 ml-6 w-6/12 bg-white">
      <input
        name="searchInput"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow outline-none px-2 font-montserrat leading-normal text-lg text-gray-700"
      />

      <button
        onClick={handleSearch}
        className="bg-coral-red text-white font-montserrat
        leading-normal text-lg px-4 py-2 rounded-lg hover:bg-gray-800 ml-1"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
