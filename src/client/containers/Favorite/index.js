import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// import _debounce from 'lodash/debounce';
import _keys from 'lodash/keys';
import { PageHeader } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
// import Paginate from '../../components/Paginate';
import MovieCard from '../../components/MovieCard';
import { hostImage } from '../../config/hostImage';
import selectors from './selectors';
import * as actions from './actions';

class Favorite extends Component {
  static propTypes = {
    isLoad: PropTypes.bool,
    loadAllFavoritesMovie: PropTypes.func,
    loadMovie: PropTypes.func,
    // searchMovie: PropTypes.func,
    // loadNowPlayingMovie: PropTypes.func,
    movies: PropTypes.object,
    // paging: PropTypes.shape({
    //   page: PropTypes.number,
    //   totalPages: PropTypes.number
    // }),
    // filters: PropTypes.shape({
    //   page: PropTypes.number,
    //   language: PropTypes.string
    // })
  };

  constructor(props) {
    super(props);
    const {
      loadAllFavoritesMovie,
      user,
      token,
      loadGenres
    } = this.props;

    if (!token) browserHistory.push('/');

    loadGenres();
    loadAllFavoritesMovie(user._id, token);
  };

  componentWillReceiveProps(nextProps) {
    const {
      favorites,
      loadMovie
    } = this.props;
    const { favorites: newFavorites } = nextProps;
    if (favorites !== newFavorites) {
      newFavorites.map(item => loadMovie(item.movieID));
    }
  }

  addToFavorites = () => {
    console.log('addToFavorites')
  }

  deleteFavoritesMovie = id => () => {
    const {
      deleteFavoritesMovie,
      user,
      token
    } = this.props;
    confirm('Are you sure?') && deleteFavoritesMovie({ userID: user._id, movieID: id }, token);
  }

  render() {
    const {
      isLoad,
      movies,
      isLogined,
      favorites,
      entities: {
        genres
      }
    } = this.props;

    const favoritesObj = favorites.reduce((prev, curr) => ({
      ...prev,
      [curr.movieID]: curr.movieID,
    }), {})

    return isLoad ? <Spinner />
      : <div>
        <PageHeader>Favorite</PageHeader>
        <div className='movies_content'>
          {!_keys(movies).length ? <div>Ничего не найдено :(</div>
            : genres && _keys(movies).map(movieID =>
              <MovieCard
                id={movies[movieID].id}
                key={movies[movieID].id}
                genres={genres}
                title={movies[movieID].title}
                favorites={favoritesObj}
                hostImage={hostImage}
                isLogined={isLogined}
                rate={movies[movieID].vote_average}
                overview={movies[movieID].overview}
                genreIds={movies[movieID].genre_ids}
                posterPath={movies[movieID].poster_path}
                releaseDate={movies[movieID].release_date}
                addToFavorites={this.addToFavorites}
                deleteFavoritesMovie={this.deleteFavoritesMovie}
              />
            )
          }
        </div>
      </div>;
  }
}

export default connect(selectors, actions)(Favorite);
