import React, { Component } from 'react';
import punycode from 'punycode';
import './ResultsTable.css';
import results from './spider_result.json';
import screenshots from './screenshots.json';

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
    if (this.props.data.value) {
      return <td className='good'>Ja</td>;
    }
    return <CriteriumField keyProp='favicon' type='negative' title='Die Site hat kein Icon' />;
  }
}

class FeedField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Die Site verweist auf mind. einen RSS-/Atom-Feed' />
    }
    return <CriteriumField keyProp='feed' type='negative' title='Kein Link rel=alternate auf einen RSS-/Atom-Feed gefunden' />
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

class IPField extends Component {
  render() {
    if (this.props.ipaddresses && this.props.ipaddresses.length) {
      return <td key='ipaddresses' className='good'>{ this.props.ipaddresses }</td>;
    }
    return <td key='ipaddresses' className='bad'><IconBad title='Der Domainname lässt sich nicht in eine IP-Adresse auflösen' /></td>;
  }
}

class ResponseDurationField extends Component {
  render() {
    var className = 'bad';
    if (this.props.data.score > 0) {
      className = 'mediocre';
    }
    if (this.props.data.score > 0.5) {
      className = 'good';
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

    if (this.props.canonicalURLs && this.props.canonicalURLs.length > 0 && typeof screenshots[this.props.canonicalURLs[0]] !== 'undefined') {
      var mobileScreenshot = 'http://green-spider-screenshots.sendung.de/320x640/'+screenshots[this.props.canonicalURLs[0]];
      var desktopScreenshot = 'http://green-spider-screenshots.sendung.de/1500x1500/'+screenshots[this.props.canonicalURLs[0]];
      screenshotElements.push(<a key='mobile' className='screenshot tt' href={mobileScreenshot} target='_blank' title='Screenshot für Smartphone-Ansicht anzeigen'><i className='icon ion-md-phone-portrait'></i></a>);
      screenshotElements.push(<a key='desktop' className="screenshot tt" href={desktopScreenshot} target='_blank' title='Screenshot für Desktop-Ansicht anzeigen'><i className='icon ion-md-desktop'></i></a>);
    }

    return <td key='screenshot'>{ screenshotElements }</td>;
  }
}

class StateField extends Component {
  render() {
    return <td key='state'>{ this.props.state }</td>;
  }
}

class TypeField extends Component {
  render() {
    var label = this.props.level;
    if (label === 'DE:ORTSVERBAND') {
      label = 'OV';
    } else if (label === 'DE:KREISVERBAND') {
      label = 'KV';
    } else if (label === 'DE:REGIONALVERBAND') {
      label = 'RV';
    } else if (label === 'DE:BEZIRKSVERBAND') {
      label = 'BV';
    } else if (label === 'DE:LANDESVERBAND') {
      label = 'LV';
    }
    return <td key='type'>{ label }</td>;
  }
}

class URLField extends Component {
  
  trunc(s, length) {
    if (s.length > length) {
      s = s.substring(0, length) + '…';
    }
    return s;
  }

  render() {
    var displayURL = this.trunc(punycode.toUnicode(this.props.url), 45);
    return <td><a href={this.props.url} target="_blank" rel='noopener noreferrer'> { displayURL }</a></td>;
  }
}

class WWWOptionalField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='wwwoptional' type='positive' title='Die Site ist sowohl mit als auch ohne www. in der URL aufrufbar' />
    }
    return <CriteriumField keyProp='wwwoptional' type='negative' title='Die Site ist nicht sowohl mit als auch ohne www. in der URL aufrufbar' />
  }
}

class ResultsTable extends Component {
  render() {

    var rows = [];
    results.forEach(element => {
      console.log(element);

      var fields = [
        <TypeField level={element.meta.level} />,
        <StateField state={element.meta.state} />,
        <DistrictField district={element.meta.district} />,
        <CityField city={element.meta.city} />,
        <URLField url={element.input_url} />,
        <ScoreField score={element.score} />,
        <IPField ipaddresses={element.details.ipv4_addresses} />,
        <ReachableField data={element.result.SITE_REACHABLE} />,
        <ResponseDurationField data={element.result.HTTP_RESPONSE_DURATION} />,
        <FaviconField data={element.result.FAVICON} />,
        <HTTPSField data={element.result.HTTPS} />,
        <WWWOptionalField data={element.result.WWW_OPTIONAL} />,
        <CanonicalURLField data={element.result.CANONICAL_URL} />,
        <ResponsiveField data={element.result.RESPONSIVE} />,
        <FeedField data={element.result.FEEDS} />,
        <ScreenshotsField canonicalURLs={element.details.canonical_urls} />,
        <CMSField cms={element.details.cms} />,
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
            <th scope='col'>IP-Adresse</th>
            <th scope='col'>Erreichbar</th>
            <th scope='col'>Antwortzeit</th>
            <th scope='col'>Icon</th>
            <th scope='col'>HTTPS</th>
            <th scope='col'>www. optional</th>
            <th scope='col'>Kanonische URL</th>
            <th scope='col'>Responsive</th>
            <th scope='col'>Feed</th>
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
