/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import './ResultsList.css';
import punycode from 'punycode';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      lastQuery: '',
      hits: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var minTermLength = 1;
    var q = event.target.value;
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

  handleSubmit(event) {
    console.log('A name was submitted:', this.state.value);
    event.preventDefault();
  }

  render() {
    var hitsInfo = <span />;
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

class URLField extends Component {
  displayURL(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    return null;
  }

  render() {
    var labelURL = this.displayURL(punycode.toUnicode(this.props.inputURL));
    return <span className='URLField text-truncate'>{ labelURL }</span>;
  }
}


class ResultsList extends Component {
  constructor(props) {
    super(props);

    var sitesHash = {};
    for (var site of props.results) {
      sitesHash[site.input_url] = site;
    }

    this.state = {
      sitesHash: sitesHash,
      searchResult: null,
    };

    this.searchResultCallback = this.searchResultCallback.bind(this);
  }

  searchResultCallback(result) {
    this.setState({
      searchResult: result,
    });
  }

  render() {
    var rows = [];

    if (this.state.searchResult) {
      for (var site of this.state.searchResult) {
        var element = this.state.sitesHash[site.ref];

        var row = (
          <Link key={element.input_url} to={`/sites/${ encodeURIComponent(element.input_url) }`} className='ResultsList'>
            <div className='ResultsList row'>
              <div className='col-9 col-sm-10 col-md-10'>
                <LocationLabel level={element.meta.level} type={element.meta.type} district={element.meta.district} city={element.meta.city} state={element.meta.state} truncate={true} />
                <URLField inputURL={element.input_url} canonicalURLs={element.resulting_urls} />
              </div>
              <div className='col-3 col-sm-2 col-md-2 d-flex'>
                <ScoreField score={element.score} maxScore={13} />
              </div>
            </div>
          </Link>
        );

        rows.push(row);
      }
    }

    var placeholder = (
      <div className='row placeholder'>
        <div className='col-12 text-center'>
          Vergleiche Deine GRÜNE Website mit {this.props.results.length} anderen und erfahre, was Du verbessern kannst.
        </div>
      </div>
    );

    var improve = (
      <div className='row improve'>
        <div className='col-12 text-center'>
          GREEN SPIDER ist freie Software. <a href='https://github.com/netzbegruenung/green-spider/'>Hilf mit, sie zu verbessern!</a>
        </div>
      </div>
    );

    var noresult = [placeholder, improve];
    var resultFound = (
      <div className='row'>
          <div className='col-12'>
            {rows}
          </div>
        </div>
    );

    return (
      <div>
        <div className='row searchInputRow'>
          <div className='col-12'>
            <SearchField searchIndex={this.props.searchIndex} callback={this.searchResultCallback} />
          </div>
        </div>
        { rows.length ? resultFound : noresult }
      </div>
    );
  }
}

export default ResultsList;
