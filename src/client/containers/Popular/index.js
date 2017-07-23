import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _debounce from 'lodash/debounce';
import { PageHeader } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import Paginate from '../../components/Paginate';
import MovieCard from '../../components/MovieCard';
import { hostImage } from '../../config/hostImage';
import selectors from './selectors';
import * as actions from './actions';

class Popular extends Component {
  static propTypes = {
    isLoad: PropTypes.bool,
    setFilter: PropTypes.func,
    loadGenres: PropTypes.func,
    searchMovie: PropTypes.func,
    loadAllFavoritesMovie: PropTypes.func,
    loadNowPlayingMovie: PropTypes.func,
    movies: PropTypes.arrayOf(PropTypes.object),
    paging: PropTypes.shape({
      page: PropTypes.number,
      totalPages: PropTypes.number
    }),
    filters: PropTypes.shape({
      page: PropTypes.number,
      language: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    const {
      loadNowPlayingMovie,
      loadGenres,
      filters,
      searchMovie,
      loadAllFavoritesMovie,
      token,
      user
    } = this.props;
    this.debounceSearchMovie = _debounce(searchMovie, 500); // задержка пол секунды перед запросом
    token && loadAllFavoritesMovie(user._id, token);
    loadGenres();
    loadNowPlayingMovie(filters);
  };

  componentWillReceiveProps = (next) => {
    const { loadNowPlayingMovie, searchMovie, filters } = this.props;
    const { isFiltersDebounce, filters: nextFilters } = next;

    if (filters !== nextFilters) {
      const newfilters = filters.page === nextFilters.page
        ? { ...nextFilters, page: 1 }
        : nextFilters;

      // если запроса на поиск нету отображаем список NowPlaying
      !nextFilters.query && loadNowPlayingMovie(newfilters);
        // если есть запрос на поиск и происходит смена страницы в поиске
      nextFilters.query.length > 0 &&
        filters.page !== nextFilters.page &&
          searchMovie(newfilters);
      // если есть запрос на поиск и есть таймаут то делаем запрос по тайм ауту
      // в противном случае просто отображаем список NowPlaying
      nextFilters.query.length > 0 ?
        isFiltersDebounce && this.debounceSearchMovie(newfilters)
        : loadNowPlayingMovie(newfilters);
    }
  }

  setSearchFilter = (e) => this.props.setFilter('query', e.target.value, true);

  setFilterPage = ({ selected }) => this.props.setFilter('page', selected + 1);

  addToFavorites = id => () => {
    const {
      addToFavorites,
      token,
      user,
    } = this.props;

    const data = {
      userID: user._id,
      movieID: id
    };

    addToFavorites(data, token);
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
      paging,
      movies,
      filters,
      entities: {
        genres,
        favorites
      },
      isLogined
    } = this.props;

    return isLoad ? <Spinner />
    : <div>
        <PageHeader>Now Playing</PageHeader>
        <div className='search'>
          <form>
            <input
              autoFocus
              type='text'
              value={filters.query}
              onChange={this.setSearchFilter}
              placeholder='Enter film name for search'
            />
          </form>
        </div>
        <div className='movies_content'>
          {!movies.length ? <div>Ничего не найдено :(</div>
              : genres && movies.map(movie =>
                <MovieCard
                  id={movie.id}
                  key={movie.id}
                  genres={genres}
                  title={movie.title}
                  favorites={favorites}
                  hostImage={hostImage}
                  isLogined={isLogined}
                  rate={movie.vote_average}
                  overview={movie.overview}
                  genreIds={movie.genre_ids}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  addToFavorites={this.addToFavorites}
                  deleteFavoritesMovie={this.deleteFavoritesMovie}
                />
              )
          }
          {paging &&
            <Paginate
              pageNum={paging.totalPages}
              forceSelected={paging.page - 1}
              clickCallback={this.setFilterPage}
            />
          }
        </div>
    </div>;
  }
}

export default connect(selectors, actions)(Popular);
