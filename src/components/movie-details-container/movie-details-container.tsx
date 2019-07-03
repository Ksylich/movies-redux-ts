import React, { Component } from "react";
import { connect } from "react-redux";
import { withLastLocation, WithLastLocationProps } from "react-router-last-location";

import IMovie from "../../movie-object";
import { changeMovie } from "../../redux/actions";
import { MState } from "../../redux/store";
import MovieDetails from "../movie-details";

interface IProps extends WithLastLocationProps {
  currentMovieId: number;
  movies: IMovie[];
  favorites: IMovie[];
  changeMovieAction: typeof changeMovie;
}

interface IMethods {
  findCurrentMovie(movies: IMovie[]): void;
  checkIsFavorite(movie: IMovie): void;
}

class MovieDetailsContainer extends Component<IProps> implements IMethods {
  public onNextClick = () => {
    const { changeMovieAction, currentMovieId } = this.props;
    const movies = this.returnArr();

    const next = movies.findIndex((movie) => movie.id === currentMovieId) + 1;

    changeMovieAction(next >= movies.length ? movies[0].id : movies[next].id);
  }

  public returnArr() {
    const { movies, favorites, lastLocation } = this.props;
    return lastLocation!.pathname === "/" ? movies : favorites;
  }

  public findCurrentMovie(movies: IMovie[]) {
    const { currentMovieId } = this.props;
    return movies.find((m) => m.id === currentMovieId);
  }

  public checkIsFavorite(movie: IMovie) {
    const { favorites } = this.props;
    return !favorites.find((mov) => mov.id === movie.id);
  }

  public render() {
    const mvs = this.returnArr();
    const movie = this.findCurrentMovie(mvs);
    if (movie === undefined) {
      return (
        <h1>Error! Something wrong!!!</h1>
      );
    }
    const isFavorite = this.checkIsFavorite(movie);

    return (
      <MovieDetails
        movie={movie}
        isFavorite={isFavorite}
        onHandleNext={this.onNextClick}
      />
    );
  }
}

const mapStateToProps = ({ movies, favorites, currentMovieId }: MState) => ({
  movies,
  favorites,
  currentMovieId,
});

const mapDispatchToProps = {
  changeMovieAction: changeMovie,
};

export default withLastLocation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MovieDetailsContainer),
);
