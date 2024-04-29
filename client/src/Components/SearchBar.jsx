import React, { useState, useEffect } from 'react';
import { getBulkProducts } from '../Api/ProductsApi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    onSearch(query);
  };

  const fetchData = async () => {
    try {
      const products = await getBulkProducts(query);
      setResults(products);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleResultClick = (product) => {
    setQuery(product.name);
    setResults([]);
    setShowDropdown(false);
    onSearch(product.name);
  };

  return (
    <div className="flex items-center border rounded-lg h-12 ml-6 w-6/12 bg-white">
      <input
        name="searchInput"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
        className="flex-grow outline-none px-2 font-montserrat leading-normal text-lg text-gray-700"
      />

      <button
        onClick={handleSearch}
        className="bg-coral-red text-white font-montserrat
        leading-normal text-lg px-4 py-2 rounded-lg hover:bg-gray-800 ml-1"
      >
        Search
      </button>

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg">
          {results.map((product) => (
            <div
              key={product._id}
              onClick={() => handleResultClick(product)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;