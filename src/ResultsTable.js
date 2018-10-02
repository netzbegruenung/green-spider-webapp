/**
 * The ResultsTable component is a table of results for all websites we checked.
 */

import React, { Component } from 'react';
import punycode from 'punycode';
import './ResultsTable.css';
import LazyLoad from 'react-lazy-load';
import _ from 'underscore';

class IconGood extends Component {
  render() {
    return <i className='icon ion-md-checkmark-circle' title={this.props.title}></i>;
  }
}

class IconBad extends Component {
  render() {
    return <i className='icon ion-md-close-circle' title={this.props.title}></i>;
  }
}

class CriteriumField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <td key={this.props.keyProp} className='good'><IconGood title={this.props.title}/></td>;
    } else {
      return <td key={this.props.keyProp} className='bad'><IconBad title={this.props.title}/></td>;
    }
  }
}

class CanonicalURLField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='canonicalurl' type='positive' title='Verschiedene URL-Varianten werden auf eine einzige umgeleitet' />
    }
    return <CriteriumField keyProp='canonicalurl' type='negative' title='Verschiedene URL-Varianten werden nicht auf eine einzige umgeleitet' />
  }
}

class CityField extends Component {
  render() {
    return <td key='city'>{ this.props.city }</td>;
  }
}

class CMSField extends Component {
  render() {
    return <td key='cms'>{ this.props.cms }</td>;
  }
}

class DistrictField extends Component {
  render() {
    return <td key='district'>{ this.props.district }</td>;
  }
}

class FaviconField extends Component {
  render() {
    var icons = [];
    if (typeof this.props.icons !== 'undefined') {
      icons = Object.values(this.props.icons);
    }

    if (this.props.data.value) {
      // icon is available for display
      if (icons.length) {
        return (
          <td key='favicon' className='good'>
            <LazyLoad width={32} height={32}>
              <img src={'/siteicons/' + icons[0]} width={32} height={32} alt='Icon' />
            </LazyLoad>
          </td>
        );
      }
      return <CriteriumField keyProp='favicon' type='positive' title='Die Site hat ein Icon, das jedoch nicht herunter geladen werden konnte.' />;
    }
    return <CriteriumField keyProp='favicon' type='negative' title='Die Site hat kein Icon' />;
  }
}

class FeedField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Die Site verweist auf mind. einen RSS-/Atom-Feed' />;
    }
    return <CriteriumField keyProp='feed' type='negative' title='Kein Link rel=alternate auf einen RSS-/Atom-Feed gefunden' />;
  }
}

class FontField extends Component {
  render() {
    if (typeof this.props.data !== 'undefined') {
      if (this.props.data.value) {
        return <CriteriumField keyProp='font' type='positive' title='Die Site verwendet die Schriftart Arvo' />;
      }
      return <CriteriumField keyProp='font' type='negative' title='Die Site verwendet die Schriftart Arvo nicht' />;
    }
    return <td key='font'></td>;
  }
}

class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />
    }
    return <CriteriumField keyProp='https' type='negative' title='Die Site ist nicht über HTTPS erreichbar (-2 Punkte)' />
  }
}

class ResponseDurationField extends Component {
  render() {
    var className = 'bad text';
    if (this.props.data.score > 0) {
      className = 'mediocre text';
    }
    if (this.props.data.score > 0.5) {
      className = 'good text';
    }

    if (this.props.data.value) {
      return <td key='duration' className={className}>{ this.props.data.value } ms</td>;
    }
    return <CriteriumField keyProp='duration' type='negative' title='Keine Angabe' />
  }
}

class ReachableField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='reachable' type='positive' title='Die Site war beim Test erreichbar' />
    }
    return <CriteriumField keyProp='reachable' type='negative' title='Die Site war beim letzten Test nicht erreichbar' />
  }
}

class ResponsiveField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='responsive' type='positive' title='Die Site ist offenbar auf mobilen Endgeräten nutzbar' />
    }
    return <CriteriumField keyProp='responsive' type='negative' title='Die Site scheint mobile Endgeräte nicht zu unterstützen' />
  }
}

class ScoreField extends Component {
  render() {
    return <td key='score'>{ this.props.score }</td>;
  }
}

