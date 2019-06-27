import { AnyAction } from "redux";
import {
    all, call, put, takeEvery, takeLatest,
  } from "redux-saga/effects";
import * as actions from "../redux/actions";
import MovieService from "../services/movie-service";

const moviesService = new MovieService();

function* fetch({ payload }: AnyAction) {
    try {
      yield put(actions.moviesRequested());
      const data = yield call(moviesService.getOneMoviePage, payload);
      yield put(actions.moviesLoaded(data.movies));
      yield put(actions.changeCurrentPage(payload));
      yield put(actions.changePagesCount(data.pages_count));
    } catch (e) {
      yield actions.moviesError(e);
    }
  }

function* requestMovies() {
    yield put(actions.moviesRequestedReducer());
  }

function* loadedMovies({ payload }: AnyAction) {
    yield put(actions.moviesLoadedReducer(payload));
  }

function* changePage({ payload }: AnyAction) {
    yield put(actions.changeCurrentPageReducer(payload));
  }

function* changePageCount({ payload }: AnyAction) {
    yield put(actions.changePagesCountReducer(payload));
  }

function* errorMovies({ payload }: AnyAction) {
    yield put(actions.moviesErrorReducer(payload));
  }

function* changeMovieId({ payload }: AnyAction) {
    yield put(actions.changeMovieReducer(payload));
  }

function* makeFavorite({ payload }: AnyAction) {
    yield put(actions.addToFavoritesReducer(payload));
  }

function* removeFromFavorites({ payload }: AnyAction) {
    yield put(actions.removeMovieReducer(payload));
  }

export default function* movies() {
    yield all([
      takeLatest(actions.fetchMovies, fetch),
      takeLatest(actions.moviesRequested, requestMovies),
      takeLatest(actions.moviesLoaded, loadedMovies),
      takeEvery(actions.changeCurrentPage, changePage),
      takeEvery(actions.changePagesCount, changePageCount),
      takeEvery(actions.moviesError, errorMovies),
      takeEvery(actions.changeMovie, changeMovieId),
      takeEvery(actions.addToFavorites, makeFavorite),
      takeEvery(actions.removeMovie, removeFromFavorites),
    ]);
  }
