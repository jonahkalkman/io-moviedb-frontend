import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IMDBMovie } from '../model/movie';

interface MovieContextProps {
  favorites: IMDBMovie[];
  setFavorites: (newFavorites: IMDBMovie[]) => void;
  searchQuery?: string;
  setSearchQuery: (searchQuery: string) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>();
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
    if(favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <MovieContext.Provider
      value={{ favorites, setFavorites, searchQuery, setSearchQuery }}
    >
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
