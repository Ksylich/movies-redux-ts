import { createAction } from "redux-act";
import IMovie from "../../movie-object";

const fetchMovies = createAction<any>("fetch_movies_saga");
const moviesRequested = createAction("fetch_movie_request_saga");
const moviesLoaded = createAction<IMovie[]>("fetch_movie_success_saga");
const changeCurrentPage = createAction<number>("changeCurrentPage_saga");
const changePagesCount = createAction<number>("change_pages_count_saga");
const moviesError = createAction<any>("fetch_movie_failure_saga");
const changeMovie = createAction<number>("changeChosenMovie_saga");
const addToFavorites = createAction<IMovie>("add_movie_to_favorites_saga");
const removeMovie = createAction<number>("remove_movie_from_favorites_saga");

const moviesLoadedReducer = createAction<IMovie[]>("fetch_movie_success_reducer");
const moviesRequestedReducer = createAction("fetch_movie_request_reducer");
const changeCurrentPageReducer = createAction<number>("changeCurrentPage_reducer");
const changePagesCountReducer = createAction<number>("change_pages_count_reducer");
const moviesErrorReducer = createAction<any>("fetch_movie_failure_reducer");
const changeMovieReducer = createAction<number>("changeChosenMovie_reducer");
const addToFavoritesReducer = createAction<IMovie>("add_movie_to_favorites_reducer");
const removeMovieReducer = createAction<number>("remove_movie_from_favorites_reducer");

export {
  fetchMovies,
  moviesRequested,
  moviesError,
  moviesLoaded,
  changeCurrentPage,
  changeMovie,
  changePagesCount,
  addToFavorites,
  removeMovie,
  moviesRequestedReducer,
  moviesLoadedReducer,
  changeCurrentPageReducer,
  changePagesCountReducer,
  moviesErrorReducer,
  changeMovieReducer,
  addToFavoritesReducer,
  removeMovieReducer,
};
