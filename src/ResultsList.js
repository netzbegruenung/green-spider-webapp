/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LocationLabel from './LocationLabel';
import './ResultsList.css';
import punycode from 'punycode';
import chroma from 'chroma-js';


class ScoreField extends Component {
  render() {
    var ratio = this.props.score / this.props.maxScore;
    var bg = chroma.mix('#8D5335', '#75B66B', ratio);
    return <span className='ScoreField align-self-center' style={{backgroundColor: bg.hex()}}>{ this.props.score }</span>;
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
  render() {
    // sort results by score (descending)
    this.props.results.sort((a, b) => {
      return b.score - a.score;
    });

    var rows = [];
    this.props.results.forEach((element, index) => {

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
    });

    return rows;
  }
}

export default ResultsList;
