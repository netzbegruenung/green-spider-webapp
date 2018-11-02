import React, { Component } from 'react';
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import { TypeField, StateField } from './LocationLabel';
import './SiteDetailsPage.css';
import axios from 'axios';
import punycode from 'punycode';
import screenshots from './screenshots.json';


class SiteDetailsPage extends Component {
  state = {
    isLoading: true,
    site: null,
    url: null,
  };

  componentDidMount() {
    // ensure that this view is opened at the top
    // when coming from the SiteSearch
    window.scrollTo(0, 0);

    // load data
    let url = this.props.match.match.params.siteId;

    axios.get(`/api/v1/spider-results/site?url=${url}`)
      .then((response) => {
        // handle success
        this.setState({
          isLoading: false,
          site: response.data,
          url: decodeURIComponent(url),
        });
      })
      .catch((error) => {
        // handle error
        console.error(error);
        this.setState({isLoading: false});
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    if (this.state.isLoading) {
      // TODO: etwas schöner machen...
      return <div></div>;
    }

    if (this.state.site !== null) {
      return (
        <div className='SiteDetailsPage'>
          <h1>
            <LocationLabel brief={false} level={this.state.site.meta.level} 
                         type={this.state.site.meta.type} 
                         district={this.state.site.meta.district}
                         city={this.state.site.meta.city}
                         state={this.state.site.meta.state} />
          </h1>

          <p><SiteIcon site={this.state.site} /> <a href={ this.state.url } rel='noopener noreferrer' target='_blank'>{ punycode.toUnicode(this.state.url) }</a></p>

          <hr />

          <ScoreComparisonWidget allSites={this.props.sitesHash} thisSite={this.state.site} maxScore={13} />

          <hr />
          
          <Screenshots urls={this.state.site.checks.url_canonicalization} />

          <hr />

          <div className='row'>
            <div className='col'>
              <CMSInfo site={this.state.site} />
            </div>
          </div>

          <hr />

          <ReachableField data={this.state.site.rating.SITE_REACHABLE} />
          <CanonicalURLField data={this.state.site.rating.CANONICAL_URL} />
          <HTTPSField data={this.state.site.rating.HTTPS} />
          <WWWOptionalField data={this.state.site.rating.WWW_OPTIONAL} />
          <FaviconField data={this.state.site.rating.FAVICON} />
          <ResponsiveField data={this.state.site.rating.RESPONSIVE} />
          <FontField data={this.state.site.rating.USE_SPECIFIC_FONTS} />
          <FeedField data={this.state.site.rating.FEEDS} />
          <ScriptErrorsField data={this.state.site.rating.NO_SCRIPT_ERRORS} />
          <NetworkErrorsField data={this.state.site.rating.NO_NETWORK_ERRORS} />
          <ResponseDurationField data={this.state.site.rating.HTTP_RESPONSE_DURATION} />

        </div>
      )
    } else {
      return (
        <div className='SiteDetailsPage'>
          <h1>{ this.url }</h1>

          <p>Daten werden geladen...</p>

        </div>
      )
    }
  }
}

class IconGood extends Component {
  render() {
    return <i className='icon ion-md-checkmark-circle'></i>;
  }
}

class IconBad extends Component {
  render() {
    return <i className='icon ion-md-close-circle'></i>;
  }
}

class CriteriumField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <div key={this.props.keyProp} className='good'><IconGood /> {this.props.title}</div>;
    } else {
      return <div key={this.props.keyProp} className='bad'><IconBad /> {this.props.title}</div>;
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

class CMSInfo extends Component {
  render() {
    var wellknownCMS = {
      'typo3': <a href='https://typo3.org/' target='_blank' rel='noopener noreferrer'>Typo3</a>,
      'typo3-gcms': <a href='https://gruenes-cms.de/' target='_blank' rel='noopener noreferrer'>Grünes CMS (Typo3)</a>,
      'typo3-gruene': <a href='https://typo3-gruene.de/' target='_blank' rel='noopener noreferrer'>Typo3 Grüne</a>,
      'wordpress': <a href='https://wordpress.org/' target='_blank' rel='noopener noreferrer'>Wordpress</a>,
      'wordpress-urwahl': <a href='https://www.urwahl3000.de/' target='_blank' rel='noopener noreferrer'>Wordpress mit Urwahl3000</a>,
      'wordpress-josephknowsbest': <a href='https://github.com/kre8tiv/Joseph-knows-best' target='_blank' rel='noopener noreferrer'>Wordpress mit Joseph Knows Best</a>,
    };

    if (typeof this.props.site === 'undefined' || this.props.site === null) {
      return <span />;
    }
    if (Object.keys(this.props.site.checks.generator).length === 0) {
      return <span />;
    }

    var url = Object.keys(this.props.site.checks.generator)[0];
    
    var label = this.props.site.checks.generator[url];
    if (typeof wellknownCMS[label] !== 'undefined') {
      label = wellknownCMS[label];
    }

    return <span className='CMSInfo'>Die Site wird erstellt mit { label }</span>;
  }
}


class FaviconField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='favicon' type='positive' title='Die Site hat ein Icon.' />;
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
    return <div></div>;
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
    var icon = <i className='icon ion-md-speedometer'></i>;
    var className = 'bad text';
    if (this.props.data.score > 0) {
      className = 'mediocre text';
    }
    if (this.props.data.score > 0.5) {
      className = 'good text';
    }

    if (this.props.data.value) {
      return <div className={className}>{icon} Server Antwortzeit: { this.props.data.value } ms</div>;
    }
    return <CriteriumField keyProp='duration' type='negative' title='Server Antwortzeit: Keine Angabe' />
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


class Screenshots extends Component {
  render() {
    var baseURL = 'http://green-spider-screenshots.sendung.de';

    let pageScreenshot;
    if (this.props.urls !== null && this.props.urls.length > 0) {
      if (typeof screenshots[this.props.urls[0]] !== 'undefined' &&
          screenshots[this.props.urls[0]] !== null) {
            pageScreenshot = screenshots[this.props.urls[0]];
      }
    }
    
    if (pageScreenshot !== null) {
      var mobileScreenshot = baseURL + '/360x640/' + pageScreenshot;
      var desktopScreenshot = baseURL + '/1500x1500/' + pageScreenshot;
      
      var mobile = <a className='screenshot' href={mobileScreenshot} target='_blank' title='Screenshot für Smartphone-Ansicht anzeigen'>
        <img className='screenshot' src={mobileScreenshot} width='100%' alt='Mobile Screenshot' />
      </a>;

      var desktop = <a className='screenshot' href={desktopScreenshot} target='_blank' title='Screenshot für Desktop-Ansicht anzeigen'>
        <img className='screenshot' src={desktopScreenshot} width='100%' alt='Desktop Screenshot' />
      </a>;

      return (<div className='row d-flex align-items-stretch'>
        <div className='col-3'>{mobile}</div>
        <div className='col-9'>{desktop}</div>
      </div>);
    }

    return <div>Aktuell sind keine Screenshots vorhanden</div>;
  }
}

class SiteIcon extends Component {
  render() {
    if (this.props.site === null) {
      return <span />;
    }

    var src;
    var url;
    if (typeof this.props.site.checks.html_head === 'object') {
      url = Object.keys(this.props.site.checks.html_head)[0];
    }

    if (typeof this.props.site.checks.html_head[url].link_icon !== 'undefined' &&
    this.props.site.checks.html_head[url].link_icon !== null &&
    this.props.site.checks.html_head[url].link_icon !== '') {
      src = this.props.site.checks.html_head[url].link_icon;
    }
    
    if (src) {
      return <img className='SiteIcon' src={src} width={32} height={32} alt='Icon' />;
    }

    return <span />;
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
    return <div></div>;
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
    return <div></div>;
  }
}

class ScoreComparisonWidget extends Component {
  calculateIndizes() {
    var countAll = 0;
    var countType = 0;
    var countState = 0;
    var indexAll = 0;
    var indexSiteType = 0;
    var indexState = 0;
    for (var url of Object.keys(this.props.allSites)) {
      countAll++;

      var site = this.props.allSites[url];

      if (site.meta.type === this.props.thisSite.meta.type && site.meta.level === this.props.thisSite.meta.level) {
        countType++;
      }
      if (site.meta.state === this.props.thisSite.meta.state) {
        countState++;
      }

      if (site.score < this.props.thisSite.score) {
        indexAll++;
        if (site.meta.type === this.props.thisSite.meta.type && site.meta.level === this.props.thisSite.meta.level) {
          indexSiteType++;
        }
        if (site.meta.state === this.props.thisSite.meta.state) {
          indexState++;
        }
      }
    }

    indexAll = indexAll / countAll;
    indexSiteType = indexSiteType / countType;
    indexState = indexState / countState;

    return {
      all: indexAll,
      siteType: indexSiteType,
      state: indexState
    }
  }

  render() {
    if (this.props.allSites === null) {
      return <div className='row d-flex'></div>;
    }

    var index = this.calculateIndizes();

    return (
      <div className='row d-flex'>
        <div className='col-4 align-self-center'>
          Punkte: <ScoreField score={this.props.thisSite.score} maxScore={this.props.maxScore} />
        </div>
        <div className='col-8 align-self-center'>
          <div>Besser als { Math.round(index.all * 100) }% aller Sites</div>
          <div>Besser als { Math.round(index.siteType * 100) }% aller <TypeField level={this.props.thisSite.meta.level} type={this.props.thisSite.meta.type} />-Sites</div>
          <div>Besser als { Math.round(index.state * 100) }% aller Sites in <StateField state={this.props.thisSite.meta.state} /></div>
        </div>
      </div>
    );
  }
}

export default SiteDetailsPage;
