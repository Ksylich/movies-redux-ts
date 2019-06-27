import IMovie from "../../movie-object";

export interface IMoviesState {
  movies: IMovie[];
  loading: boolean;
  error: any;
  currentPage: number;
  currentMovieId: number;
  pagesCount: number;
  favorites: IMovie[];
}
