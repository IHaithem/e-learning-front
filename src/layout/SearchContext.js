// SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const setResults = (results) => {
    setSearchResults(results);
    setSearched(true);
  };

  return (
    <SearchContext.Provider value={{ searchResults, setResults, searched }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
