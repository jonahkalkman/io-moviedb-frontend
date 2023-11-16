// MovieContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MovieOverview } from '../model/search';
import { IMDBMovie } from '../model/movie';

interface MovieContextProps {
  movies: MovieOverview[];
  setMovies: (newMovies: MovieOverview[]) => void;
  favorites: IMDBMovie[];
  setFavorites: (newFavorites: IMDBMovie[]) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<MovieOverview[]>([]);
  const [favorites, setFavorites] = useState<IMDBMovie[]>([]);

  return (
    <MovieContext.Provider
      value={{ movies, setMovies, favorites, setFavorites }}
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
