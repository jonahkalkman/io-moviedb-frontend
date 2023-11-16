export interface OverviewSearch {
  Search: MovieOverview[];
  TotalMovies: string;
}

export interface MovieOverview {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
