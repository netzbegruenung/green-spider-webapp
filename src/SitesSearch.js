import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LocationLabel from './LocationLabel';
import SearchForm from './SearchForm';
import ScoreField from './ScoreField';
import URLField from './URLField';
import './SitesSearch.css';
import history from './history';
import InfiniteScroll from 'react-infinite-scroller';


class SitesSearch extends Component {
  itemsPerPage = 20;

  state = {
    loading: false,
    searchResultItems: [],
    query: null,
    userQuery: '',
    hits: 0,
    pageLoaded: null,
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
        var row = (
          <Link key={site._source.url} to={`/sites/${ encodeURIComponent(site._source.url) }`} className='SitesSearch'>
            <div className='SitesSearch row'>
              <div className='col-9 col-sm-10 col-md-10'>
                <LocationLabel level={site._source.meta.level} type={site._source.meta.type} district={site._source.meta.district} city={site._source.meta.city} state={site._source.meta.state} truncate={true} />
                <URLField url={site._source.url} link={false} />
              </div>
              <div className='col-3 col-sm-2 col-md-2 d-flex'>
                <ScoreField score={site._source.score} maxScore={15} />
              </div>
            </div>
          </Link>
        );

        rows.push(row);
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

    var noresult = [placeholder, improve];
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

export default SitesSearch;
