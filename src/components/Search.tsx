import { FunctionComponent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import SearchIcon from './SearchIcon';

const Search: FunctionComponent = () => {
  const { setSearchQuery } = useMovieContext();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);

    // Clear the previous debounceTimer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if(value !== '') {
      const timer = setTimeout(() => {
        setSearchQuery(value);
          navigate({
            pathname: '/',
            search: createSearchParams({
              search: value,
            }).toString(),
          });
      }, 500);
  
      setDebounceTimer(timer);
    } else {
      // No debounce if the value is empty by typing or clearing the field
      setSearchQuery(value);
      navigate({
        pathname: '/',
        search: createSearchParams({
          search: value,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full">
      <label className="sr-only">{}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          {/* SVG Icon */}
          <SearchIcon />
        </div>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
          placeholder="Search"
          type="search"
          required
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default Search;
