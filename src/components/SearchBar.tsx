// src/components/SearchBar.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        // Navigate to search page
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-input"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}