import { createReducer } from "redux-act";

import {
  addToFavoritesReducer,
  changeCurrentPageReducer,
  changeMovieReducer,
  changePagesCountReducer,
  moviesErrorReducer,
  moviesLoadedReducer,
  moviesRequestedReducer,
  removeMovieReducer,
} from "../actions";
import { IMoviesState } from "../types";

const initialState: IMoviesState = {
  movies: [],
  loading: true,
  error: null,
  currentPage: 1,
  currentMovieId: 0,
  pagesCount: 0,
  favorites: [],
};

const reducer = createReducer(
  {
    [moviesRequestedReducer as any]: (state) => ({
      ...state,
      movies: [],
      loading: true,
      error: null,
    }),
    [moviesLoadedReducer as any]: (state, payload) => ({
      ...state,
      movies: payload,
      loading: false,
      error: null,
    }),
    [moviesErrorReducer as any]: (state, payload) => ({
      ...state,
      movies: [],
      loading: false,
      error: payload,
    }),
    [changeCurrentPageReducer as any]: (state, payload) => ({
      ...state,
      currentPage: payload,
    }),
    [changeMovieReducer as any]: (state, payload) => ({
      ...state,
      currentMovieId: payload,
    }),
    [changePagesCountReducer as any]: (state, payload) => ({
      ...state,
      pagesCount: payload,
    }),
    [addToFavoritesReducer as any]: (state, payload) => ({
      ...state,
      favorites: [...state.favorites, payload],
    }),
    [removeMovieReducer as any]: (state, payload) => {
      const movieIndex = state.favorites.findIndex((movie) => movie.id === payload);
      return {
        ...state,
        favorites: [...state.favorites.slice(0, movieIndex),
          ...state.favorites.slice(movieIndex + 1)],
      };
    },
  },
  initialState,
);

export default reducer;
