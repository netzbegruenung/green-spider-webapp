/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import URLField from './URLField';
import './SitesSearch.css';
import history from './history';


class SitesSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      sitesHash: null,
      searchIndex: null,
      searchResult: null,
    };

    this.searchResultCallback = this.searchResultCallback.bind(this);
  }

  searchResultCallback(result) {
    // sort result by score
    if (result) {
      result.sort((a, b) => (this.props.sitesHash[b.ref].score > this.props.sitesHash[a.ref].score) ? 1 : ((this.props.sitesHash[a.ref].score > this.props.sitesHash[b.ref].score) ? -1 : 0));
    }
    this.setState({searchResult: result});
  }

  render() {
    var rows = [];

    if (this.state.searchResult) {
      for (var site of this.state.searchResult) {
        var element = this.props.sitesHash[site.ref];

        var row = (
          <Link key={element.input_url} to={`/sites/${ encodeURIComponent(element.input_url) }`} className='SitesSearch'>
            <div className='SitesSearch row'>
              <div className='col-9 col-sm-10 col-md-10'>
                <LocationLabel level={element.meta.level} type={element.meta.type} district={element.meta.district} city={element.meta.city} state={element.meta.state} truncate={true} />
                <URLField url={element.input_url} link={false} />
              </div>
              <div className='col-3 col-sm-2 col-md-2 d-flex'>
                <ScoreField score={element.score} maxScore={15} />
              </div>
            </div>
          </Link>
        );

        rows.push(row);
      }
    }

    var placeholder = (
      <div className='row placeholder' key='placeholder'>
        <div className='col-12 text-center'>
          Vergleiche Deine GRÜNE Website mit { this.props.sitesHash ? Object.keys(this.props.sitesHash).length : 'vielen'} anderen und erfahre, was Du verbessern kannst.
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
            {rows}
          </div>
        </div>
    );

    return (
      <div>
        <div className='row searchInputRow'>
          <div className='col-12'>
            { this.props.searchIndex ? 
            <SearchField searchIndex={this.props.searchIndex} callback={this.searchResultCallback} />
            :
            <SearchFieldPlaceholder />
            }
          </div>
        </div>
        { rows.length ? resultFound : noresult }
      </div>
    );
  }
}


class SearchField extends Component {
  state = {
    value: '',
    lastQuery: '',
    hits: 0,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

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

  doSearch(q) {
    var minTermLength = 1;
    
    if (q === '') {
      history.push(`/`);
    } else {
      history.push(`/?q=${q}`);
    }

    this.setState({value: q});

    if (q.length > minTermLength && q !== this.state.lastQuery) {
      var searchResult = this.props.searchIndex.search(q + "*");
      this.setState({
        lastQuery: q,
        hits: searchResult.length,
      });
      this.props.callback(searchResult);
    } else if (q.length <= minTermLength) {
      this.setState({
        lastQuery: q,
        hits: 0,
      });
      this.props.callback(null);
    }
  }

  handleChange(event) {
    var q = event.target.value;
    this.doSearch(q);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    var hitsInfo = <span>&nbsp;</span>;
    if (this.state.lastQuery !== '') {
      hitsInfo = <span>{this.state.hits} Treffer</span>;
    }

    return (
      <div className='col-12'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='queryInput'>Finde Deine Site</label>
            <input className='form-control' type='search' name='query' placeholder="Finde Deine Site" value={this.state.value} onChange={this.handleChange} id='queryInput' />
            <small className='form-text'>{hitsInfo}</small>
          </div>
        </form>
      </div>
    );
  }
}

class SearchFieldPlaceholder extends Component {
  render() {
    return (
      <div className='col-12'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='queryInput'>Finde Deine Site</label>
            <input className='form-control' type='search' name='query' placeholder="Daten werden geladen..." value={this.props.value} disabled={true} />
            <small className='form-text'>&nbsp;</small>
          </div>
        </form>
      </div>
    );
  }
}


export default SitesSearch;
