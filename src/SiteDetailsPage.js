import React, { Component } from 'react';
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import { TypeField, StateField } from './LocationLabel';
import './SiteDetailsPage.css';
import axios from 'axios';
import punycode from 'punycode';


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
      return <div></div>;
    }

    // group criteria
    let criteria = [
      {
        component: <ReachableField key='reachable' data={this.state.site.rating.SITE_REACHABLE} />,
        data: this.state.site.rating.SITE_REACHABLE,
      },
      {
        component: <CanonicalURLField key='canonicalurl' data={this.state.site.rating.CANONICAL_URL} />,
        data: this.state.site.rating.CANONICAL_URL,
      },
      {
        component: <HTTPSField key='https' data={this.state.site.rating.HTTPS} />,
        data: this.state.site.rating.HTTPS,
      },
      {
        component: <WWWOptionalField key='wwwoptional' data={this.state.site.rating.WWW_OPTIONAL} />,
        data: this.state.site.rating.WWW_OPTIONAL,
      },
      {
        component: <FaviconField key='favicon' data={this.state.site.rating.FAVICON} />,
        data: this.state.site.rating.FAVICON,
      },
      {
        component: <ResponsiveField key='responsive' data={this.state.site.rating.RESPONSIVE} />,
        data: this.state.site.rating.RESPONSIVE,
      },
      {
        component: <FontField key='font' data={this.state.site.rating.USE_SPECIFIC_FONTS} />,
        data: this.state.site.rating.USE_SPECIFIC_FONTS,
      },
      {
        component: <FeedField key='feed' data={this.state.site.rating.FEEDS} />,
        data: this.state.site.rating.FEEDS,
      },
      {
        component: <ScriptErrorsField key='scripterrors' data={this.state.site.rating.NO_SCRIPT_ERRORS} />,
        data: this.state.site.rating.NO_SCRIPT_ERRORS,
      },
      {
        component: <NetworkErrorsField key='networkerrors' data={this.state.site.rating.NO_NETWORK_ERRORS} />,
        data: this.state.site.rating.NO_NETWORK_ERRORS,
      },
      {
        component: <ResponseDurationField key='responseduration' data={this.state.site.rating.HTTP_RESPONSE_DURATION} />,
        data: this.state.site.rating.HTTP_RESPONSE_DURATION,
      },
    ];

    let criteriaToDo = [];
    let criteriaDone = [];

    for (var criterium of criteria) {
      if (criterium.data.value) {
        criteriaDone.push(criterium.component);
      } else {
        criteriaToDo.push(criterium.component);
      }
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

          <h3>Empfehlungen</h3>

          { (criteriaToDo.length > 0) ? criteriaToDo : null }

          <h3>Erledigt</h3>

          { (criteriaDone.length > 0) ? criteriaDone : null }

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
    return <i className='icon ion-md-checkmark-circle align-middle'></i>;
  }
}

class IconBad extends Component {
  render() {
    return <i className='icon ion-md-close-circle align-middle'></i>;
  }
}

class CriteriumField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <div key={this.props.keyProp} className='good'><IconGood /> <span className='align-middle'>{this.props.title}</span></div>;
    } else {
      return <div key={this.props.keyProp} className='bad'><IconBad /> <span className='align-middle'>{this.props.title}</span></div>;
    }
  }
}

class CanonicalURLField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='canonicalurl' type='positive' title='Verschiedene URL-Varianten werden auf eine einzige umgeleitet' />
    }
    return <CriteriumField keyProp='canonicalurl' type='negative' title='Verschiedene URL-Varianten sollten auf eine einzige umgeleitet werden' />
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

    let placeholder = <span className='CMSInfo placeholder'><em><abbr title='Content Management System'>CMS</abbr> wurde nicht erkannt</em></span>;

    if (typeof this.props.site === 'undefined' || this.props.site === null) {
      return placeholder;
    }
    if (Object.keys(this.props.site.checks.generator).length === 0) {
      return placeholder;
    }

    var url = Object.keys(this.props.site.checks.generator)[0];
    if (!this.props.site.checks.generator[url]) {
      return placeholder;
    }
    
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
      return <CriteriumField keyProp='favicon' type='positive' title='Die Site hat ein Icon' />;
    }
    return <CriteriumField keyProp='favicon' type='negative' title='Die Site benötigt ein Icon' />;
  }
}

