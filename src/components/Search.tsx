import { FunctionComponent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import SearchIcon from './icons/SearchIcon';

const Search: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const handleNavigation = (value: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams({ search: value }).toString(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);

    // Clear the previous debounceTimer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (value !== '') {
      const timer = setTimeout(() => {
        handleNavigation(value);
      }, 500);

      setDebounceTimer(timer);
    } else { 
      // No debounce if the value is empty by typing or clearing the field
      handleNavigation(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (event.key === 'Enter') {
      handleNavigation(value);
    }
  };

  return (
    <div className="w-full">
      <label className="sr-only">{}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon />
        </div>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
          placeholder="Search"
          type="search"
          required
          value={searchValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;
