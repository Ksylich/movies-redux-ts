import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "./movie-details.css";

import NoPoster from "../../assets/icons/NoPoster.jpg";
import IMovie from "../../movie-object";
import { addToFavorites } from "../../redux/actions";
import { DecktopMovieInformation, DecktopNav } from "../movie-details-desktop";
import { MobMovieInformation, MobNav } from "../movie-details-mb";

interface IProps extends RouteComponentProps {
 movie: IMovie;
 isFavorite: boolean;
 onHandleNext: (event: any) => void;
 addToFavoritesAction: typeof addToFavorites;
}

class MovieDetails extends Component<IProps> {

  public addToFavorites = () => {
    const { movie, addToFavoritesAction } = this.props;
    addToFavoritesAction(movie);
  }

  public render() {
    const {
      movie, history, isFavorite, onHandleNext,
    } = this.props;
    const style = classNames({ hidden: !isFavorite });
    const poster = movie.posterPath || NoPoster;
    const sectionStyle = {
      backgroundImage: `url(${poster})`,
    };

    return (
      <div className="wrapper">
        <div className="section" style={sectionStyle} />
        <div className="content">
          <MobNav onHandleBack={history.goBack} onHandleNext={onHandleNext} />
          <MobMovieInformation
            movie={movie}
            btnStyle={style}
            addToFavorites={this.addToFavorites}
          />
          <DecktopNav onHandleBack={history.goBack} onHandleNext={onHandleNext} />
          <DecktopMovieInformation
            movie={movie}
            btnStyle={style}
            addToFavorites={this.addToFavorites}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addToFavoritesAction: addToFavorites,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(MovieDetails),
);
