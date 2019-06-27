import React, { useCallback } from "react";

import IMovie from "../../movie-object";
import MovieCardItem from "../movie-card-item";
import "./movie-cards.css";

interface IProps {
  movies: IMovie[];
  onHandleChooseMovie: (event: any) => void;
}

const MovieCards = ({ movies, onHandleChooseMovie }: IProps) => {
  const renderMovie = useCallback(
    (movie) => (
      <MovieCardItem
        key={movie.id}
        movie={movie}
        idx={movies.findIndex((m: IMovie) => m.id === movie.id)}
        onHandleChooseMovie={onHandleChooseMovie}
      />
    ),
    [movies, onHandleChooseMovie],
  );

  return (
    <div className="body">
      {movies.map(renderMovie)}
    </div>
  );
};

export default MovieCards;
