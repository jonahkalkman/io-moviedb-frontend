import { FunctionComponent, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { searchMovies } from '../api/searchMovies';

const Home: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { movies, setMovies } = useMovieContext();
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
      }
    };

    fetchData();
  }, [searchParams]);

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
