import { FunctionComponent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Favorites: FunctionComponent = () => {
  const { favorites, setFavorites } = useMovieContext();
  const navigate = useNavigate();

  const deleteFavoriteMovie = (id: string) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== id));
  }

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
              isEditable={true}
              onEdit={(id: string) => {
                navigate(`/edit?movieId=${id}`, {
                  state: {
                    movieId: id
                  }
                })
              }}
              onDelete={(id: string) => {
                deleteFavoriteMovie(id);
              }}
            />
          ))
        : null}
    </ul>
  );
};

export default Favorites;
