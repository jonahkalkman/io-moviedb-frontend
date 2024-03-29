import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { IMDBMovie } from '../models/movie';

interface MovieContextProps {
  favorites: IMDBMovie[];
  setFavorites: (newFavorites: IMDBMovie[]) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<IMDBMovie[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (favorites?.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const cachedValue = useMemo(() => {
    return { favorites, setFavorites };
  }, [favorites, setFavorites]);

  return (
    <MovieContext.Provider value={cachedValue}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextProps => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }

  return context;
};
