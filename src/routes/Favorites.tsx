import { FunctionComponent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites: FunctionComponent = () => {
  const { favorites } = useMovieContext();

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {favorites
        ? favorites.map((favoriteMovie) => (
            <MovieCard
              id={favoriteMovie.imdbID}
              title={favoriteMovie.Title}
              image={favoriteMovie.Poster}
              year={favoriteMovie.Year}
            />
          ))
        : null}
    </ul>
  );
};

export default Favorites;