class FeedField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Die Site verweist auf mind. einen RSS-/Atom-Feed' />;
    }
    return <CriteriumField keyProp='feed' type='negative' title='Es sollten RSS- oder Atom-Feeds angeboten und mittels rel=alternate link verlinkt werden' />;
  }
}

class FontField extends Component {
  render() {
    if (typeof this.props.data !== 'undefined') {
      if (this.props.data.value) {
        return <CriteriumField keyProp='font' type='positive' title='Die Site verwendet die Schriftart Arvo' />;
      }
      return <CriteriumField keyProp='font' type='negative' title='Die Site sollte die Schriftart Arvo verwenden' />;
    }
    return <div></div>;
  }
}

class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />
    }
    return <CriteriumField keyProp='https' type='negative' title='Die Site sollte über HTTPS erreichbar sein' />
  }
}

class ResponseDurationField extends Component {
  render() {
    var icon = <i className='icon ion-md-speedometer align-middle'></i>;
    var className = 'bad text';
    if (this.props.data.score > 0) {
      className = 'mediocre text';
    }
    if (this.props.data.score > 0.5) {
      className = 'good text';
    }

    if (this.props.data.value) {
      return <div className={className}>{icon} <span className='align-middle'>Server Antwortzeit: { this.props.data.value } ms</span></div>;
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
    return <CriteriumField keyProp='responsive' type='negative' title='Mobile Endgeräte sollten unterstützt werden' />
  }
}


class Screenshots extends Component {
  state = {
    isLoading: true,
    screenshots: null,
  };

  componentDidMount() {
    var baseURL = 'http://green-spider-screenshots.sendung.de';
    // load data
    let url = this.props.urls[0];

    axios.get(`/api/v1/screenshots/site?url=${url}`)
      .then((response) => {
        // Success
        
        let screenshots = null;

        if (response.data.length > 0) {
          screenshots = {mobile: null, desktop: null};

          for (var i=0; i<response.data.length; i++) {
            response.data[i].screenshot_url = response.data[i].screenshot_url.replace(baseURL, '/screenshots');
            var width = response.data[i].size[0];
            if (width < 500) {
              screenshots.mobile = response.data[i];
            } else {
              screenshots.desktop = response.data[i];
            }
          }

          // TODO: rewrite screenshot URLs
        }

        this.setState({
          isLoading: false,
          screenshots: screenshots,
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
    if (this.state.screenshots === null) {
      if (this.state.isLoading) {
        return <div>Lade Screenshots...</div>;
      } else {
        return <div>Aktuell sind keine Screenshots vorhanden</div>;
      }
    }
    
    var mobile = (
      <a className='screenshot' href={this.state.screenshots.mobile.screenshot_url} target='_blank' title='Screenshot für Smartphone-Ansicht anzeigen'>
        <img className='screenshot' src={this.state.screenshots.mobile.screenshot_url} width='100%' alt='Mobile Screenshot' />
      </a>
    );

    var desktop = (
      <a className='screenshot' href={this.state.screenshots.desktop.screenshot_url} target='_blank' title='Screenshot für Desktop-Ansicht anzeigen'>
        <img className='screenshot' src={this.state.screenshots.desktop.screenshot_url} width='100%' alt='Desktop Screenshot' />
      </a>
    );

    return (
      <div className='row'>
        <div className='col-12'>
          <div className='row d-flex align-items-stretch'>
            <div className='col-3'>{mobile}</div>
            <div className='col-9'>{desktop}</div>
          </div>
          <div className='row'>
            <div className='col-12 text-right'>
              <small>Screenshots vom {new Date(this.state.screenshots.mobile.created).toLocaleDateString('de-DE')}</small>
            </div>
          </div>
        </div>
      </div>
    );
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

    if (typeof this.props.site.checks.html_head[url] !== 'undefined' &&
      typeof this.props.site.checks.html_head[url].link_icon !== 'undefined' &&
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
