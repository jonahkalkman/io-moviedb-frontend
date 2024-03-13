import { FunctionComponent, useEffect, useState } from 'react';
import MovieCard from '../components/molecules/MovieCard';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/molecules/Spinner';
import { searchMovies } from '../api/searchMovies';
import { MovieOverview } from '../models/search';

const Home: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search');

  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieOverview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchValue) {
        setMovies([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchMovies(searchValue);

        if (data?.Search) {
          setMovies(data.Search);
          setHasError(false);
        } else {
          setMovies([]);
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {movies?.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies.map((movie) => (
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
              {searchValue ? (
                <p className="text-red-500">No movies found for your search.</p>
              ) : null}
            </>
          )}
        </>
      )}
      {hasError ? (
        <p className="text-red-500">
          Oops! Something went wrong, try again later.
        </p>
      ) : null}
    </div>
  );
};

export default Home;
