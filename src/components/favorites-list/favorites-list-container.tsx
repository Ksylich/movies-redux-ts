import React, { Component } from "react";
import { connect } from "react-redux";

import IMovie from "../../movie-object";
import { changeMovie, removeMovie } from "../../redux/actions";
import { MState } from "../../redux/store";
import FavoritesList from "./favorites-list";

interface IProps {
  favorites: IMovie[];
  removeMovieAction: typeof removeMovie;
  changeMovieAction: typeof changeMovie;
}

interface IMethod {
  onHandleRemoveMovie: (id: number) => void;
}

class FavoritesListContainer extends Component<IProps> implements IMethod  {
  public onHandleRemoveMovie = (id: number) => {
    const { removeMovieAction } = this.props;
    removeMovieAction(id);
  }

  public render() {
    const { favorites, changeMovieAction } = this.props;
    return (
      <FavoritesList
        favorites={favorites}
        onHandleChooseMovie={changeMovieAction}
        onHandleRemoveMovie={this.onHandleRemoveMovie}
      />
    );
  }
}

const mapStateToProps = ({ favorites }: MState) => ({
  favorites,
});

const mapDispatchToProps = {
  changeMovieAction: changeMovie,
  removeMovieAction: removeMovie,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesListContainer);
