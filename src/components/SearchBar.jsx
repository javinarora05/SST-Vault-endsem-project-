
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import useFilterStore from '../store/useFilterStore';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef(null);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  
  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative group">
      
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-primary-500 transition-colors"
      />

      
      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search events..."
        className="w-full lg:w-64 pl-9 pr-8 py-2 bg-surface-100 dark:bg-surface-800 border border-transparent focus:border-primary-400 dark:focus:border-primary-500 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 outline-none transition-all duration-200 focus:w-72 focus:bg-white dark:focus:bg-surface-700"
        aria-label="Search events"
      />

      
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
