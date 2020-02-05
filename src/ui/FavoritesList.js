import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchResultItem from './SearchResultItem';
import { APIEndpoint } from '../index';

class FavoritesList extends Component {
  state = {
    loading: true,
    sites: [],
    total: null,
  };

  componentDidMount() {
    // load sites from URLs
    let queryTermParts = this.props.urls.map((url) => {
      return 'url:"' + url + '"';
    });
    let queryTerm = queryTermParts.join(' OR ');
    axios.get(APIEndpoint + '/api/v1/spider-results/query/?q=' + encodeURI(queryTerm))
      .then((response) => {
        if (response.data.hits.total > 0 && response.data.hits.hits.length > 0) {
          this.setState({
            loading: false,
            sites: response.data.hits.hits,
            total: response.data.hits.total,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='row favs'>
          <div className='col-12 text-center'>Lade Favoriten</div>
        </div>
      );
    }

    return (
      <div className='row favs'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-12'>
              <h2>Deine Favoriten</h2>
            </div>
          </div>
          {
            this.state.sites.map((site) => {
              return <SearchResultItem key={site._source.url} site={site} />;
            })
          }
          {
            this.state.sites.length > this.props.sizeLimit ?
            (
              <div className='row'>
                <div className='col-12 text-center truncate-info'>
                  Es werden nur {this.props.sizeLimit} Favoriten angezeigt.
                </div>
              </div>
            )
            : null
          }
        </div>
      </div>
    );
          
  }
}

FavoritesList.propTypes = {
  urls: PropTypes.array.isRequired,
  sizeLimit: PropTypes.number.isRequired,
};

export default FavoritesList;