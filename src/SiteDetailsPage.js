import React, { Component } from 'react';
import punycode from 'punycode';
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import { TypeField, StateField } from './LocationLabel';
import './SiteDetailsPage.css';

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

    if (typeof this.props.cms !== 'undefined' && this.props.cms.length > 0 && this.props.cms[0]) {

      var label = this.props.cms[0];
      if (typeof wellknownCMS[label] !== 'undefined') {
        label = wellknownCMS[label];
      }

      return <span className='CMSInfo'>Die Site wird erstellt mit { label }</span>;
    }
    return <span />;
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
        return <CriteriumField keyProp='favicon' type='positive' title='Die Site verwendet das oben gezeigte Icon' />;
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

    
    if (this.props.screenshot !== null && typeof this.props.screenshot !== 'undefined') {
      var mobileScreenshot = baseURL + '/360x640/' + this.props.screenshot;
      var desktopScreenshot = baseURL + '/1500x1500/' + this.props.screenshot;
      
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
    var icons = [];
    if (typeof this.props.icons !== 'undefined') {
      icons = Object.values(this.props.icons);
    } else {
      return <span />;
    }
    
    if (icons.length > 0) {
      return <img className='SiteIcon' src={'/siteicons/' + icons[0]} width={32} height={32} alt='Icon' />;
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
    for (var site of this.props.allSites) {
      countAll++;

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


class SiteDetailsPage extends Component {
  constructor(props) {
    super(props);

    var url = decodeURIComponent(props.match.params.siteId);
    var site = null;
    // load data
    props.sites.forEach((element) => {
      if (element.input_url === url) {
        site = element;
      }
    });

    this.state = {
      site: site,
      url: url,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    var screenshots;
    if (typeof this.state !== 'undefined' && typeof this.state.site !== 'undefined') {
      if (typeof this.state.site.resulting_urls !== 'undefined' &&
          this.state.site.resulting_urls !== null &&
          typeof this.props.screenshots[this.state.site.resulting_urls[0]] !== 'undefined' &&
          this.props.screenshots[this.state.site.resulting_urls[0]] !== null) {
        screenshots = this.props.screenshots[this.state.site.resulting_urls[0]];
      }
    }

    if (typeof this.state !== 'undefined') {
      return (
        <div className='SiteDetailsPage'>
          <h1>
            <LocationLabel brief={false} level={this.state.site.meta.level} 
                         type={this.state.site.meta.type} 
                         district={this.state.site.meta.district}
                         city={this.state.site.meta.city}
                         state={this.state.site.meta.state} />
          </h1>

          <p><SiteIcon icons={this.state.site.icons} /> <a href={ this.state.url } rel='noopener noreferrer' target='_blank'>{ punycode.toUnicode(this.state.url) }</a></p>

          <hr />

          <ScoreComparisonWidget allSites={this.props.sites} thisSite={this.state.site} maxScore={13} />

          <hr />
          
          <Screenshots screenshot={screenshots} />

          <hr />

          <div className='row'>
            <div className='col'>
              <CMSInfo cms={this.state.site.cms} />
            </div>
          </div>

          <hr />

          <ReachableField data={this.state.site.rating.SITE_REACHABLE} />
          <CanonicalURLField data={this.state.site.rating.CANONICAL_URL} />
          <HTTPSField data={this.state.site.rating.HTTPS} />
          <WWWOptionalField data={this.state.site.rating.WWW_OPTIONAL} />
          <FaviconField data={this.state.site.rating.FAVICON} icons={this.state.site.icons} />
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
export default SiteDetailsPage;
