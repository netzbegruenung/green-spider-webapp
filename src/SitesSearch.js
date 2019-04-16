import { Favorites } from './lib/Favorites';
import FavoritesList from './FavoritesList';
import axios from 'axios';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResultItem from './SearchResultItem';
import './SitesSearch.css';
import history from './history';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';


class SitesSearch extends Component {
  itemsPerPage = 20;
  favs = new Favorites();

  state = {
    loading: false,
    searchResultItems: [],
    query: null,
    userQuery: '',
    hits: 0,
    pageLoaded: null,
    favorites: [],
  };

  componentDidMount() {
    // init search from URL
    let params = (new URL(document.location)).searchParams;
    if (typeof params === 'object') {
      let q = params.get('q');
      if (q !== null && q !== '') {
        this.doSearch(q);
      }
    }

    // load favorites
    let fav = this.favs.getAll();
    if (fav.length > 0) {
      this.setState({favorites: fav});
    }
  }

  /**
   * Performs the search based user input or URL parameter
   * and fetches the first results page
   */
  doSearch = (q) => {
    var minTermLength = 1;
    
    if (q === '') {
      history.push(`/`);
    } else {
      history.push(`/?q=${q}`);
    }

    if (q.length > minTermLength) {
      // append '*' if last character is not
      var esQuery = q.trim();
      if (esQuery.substr(esQuery.length - 1) !== '*') {
        esQuery += '*';
      }

      if (q !== this.state.query) {
        this.setState({
          query: esQuery,
          userQuery: q,
          searchResultItems: [],
          pageLoaded: null,
        });
      } else {
        this.setState({
          query: esQuery,
          userQuery: q,
        });
      }

      this.getResultsPage(esQuery, 0);
    } else if (q.length <= minTermLength) {
      this.setState({
        query: null,
        userQuery: q,
        hits: 0,
        searchResultItems: [],
      });
    }
  };

  getResultsPage = (term, page) => {
    var from = page * this.itemsPerPage;
    axios.get('/api/v1/spider-results/query/?from=' + from + '&q=' + encodeURI(term))
        .then((response) => {
          var allResultItems = [];
          
          // if the term has not changed, append result items
          if (term === this.state.query) {
            allResultItems = this.state.searchResultItems;
          }

          response.data.hits.hits.forEach((item) => {
            allResultItems.push(item);
          });

          this.setState({
            searchResultItems: allResultItems,
            hits: response.data.hits.total,
            pageLoaded: page,
          });
        });
  }

  loadFunc = (pageNum) => {
    this.getResultsPage(this.state.query, pageNum);
  };

  hasMoreFunc = () => {
    var result = (this.itemsPerPage * this.state.pageLoaded) < this.state.hits;
    return result;
  };

  render() {
    var rows = [];

    if (this.state.searchResultItems.length > 0) {
      this.state.searchResultItems.forEach((site) => {
        rows.push(<SearchResultItem key={site._source.url} site={site} />);
      });
    }

    var placeholder = (
      <div className='row placeholder' key='placeholder'>
        <div className='col-12 text-center'>
          Vergleiche Deine GRÜNE Website mit { this.props.sitesCount ? this.props.sitesCount : 'vielen'} anderen und erfahre, was Du verbessern kannst.
        </div>
      </div>
    );

    var improve = (
      <div className='row improve' key='improve'>
        <div className='col-12 text-center'>
          GREEN SPIDER ist freie Software. <a href='https://github.com/netzbegruenung/green-spider/'>Hilf mit, sie zu verbessern!</a>
        </div>
      </div>
    );

    var favorites = null;
    if (this.state.favorites.length > 0) {
      favorites = (
        <FavoritesList key='favs' urls={this.state.favorites} sizeLimit={this.itemsPerPage}/>
      );
    }

    var noresult = [favorites, placeholder, improve];
    var resultFound = (
      <div className='row results'>
          <div className='col-12'>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadFunc}
              hasMore={this.hasMoreFunc()}
              loader={<div className="loader" key={0}>Lade weitere Treffer...</div>}
              threshold={250}
            >
              {rows}
            </InfiniteScroll>
          </div>
        </div>
    );

    return (
      <div>
        <div className='row searchInputRow'>
          <div className='col-12'>
            <SearchForm
              callback={this.doSearch}
              value={this.state.userQuery}
              hits={this.state.hits} />
          </div>
        </div>
        { rows.length ? resultFound : noresult }
      </div>
    );
  }
}

SitesSearch.propTypes = {
  sitesCount: PropTypes.number,
};

export default SitesSearch;
