import { FunctionComponent, useEffect, useState } from 'react';
import { OverviewSearch } from '../model/search';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home: FunctionComponent = () => {
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { movies, setMovies } = useMovieContext();

  useEffect(() => {
    const searchValue = searchParams.get('search');
    const fetchData = async () => {
      if (searchValue) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=1a993ee0&s=${searchValue}`
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data: OverviewSearch = await response.json();
          setMovies(data.Search);
          setLoading(false);
        } catch (error: any) {
          console.error('Error fetching data:', error.message);
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
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {movies?.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              image={movie.Poster}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
