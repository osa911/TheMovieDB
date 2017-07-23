import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';

const propTypes = {
  id:             PropTypes.number,
  rate:           PropTypes.number,
  title:          PropTypes.string,
  genres:         PropTypes.object,
  favorites:      PropTypes.object,
  isLogined:      PropTypes.bool,
  overview:       PropTypes.string,
  hostImage:      PropTypes.string,
  posterPath:     PropTypes.string,
  releaseDate:    PropTypes.string,
  addToFavorites: PropTypes.func.isRequired,
  deleteFavoritesMovie: PropTypes.func.isRequired,
  genreIds:       PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
  rate:        0,
  id:          null,
  title:       '',
  genres:      {},
  genreIds:    [],
  overview:    '',
  hostImage:   '',
  posterPath:  '',
  releaseDate: '',
  isLogined:   false,
  favorites:   {}
};

const MovieCard = ({ hostImage, id, title, posterPath, overview, releaseDate, rate, genres, genreIds, isLogined, addToFavorites, deleteFavoritesMovie, favorites }) => (
  <div className='movie-card'>
    <img className='movie-card__img' src={posterPath ? hostImage + posterPath : ''}  alt={title} />
    <div className='movie-card__content'>
      <div className='movie-card__header'>
        <div className='header-row'>
          <span className='movie-card__title'>{title}</span>
          <span className='movie-card__rate'>
            {rate} &nbsp;
            <Glyphicon glyph='star' />
          </span>
        </div>
        <div className='header-row'>
          <span className='movie-card__releaseDate'>
            <Glyphicon glyph='calendar' /> &nbsp;
            {moment(releaseDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
          </span>
          {
            !!genreIds.length &&
            <span className='movie-card__genre'>
              {genreIds.filter((item, key) => key < 3)
                .reduce((prev, curr) => !prev ? genres[curr] && genres[curr].name : prev += ` / ${genres[curr] && genres[curr].name}`, '')}
            </span>
          }
        </div>
      </div>
      <p className='movie-card__content-overview'>{overview}</p>
      {
        isLogined && <p className='movie-card-option'>
          <a onClick={favorites[id] ? deleteFavoritesMovie(id) : addToFavorites(id)}>
            {favorites[id] ? 'Remove from favorites' : 'Add to favorites' }
          </a>
        </p>
      }
    </div>
  </div>
);

MovieCard.propTypes = propTypes;
MovieCard.defaultProps = defaultProps;

export default MovieCard;
