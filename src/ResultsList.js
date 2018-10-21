/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './ResultsList.css';
import punycode from 'punycode';
import chroma from 'chroma-js';


class ScoreField extends Component {
  render() {
    var ratio = this.props.score / this.props.maxScore;
    var bg = chroma.mix('#8D5335', '#75B66B', ratio);
    return <span className='ScoreField' style={{backgroundColor: bg.hex()}}>{ this.props.score }</span>;
  }
}

class StateField extends Component {
  render() {
    var label = this.props.state;

    switch (this.props.state) {
      case 'Nordrhein-Westfalen':
        label = 'NW';
        break;
      case 'Rheinland-Pfalz':
        label = 'RP';
        break;
      case 'Niedersachsen':
        label = 'NS';
        break;
      case 'Baden-Württemberg':
        label = 'BW';
        break;
      case 'Bayern':
        label = 'BY';
        break;
      case 'Berlin':
        label = 'BE';
        break;
      case 'Brandenburg':
        label = 'BB';
        break;
      case 'Bremen':
        label = 'HB';
        break;
      case 'Hamburg':
        label = 'HB';
        break;
      case 'Hessen':
        label = 'HE';
        break;
      case 'Mecklenburg-Vorpommern':
        label = 'MV';
        break;
      case 'Saarland':
        label = 'SL';
        break;
      case 'Sachsen':
        label = 'SN';
        break;
      case 'Sachsen-Anhalt':
        label = 'SA';
        break;
      case 'Schleswig-Holstein':
        label = 'SH';
        break;
      case 'Thüringen':
        label = 'SN';
        break;
      default:
        label = this.props.state;
    }
    
    return <abbr title={this.props.state}>{label}</abbr>;
  }
}

class TypeField extends Component {
  render() {
    var label = '';
    var title = '';

    if (this.props.level === 'DE:BUNDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Bundesverband';
        label = 'GJ BV';
      } else {
        title = 'Bundesverband';
        label = 'BV';
      }
    } else if (this.props.level === 'DE:LANDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Landesverband';
        label = 'GJ LV';
      } else {
        title = 'Landesverband';
        label = 'LV';
      }
    } else if (this.props.level === 'DE:REGIONALVERBAND') {
      title = 'Regionalverband';
      label = 'RV';
    } else if (this.props.level === 'DE:BEZIRKSVERBAND') {
      title = 'Bezirksverband';
      label = 'BeV';
    } else if (this.props.level === 'DE:KREISVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Kreisverband';
        label = 'GJ KV';
      } else {
        title = 'Kreisverband';
        label = 'KV';
      }
    } else if (this.props.level === 'DE:ORTSVERBAND') {
      title = 'Ortsverband';
      label = 'OV';
    }

    return <abbr className='TypeField' title={title}>{label}</abbr>;
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
  
  // truncation for too long URLs
  trunc(s, length) {
    if (s.length > length) {
      s = s.substring(0, length) + '…';
    }
    return s;
  }

  render() {
    var labelURL = this.trunc(this.displayURL(punycode.toUnicode(this.props.inputURL)), 40);
    return <span className='URLField'>{ labelURL }</span>;
  }
}

class LocationLabel extends Component {
  render() {
    var label = "";
    var type = <TypeField level={this.props.level} type={this.props.type} />;
    
    if (this.props.city === null && this.props.district !== null) {
      label = this.props.district;
      return <span className='LocationLabel'>{type} {label}, <StateField state={this.props.state} /></span>;
    } else if (this.props.city !== null && this.props.district === null) {
      label = this.props.city;
      return <span className='LocationLabel'>{type} {label}, <StateField state={this.props.state} /></span>;
    } else if (this.props.city !== null && this.props.district !== null) {
      label = `${this.props.city}, ${this.props.district}`;
      return <span className='LocationLabel'>{type} {label}, <StateField state={this.props.state} /></span>;
    }
    
    label = this.props.state;
    return <span className='LocationLabel'>{type} {label}</span>;
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
        <Link key={element.input_url} to={`/sites/${ encodeURIComponent(element.input_url) }`}>
          <div className='ResultsList row'>
            <div className='col-9'>
              <LocationLabel level={element.meta.level} type={element.meta.type} district={element.meta.district} city={element.meta.city} state={element.meta.state} />
              <URLField inputURL={element.input_url} canonicalURLs={element.resulting_urls} />
            </div>
            <div className='col-3'>
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
