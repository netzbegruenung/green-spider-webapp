/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './ResultsTable.css';
import punycode from 'punycode';


class CityField extends Component {
  render() {
    return <td key='city'>{ this.props.city }</td>;
  }
}

class DistrictField extends Component {
  render() {
    return <td key='district'>{ this.props.district }</td>;
  }
}

class ScoreField extends Component {
  render() {
    return <td key='score'>{ this.props.score }</td>;
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
    
    return <td key='state'><abbr title={this.props.state}>{label}</abbr></td>;
  }
}

class TypeField extends Component {
  render() {
    var label;
    if (this.props.level === 'DE:BUNDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        label = <abbr title='Grüne Jugend Bundesverband'>GJ BV</abbr>;
      } else {
        label = <abbr title='Bundesverband'>BV</abbr>;
      }
    } else if (this.props.level === 'DE:LANDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        label = <abbr title='Grüne Jugend Landesverband'>GJ LV</abbr>;
      } else {
        label = <abbr title='Landesverband'>LV</abbr>;
      }
    } else if (this.props.level === 'DE:REGIONALVERBAND') {
      label = <abbr title='Regionalverband'>RV</abbr>;
    } else if (this.props.level === 'DE:BEZIRKSVERBAND') {
      label = <abbr title='Bezirksverband'>BeV</abbr>;
    } else if (this.props.level === 'DE:KREISVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        label = <abbr title='Grüne Jugend Kreisverband'>GJ KV</abbr>;
      } else {
        label = <abbr title='Kreisverband'>KV</abbr>;
      }
    } else if (this.props.level === 'DE:ORTSVERBAND') {
      label = <abbr title='Ortsverband'>OV</abbr>;
    }
    return <td key='typefield'>{ label }</td>;
  }
}

class URLField extends Component {
  
  // truncation for too long URLs
  trunc(s, length) {
    if (s.length > length) {
      s = s.substring(0, length) + '…';
    }
    return s;
  }

  render() {
    var inputDisplayURL = this.trunc(punycode.toUnicode(this.props.inputURL), 45);

    // There is a canonical URL...
    if (typeof this.props.canonicalURLs !== 'undefined' && this.props.canonicalURLs !== null && this.props.canonicalURLs.length === 1) {

      // and it is the same as the input URL
      if (this.props.inputURL === this.props.canonicalURLs[0]) {
        return <td key='url'>→ <a href={this.props.inputURL} target="_blank" rel='noopener noreferrer'> { inputDisplayURL }</a></td>;
      }

      // canonical URL contains input URL (as prefix)
      if (this.props.canonicalURLs[0].indexOf(this.props.inputURL) === 0) {
        var targetLabel = '/' + this.props.canonicalURLs[0].substr(this.props.inputURL.length);
        return <td key='url'><a href={this.props.inputURL} target="_blank" rel='noopener noreferrer'> { inputDisplayURL }</a> → <a href={this.props.canonicalURLs[0]} rel='noopener noreferrer'>{targetLabel}</a></td>;
      }

      var targetDisplayURL = this.trunc(punycode.toUnicode(this.props.canonicalURLs[0]), 45);
      return (
        <td key='url'>
          <a href={this.props.inputURL} target="_blank" rel='noopener noreferrer'> { inputDisplayURL }</a><br />
          → <a href={this.props.canonicalURLs[0]} target="_blank" rel='noopener noreferrer'> { targetDisplayURL }</a>
        </td>
      );
    }

    // no canonical URL
    return <td key='url'><a href={this.props.inputURL} target="_blank" rel='noopener noreferrer'> { inputDisplayURL }</a></td>;
  }
}


class ResultsTable extends Component {
  render() {
    // sort results by score (descending)
    this.props.results.sort((a, b) => {
      return b.score - a.score;
    });

    var rows = [];
    this.props.results.forEach((element, index) => {

      var fields = [
        <TypeField key={'tf'+index} level={element.meta.level} type={element.meta.type} />,
        <StateField key={'sf'+index} state={element.meta.state} />,
        <DistrictField key={'df'+index} district={element.meta.district} />,
        <CityField key={'cf'+index} city={element.meta.city} />,
        <URLField key={'uf'+index} inputURL={element.input_url} canonicalURLs={element.resulting_urls} />,
        <ScoreField key={'scf'+index} score={element.score} />,
        (
          <td key={'link-'+index}>
            <Link to={`/sites/${ encodeURIComponent(element.input_url) }`}>Details</Link>
          </td>
        ),
      ];

      rows.push(<tr key={element.input_url}>{ fields }</tr>)
    });

    return (
      <table className='table ResultsTable'>
        <thead>
          <tr>
            <th scope='col'>Typ</th>
            <th scope='col'>Land</th>
            <th scope='col'>Kreis</th>
            <th scope='col'>Stadt</th>
            <th scope='col'>URL</th>
            <th scope='col'>Score</th>
            <th scope='col'>Link</th>
          </tr>
        </thead>
        <tbody>{ rows }</tbody>
      </table>
    );
  }
}

export default ResultsTable;
