import React, { Component } from "react";
import { connect } from "react-redux";

import IMovie from "../../movie-object";
import { changeMovie, fetchMovies } from "../../redux/actions";
import { MState } from "../../redux/store";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import MovieCards from "./movie-cards";

interface IProps {
  movies: IMovie[];
  loading: boolean;
  error: any;
  currentPage: number;
  fetchMoviesAction: typeof fetchMovies;
  changeMovieAction: typeof changeMovie;
}

class MovieCardsContainer extends Component<IProps> {

  public componentDidMount() {
    const { fetchMoviesAction, currentPage } = this.props;
    fetchMoviesAction(currentPage);
  }

  public render() {
    const {
      movies, loading, error, changeMovieAction,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <MovieCards movies={movies} onHandleChooseMovie={changeMovieAction} />;
  }
}

const mapStateToProps = ({
  movies, loading, error, currentPage,
}: MState) => ({
  movies,
  loading,
  error,
  currentPage,
});

const mapDispathToProps = {
  fetchMoviesAction: fetchMovies,
  changeMovieAction: changeMovie,
};

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(MovieCardsContainer);
