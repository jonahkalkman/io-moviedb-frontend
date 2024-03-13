import { FunctionComponent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/molecules/MovieCard';
import { useNavigate } from 'react-router-dom';

const Favorites: FunctionComponent = () => {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useMovieContext();

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`, {
      state: {
        movieId: id,
      },
    });
  };

  const handleDelete = (id: string) => {
    setFavorites(
      favorites.filter((favoriteMovie) => favoriteMovie.imdbID !== id),
    );
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {favorites?.length > 0
        ? favorites.map((favoriteMovie) => (
            <MovieCard
              key={favoriteMovie.imdbID}
              id={favoriteMovie.imdbID}
              title={favoriteMovie.Title}
              image={favoriteMovie.Poster}
              year={favoriteMovie.Year}
              isEditable={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        : null}
    </ul>
  );
};

export default Favorites;
