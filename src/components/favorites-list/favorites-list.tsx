import React, { useCallback } from "react";

import "./favorites-list.css";

import IMovie from "../../movie-object";
import FavoritesItem from "../favorites-item";

interface IProps {
  favorites: IMovie[];
  onHandleRemoveMovie: (event: any) => void;
  onHandleChooseMovie: (event: any) => void;
}

const FavoritesList: React.FC<IProps> = ({
  favorites,
  onHandleRemoveMovie,
  onHandleChooseMovie,
}) => {
  const renderMovie = useCallback(
    (movie) => (
      <FavoritesItem
        key={`favorite-item${movie.id}`}
        movie={movie}
        onHandleChooseMovie={onHandleChooseMovie}
        onHandleRemoveMovie={onHandleRemoveMovie}
      />
    ),
    [onHandleChooseMovie, onHandleRemoveMovie],
  );
  return (
    <div className="container-fav">
      <div className="label-fav">My favorite</div>
      {favorites.map(renderMovie)}
    </div>
  );
};

export default FavoritesList;