class ScreenshotsField extends Component {
  render() {
    var screenshotElements = [];
    var baseURL = 'http://green-spider-screenshots.sendung.de';


    if (this.props.screenshot !== null && typeof this.props.screenshot !== 'undefined') {
      var mobileScreenshot = baseURL + '/360x640/' + this.props.screenshot;
      var desktopScreenshot = baseURL + '/1500x1500/' + this.props.screenshot;
      screenshotElements.push(<a key='mobile' className='screenshot tt' href={mobileScreenshot} target='_blank' title='Screenshot für Smartphone-Ansicht anzeigen'><i className='icon ion-md-phone-portrait'></i></a>);
      screenshotElements.push(<a key='desktop' className="screenshot tt" href={desktopScreenshot} target='_blank' title='Screenshot für Desktop-Ansicht anzeigen'><i className='icon ion-md-desktop'></i></a>);
    }

    return <td key='screenshot'>{ screenshotElements }</td>;
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

class WWWOptionalField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='wwwoptional' type='positive' title='Die Site ist sowohl mit als auch ohne www. in der URL aufrufbar' />;
    }
    return <CriteriumField keyProp='wwwoptional' type='negative' title='Die Site ist nicht sowohl mit als auch ohne www. in der URL aufrufbar' />;
  }
}

class ScriptErrorsField extends Component {
  render() {
    if (typeof this.props.data !== 'undefined') {
      if (this.props.data.value) {
        return <CriteriumField keyProp='noscripterrors' type='positive' title='Es wurden keine JavaScript-Fehler festgestellt' />;
      }
      return <CriteriumField keyProp='noscripterrors' type='negative' title='Auf der Seite wurden JavaScript-Fehler gefunden' />;
    }
    return <td key='noscripterrors'></td>;
  }
}

class NetworkErrorsField extends Component {
  render() {
    if (typeof this.props.data !== 'undefined') {
      if (this.props.data.value) {
        return <CriteriumField keyProp='nonetworkerrors' type='positive' title='Es wurden keine Probleme beim Laden verknüpfter Ressourcen festgestellt' />;
      }
      return <CriteriumField keyProp='nonetworkerrors' type='negative' title='Beim Laden verknüpfter Ressourcen sind Fehler aufgetreten' />;
    }
    return <td key='nonetworkerrors'></td>;
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

      var screenshots;
      if (typeof element.resulting_urls !== 'undefined' &&
          element.resulting_urls !== null &&
          typeof this.props.screenshots[element.resulting_urls[0]] !== 'undefined' &&
          this.props.screenshots[element.resulting_urls[0]] !== null) {
        screenshots = this.props.screenshots[element.resulting_urls[0]];
      }

      var fields = [
        <TypeField key={'tf'+index} level={element.meta.level} type={element.meta.type} />,
        <StateField key={'sf'+index} state={element.meta.state} />,
        <DistrictField key={'df'+index} district={element.meta.district} />,
        <CityField key={'cf'+index} city={element.meta.city} />,
        <URLField key={'uf'+index} inputURL={element.input_url} canonicalURLs={element.resulting_urls} />,
        <ScoreField key={'scf'+index} score={element.score} />,
        <ReachableField key={'rf'+index} data={element.rating.SITE_REACHABLE} />,
        <ResponseDurationField key={'rdf'+index} data={element.rating.HTTP_RESPONSE_DURATION} />,
        <FaviconField key={'fif'+index} data={element.rating.FAVICON} icons={element.icons} />,
        <HTTPSField key={'htpsf'+index} data={element.rating.HTTPS} />,
        <WWWOptionalField key={'wwwof'+index} data={element.rating.WWW_OPTIONAL} />,
        <CanonicalURLField key={'curlf'+index} data={element.rating.CANONICAL_URL} />,
        <ResponsiveField key={'rspf'+index} data={element.rating.RESPONSIVE} />,
        <FontField key={'font'+index} data={element.rating.USE_SPECIFIC_FONTS} />,
        <FeedField key={'ff'+index} data={element.rating.FEEDS} />,
        <ScriptErrorsField key={'se'+index} data={element.rating.NO_SCRIPT_ERRORS} />,
        <NetworkErrorsField key={'ne'+index} data={element.rating.NO_NETWORK_ERRORS} />,
        <ScreenshotsField key={'ssf'+index} screenshot={screenshots} />,
        <CMSField key={'cmsf'+index} cms={_.flatten(_.map(element.checks.generator, function(v, url){ return v;}))} />,
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
            <th scope='col'>Erreichbar</th>
            <th scope='col'>Antwortzeit</th>
            <th scope='col'>Icon</th>
            <th scope='col'>HTTPS</th>
            <th scope='col'>www. optional</th>
            <th scope='col'>Kanonische URL</th>
            <th scope='col'>Responsive</th>
            <th scope='col'>Arvo</th>
            <th scope='col'>Feed</th>
            <th scope='col'>Script-Fehler</th>
            <th scope='col'>Netzwerk-Fehler</th>
            <th scope='col'>Screenshots</th>
            <th scope='col'>CMS</th>
          </tr>
        </thead>
        <tbody>{ rows }</tbody>
      </table>
    );
  }
}

export default ResultsTable;
