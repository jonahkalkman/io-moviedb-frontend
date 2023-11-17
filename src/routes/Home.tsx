import { FunctionComponent, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { searchMovies } from '../api/searchMovies';
import { MovieOverview } from '../model/search';

const Home: FunctionComponent = () => {
  const { searchQuery, setSearchQuery } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieOverview[]>([]);
  const searchValue = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue) {
        setLoading(true);

        try {
          const data = await searchMovies(searchValue);
          if(data) {
            setMovies(data.Search);
          }
          setHasError(false);
          setLoading(false);
        } catch (error) {
          setHasError(true);
          setLoading(false);
        }
      } else {
        setMovies([]);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    // Update the searchParam if navigating from another route
    if (searchValue !== searchQuery && searchQuery !== undefined) {
      const params = new URLSearchParams(`search=${searchQuery}`);
      setSearchParams(params);
    } else if(searchValue) {
      // Update the searchQuery on direct search, example directly to: https://example/?search=test
      setSearchQuery(searchValue);
    }
  }, [searchQuery])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {movies && movies.length > 0 ? (
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {movies && movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  id={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  image={movie.Poster}
                />
              ))}
            </ul>
          ) : (
            <>
              {searchValue ? <p className="text-red-500">No movies found for your search.</p> : null }
            </>
          )}   
        </>
      )}
      {hasError ? <p className="text-red-500">Oops! Something went wrong, try again later.</p> : null}
    </>
  );
};

export default Home;
