import React, { Component } from 'react';
import { TypeField, StateField } from './LocationLabel';
import FavouriteAddRemove from './FavouriteAddRemove';
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import URLField from './URLField';
import './SiteDetailsPage.css';
import axios from 'axios';
import _ from 'underscore';


class SiteDetailsPage extends Component {
  _isMounted = false;

  state = {
    isLoading: true,
    site: null,
    url: null,
  };

  componentDidMount() {
    this._isMounted = true;

    // ensure that this view is opened at the top
    // when coming from the SiteSearch
    window.scrollTo(0, 0);

    // load data
    let url = this.props.match.match.params.siteId;

    axios.get(`/api/v1/spider-results/site?url=${url}`)
      .then((response) => {
        if (this._isMounted) {
          // handle success
          this.setState({
            isLoading: false,
            site: response.data,
            url: decodeURIComponent(url),
          });
        }
      })
      .catch((error) => {
        // handle error
        console.error(error);
        if (this._isMounted) {
          this.setState({isLoading: false});
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return <div></div>;
    }

    // group criteria
    let criteria = [
      {
        criterium: 'DNS_RESOLVABLE_IPV4',
        component: <DNSResolvableField key='dnsresolvable' data={this.state.site.rating.DNS_RESOLVABLE_IPV4} />,
        data: this.state.site.rating.DNS_RESOLVABLE_IPV4,
      },
      {
        criterium: 'SITE_REACHABLE',
        component: <ReachableField key='reachable' data={this.state.site.rating.SITE_REACHABLE} />,
        data: this.state.site.rating.SITE_REACHABLE,
      },
      {
        criterium: 'CANONICAL_URL',
        component: <CanonicalURLField key='canonicalurl' data={this.state.site.rating.CANONICAL_URL} />,
        data: this.state.site.rating.CANONICAL_URL,
      },
      {
        criterium: 'HTTPS',
        component: <HTTPSField key='https' data={this.state.site.rating.HTTPS} />,
        data: this.state.site.rating.HTTPS,
      },
      {
        criterium: 'WWW_OPTIONAL',
        component: <WWWOptionalField key='wwwoptional' data={this.state.site.rating.WWW_OPTIONAL} />,
        data: this.state.site.rating.WWW_OPTIONAL,
      },
      {
        criterium: 'FAVICON',
        component: <FaviconField key='favicon' data={this.state.site.rating.FAVICON} />,
        data: this.state.site.rating.FAVICON,
      },
      {
        criterium: 'RESPONSIVE',
        component: <ResponsiveField key='responsive' data={this.state.site.rating.RESPONSIVE} />,
        data: this.state.site.rating.RESPONSIVE,
      },
      {
        criterium: 'SOCIAL_MEDIA_LINKS',
        component: <SocialMediaLinksField key='socialmedialink' data={this.state.site.rating.SOCIAL_MEDIA_LINKS} />,
        data: this.state.site.rating.SOCIAL_MEDIA_LINKS,
      },
      {
        criterium: 'CONTACT_LINK',
        component: <ContactLinkField key='contactlink' data={this.state.site.rating.CONTACT_LINK} />,
        data: this.state.site.rating.CONTACT_LINK,
      },
      {
        criterium: 'USE_SPECIFIC_FONTS',
        component: <FontField key='font' data={this.state.site.rating.USE_SPECIFIC_FONTS} meta={this.state.site.meta}/>,
        data: this.state.site.rating.USE_SPECIFIC_FONTS,
      },
      {
        criterium: 'FEEDS',
        component: <FeedField key='feed' data={this.state.site.rating.FEEDS} />,
        data: this.state.site.rating.FEEDS,
      },
      {
        criterium: 'NO_THIRD_PARTY_COOKIES',
        component: <CookiesField key='cookies' data={this.state.site.rating.NO_THIRD_PARTY_COOKIES} />,
        data: this.state.site.rating.NO_THIRD_PARTY_COOKIES,
      },
      {
        criterium: 'NO_SCRIPT_ERRORS',
        component: <ScriptErrorsField key='scripterrors' data={this.state.site.rating.NO_SCRIPT_ERRORS} />,
        data: this.state.site.rating.NO_SCRIPT_ERRORS,
      },
      {
        criterium: 'NO_NETWORK_ERRORS',
        component: <NetworkErrorsField key='networkerrors' data={this.state.site.rating.NO_NETWORK_ERRORS} />,
        data: this.state.site.rating.NO_NETWORK_ERRORS,
      },
      {
        criterium: 'HTTP_RESPONSE_DURATION',
        component: <ResponseDurationField key='responseduration' data={this.state.site.rating.HTTP_RESPONSE_DURATION} />,
        data: this.state.site.rating.HTTP_RESPONSE_DURATION,
      },
    ];

    let criteriaToDo = [];
    let criteriaDone = [];

    for (var criterium of criteria) {
      if (this.state.site.rating.SITE_REACHABLE.value === false) {
        // if the site is not reachable, that's all we want to display.
        if (criterium.criterium !== 'DNS_RESOLVABLE_IPV4' && criterium.criterium !== 'SITE_REACHABLE') {
          continue;
        }
      }

      if (criterium.data) {
        if (criterium.data.score === criterium.data.max_score) {
          criteriaDone.push(criterium.component);
        } else {
          criteriaToDo.push(criterium.component);
        }
      }
    }

    if (this.state.site !== null) {
      let channel = 'website-support';
      if (typeof this.state.site.checks.url_canonicalization === 'object' 
        && this.state.site.checks.url_canonicalization.length > 0
        && typeof this.state.site.checks.generator === 'object') {

        let url = this.state.site.checks.url_canonicalization[0];

        if (this.state.site.checks.generator[url] === 'typo3-gruene') {
          channel = 'typo3-gruene';
        } else if (this.state.site.checks.generator[url] === 'wordpress-urwahl') {
          channel = 'urwahl3000';
        } else if (this.state.site.checks.generator[url] === 'wordpress-gruenes-internet') {
          channel = 'gruenes-internet-de';
        }
      }
      let supportLink = <p className='support-link'>Das sagt Dir nichts, oder Du weißt nicht, wo Du anfangen sollst? Hol Dir Unterstützung im Chatbegrünung-Kanal <a href={'https://chatbegruenung.de/channel/' + channel} rel='noopener noreferrer' target='_blank'>{`#${channel}`}</a>.</p>;

      return (
        <div className='SiteDetailsPage'>
          <h1>
            <LocationLabel brief={false} level={this.state.site.meta.level} 
                         type={this.state.site.meta.type} 
                         district={this.state.site.meta.district}
                         city={this.state.site.meta.city}
                         state={this.state.site.meta.state} />
          </h1>

          <p><SiteIcon site={this.state.site} /> <URLField url={ this.state.url } showScheme={true} showPath={true} /></p>

          <hr />

          <ScoreComparisonWidget sitesCount={this.props.sitesCount} thisSite={this.state.site} maxScore={16} />

          {
            this.state.site.rating.SITE_REACHABLE.value ?
            <div>
              <hr />
              <Screenshots url={this.state.site.checks.url_canonicalization[0]} />
            </div>
            : null
          }

          {
            this.state.site.rating.DNS_RESOLVABLE_IPV4.value ?
            <div className='row'>
              <div className='col'>
                <hr />
                <CMSInfo site={this.state.site} />
              </div>
            </div>
            : null
          }
          

          <hr />

          {
            (criteriaToDo.length > 0) ?
            <div>
              <h3>Empfehlungen</h3>
              { criteriaToDo }
              { supportLink }
            </div>
            :
            null
          }

          {
            (criteriaDone.length > 0) ?
            <div>
              <h3>Erledigt</h3>
              { criteriaDone }
            </div>
            :
            null
          }

          <hr />

          <FavouriteAddRemove site={this.state.site} />

          <hr />

          <p><small>Site zuletzt geprüft am { new Date(this.state.site.created).toLocaleDateString('de-DE') }</small></p>

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

class IconOptimize extends Component {
  render() {
    return <i className='icon ion-md-construct align-middle'></i>;
  }
}

class CriteriumField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <div key={this.props.keyProp} className='good'><IconGood /> <span className='align-middle'>{this.props.title}</span></div>;
    } else if (this.props.type === 'mediocre') {
      return <div key={this.props.keyProp} className='mediocre'>{ this.props.icon ? this.props.icon : <IconOptimize /> }<span className='align-middle'>{this.props.title}</span></div>;
    } else {
      return <div key={this.props.keyProp} className='bad'><IconBad /> <span className='align-middle'>{this.props.title}</span></div>;
    }
  }
}

class CanonicalURLField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='canonicalurl' type='positive' title='Verschiedene URL-Varianten werden auf eine einzige umgeleitet' />;
    }
    return <CriteriumField keyProp='canonicalurl' type='negative' title='Verschiedene URL-Varianten sollten auf eine einzige umgeleitet werden' />;
  }
}

class CMSInfo extends Component {
  render() {
    var wellknownCMS = {
      'typo3': <a href='https://typo3.org/' target='_blank' rel='noopener noreferrer'>Typo3</a>,
      'typo3-gcms': <a href='https://gruenes-cms.de/' target='_blank' rel='noopener noreferrer'>Grünes CMS (Typo3)</a>,
      'typo3-gruene': <a href='https://typo3-gruene.de/' target='_blank' rel='noopener noreferrer'>Typo3 Grüne</a>,
      'wordpress': <a href='https://wordpress.org/' target='_blank' rel='noopener noreferrer'>Wordpress</a>,
      'wordpress-blumomatic': <a href='https://www.urwahl3000.de/blum-o-matic/' target='_blank' rel='noopener noreferrer'>Wordpress mit Blum-O-Matic</a>,
      'wordpress-gruenes-internet': <a href='https://www.gruenes-internet.de/' target='_blank' rel='noopener noreferrer'>Grünes Internet (Wordpress)</a>,
      'wordpress-urwahl': <a href='https://www.urwahl3000.de/' target='_blank' rel='noopener noreferrer'>Wordpress mit Urwahl3000</a>,
      'wordpress-josephknowsbest': <a href='https://github.com/kre8tiv/Joseph-knows-best' target='_blank' rel='noopener noreferrer'>Wordpress mit Joseph Knows Best</a>,
    };

    // collect IPs
    let ips = [];
    for (let url of Object.keys(this.props.site.checks.dns_resolution)) {
      if (typeof this.props.site.checks.dns_resolution[url].ipv4_addresses === 'object') {
        ips = _.union(ips, this.props.site.checks.dns_resolution[url].ipv4_addresses);
      };
    }
    ips = _.uniq(ips);
    let ipinfo = _.map(ips, (ip) => { return <a href={`https://de.infobyip.com/ip-${ ip }.html`} key={'ip' + ip }>{ ip }</a>; });

    let placeholder = <span className='CMSInfo placeholder'>IP: { ipinfo } - <em><abbr title='Content Management System'>CMS</abbr> wurde nicht erkannt</em></span>;

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

    return <span className='CMSInfo'>Die Site wird erstellt mit { label }. IP: { ipinfo }</span>;
  }
}

class DNSResolvableField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='dnsresolvable' type='positive' title='Es existiert ein DNS-Eintrag für den Host- bzw. Domainnamen' />
    }
    return <CriteriumField keyProp='dnsresolvable' type='negative' title='Die Domain bzw. der Hostname benötigt einen DNS-Eintrag' />
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

class CookiesField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Es werden keine Third Party Cookies gesetzt' />;
    }
    return <CriteriumField keyProp='feed' type='negative' title='Beim Laden der Site werden Third Party Cookies gesetzt' />;
  }
}

class FontField extends Component {
  render() {
    let font = 'Arvo';
    if (this.props.meta && this.props.meta.type && this.props.meta.type === 'YOUTH_ORGANIZATION') {
      font = 'Titillium';
    }

    if (typeof this.props.data !== 'undefined') {
      if (this.props.data.value) {
        return <CriteriumField keyProp='font' type='positive' title={`Die Site verwendet die Schriftart ${font}`} />;
      }
      return <CriteriumField keyProp='font' type='negative' title={`Die Site sollte die Schriftart ${font} verwenden`} />;
    }
    return <div></div>;
  }
}

class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />;
    }
    return <CriteriumField keyProp='https' type='negative' title='Die Site sollte über HTTPS erreichbar sein' />;
  }
}

class ResponseDurationField extends Component {
  render() {
    if (this.props.data.score === this.props.data.max_score) {
      return <CriteriumField keyProp='duration' type='positive' title={`Server-Antwortzeit ist sehr kurz (${ this.props.data.value } ms)`} />;
    } else if (this.props.data.score >= 0) {
      return <CriteriumField keyProp='duration' type='mediocre' title={`Server-Antwortzeit verkürzen (${ this.props.data.value } ms)`} />;
    }

    return <CriteriumField keyProp='duration' type='negative' title='Server-Antwortzeit: Keine Angabe' />;
  }
}

class ReachableField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='reachable' type='positive' title='Die Site war beim Test erreichbar' />;
    }
    return <CriteriumField keyProp='reachable' type='negative' title='Die Site war beim letzten Test nicht erreichbar' />;
  }
}

class ResponsiveField extends Component {
  render() {
    if (this.props.data.score === this.props.data.max_score) {
      return <CriteriumField keyProp='responsive' type='positive' title='Die Site ist offenbar auf mobilen Endgeräten nutzbar' />;
    } else if (this.props.data.score > 0) {
      return <CriteriumField keyProp='responsive' type='mediocre' title='Mobile Endgeräte könnten noch besser unterstützt werden' />;
    }
    return <CriteriumField keyProp='responsive' type='negative' title='Mobile Endgeräte sollten unterstützt werden' />;
  }
}

class ContactLinkField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='contactlink' type='positive' title='Die Site hat einen Link "Kontakt"' />;
    }
    return <CriteriumField keyProp='contactlink' type='negative' title='Es sollte einen Link namens "Kontakt" geben' />;
  }
}

class SocialMediaLinksField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='socialmedialinks' type='positive' title='Die Site verlinkt auf Social Media Profile' />;
    }
    return <CriteriumField keyProp='socialmedialinks' type='negative' title='Es sollte mind. einen Link zu einem Social Media Profil geben' />;
  }
}


class Screenshots extends Component {
  _isMounted = false;

  state = {
    isLoading: true,
    screenshots: null,
  };

  componentDidMount() {
    this._isMounted = true;

    var baseURL = 'http://green-spider-screenshots.sendung.de';

    // load data
    if (this.props.url) {
      let url = this.props.url;

      axios.get(`/api/v1/screenshots/site?url=${encodeURIComponent(url)}`)
        .then((response) => {
          // Success
          let screenshots = null;

          if (response.data.length > 0) {
            screenshots = {mobile: null, desktop: null};

            for (let i=0; i<response.data.length; i++) {
              response.data[i].screenshot_url = response.data[i].screenshot_url.replace(baseURL, '/screenshots');
              let width = response.data[i].size[0];
              if (width < 500) {
                screenshots.mobile = response.data[i];
              } else {
                screenshots.desktop = response.data[i];
              }
            }
          }

          if (this._isMounted) {
            this.setState({
              isLoading: false,
              screenshots: screenshots,
            });
          }
        })
        .catch((error) => {
          // handle error
          console.error(error);
          if (this._isMounted) {
            this.setState({isLoading: false});
          }
        });
    } else {
      if (this._isMounted) {
        this.setState({isLoading: false});
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.screenshots === null) {
      if (this.state.isLoading) {
        return <div>Lade Screenshots...</div>;
      } else {
        return <div>Aktuell sind keine Screenshots vorhanden</div>;
      }
    }

    let mobile = null;
    let desktop = null;
    let created = null;

    if (this.state.screenshots.mobile !== null) {
      mobile = (
        <a className='screenshot' href={'https://green-spider.netzbegruenung.de'+this.state.screenshots.mobile.screenshot_url} target='_blank' rel='noopener noreferrer' title='Screenshot für Smartphone-Ansicht anzeigen'>
          <img className='screenshot' src={this.state.screenshots.mobile.screenshot_url} width='100%' alt='Mobile Screenshot' />
        </a>
      );
      created = this.state.screenshots.mobile.created;
    }
    if (this.state.screenshots.desktop !== null) {
      desktop = (
        <a className='screenshot' href={'https://green-spider.netzbegruenung.de'+this.state.screenshots.desktop.screenshot_url} target='_blank' rel='noopener noreferrer' title='Screenshot für Desktop-Ansicht anzeigen'>
          <img className='screenshot' src={this.state.screenshots.desktop.screenshot_url} width='100%' alt='Desktop Screenshot' />
        </a>
      );
      created = this.state.screenshots.desktop.created;
    }

    return (
      <div className='row'>
        <div className='col-12'>
          <div className='row d-flex align-items-stretch'>
            <div className='col-3'>{mobile}</div>
            <div className='col-9'>{desktop}</div>
          </div>
          <div className='row'>
            <div className='col-12 text-right'>
              <small>Screenshots vom {new Date(created).toLocaleDateString('de-DE')}</small>
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
      return <CriteriumField keyProp='noscripterrors' type='negative' title='JavaScript-Fehler beheben' />;
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
      return <CriteriumField keyProp='nonetworkerrors' type='negative' title='Fehler beim Laden verknüpfter Ressourcen vermeiden' />;
    }
    return <div></div>;
  }
}

class ScoreComparisonWidget extends Component {
  state = {
    numLowerSites: null,
    numSitesOfType: null,
    numLowerSitesOfType: null,
    numSitesOfState: null,
    numLowerSitesOfState: null,
  };

  componentDidMount() {
    if (this.props.sitesCount) {
      // compare to all sites
      var q1 = '+score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
      axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q1))
        .then((response) => {
          this.setState({
            numLowerSites: response.data.count
          });
        });
      
      // compare to sites of same type
      if (this.props.thisSite.meta.type && this.props.thisSite.meta.level) {
        var q2 = '+meta.type:' + this.props.thisSite.meta.type + ' +meta.level:"' + this.props.thisSite.meta.level + '"';
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q2))
          .then((response) => {
            this.setState({
              numSitesOfType: response.data.count
            });
          });
        var q3 = '+meta.type:' + this.props.thisSite.meta.type + ' +meta.level:"' + this.props.thisSite.meta.level + '" +score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q3))
          .then((response) => {
            this.setState({
              numLowerSitesOfType: response.data.count
            });
          });
      }
      
      // compare to sites of same state
      if (this.props.thisSite.meta.state) {
        var q4 = '+meta.state:"' + this.props.thisSite.meta.state + '"';
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q4))
          .then((response) => {
            this.setState({
              numSitesOfState: response.data.count
            });
          });
        var q5 = '+meta.state:"' + this.props.thisSite.meta.state + '" +score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q5))
          .then((response) => {
            this.setState({
              numLowerSitesOfState: response.data.count
            });
          });
      }

    }
  }

  
  render() {
    if (this.props.sitesCount === null) {
      return <div className='row d-flex'></div>;
    }

    var lowerSites = (this.state.numLowerSites !== null) ? (this.state.numLowerSites / this.props.sitesCount * 100).toFixed(1) : '–';
    var lowerSitesOfType = (this.state.numSitesOfType !== null && this.state.numLowerSitesOfType !== null) ? (this.state.numLowerSitesOfType / this.state.numSitesOfType * 100).toFixed(1) : '–';
    var lowerSitesOfState = (this.state.numSitesOfState !== null && this.state.numLowerSitesOfState !== null) ? (this.state.numLowerSitesOfState / this.state.numSitesOfState * 100).toFixed(1) : '–';

    var rows = [<div key='all'>Besser als { lowerSites }% aller Sites</div>];

    if (this.state.numSitesOfType !== null) {
      rows.push(<div key='type'>Besser als { lowerSitesOfType }% aller <TypeField level={this.props.thisSite.meta.level} type={this.props.thisSite.meta.type} />-Sites</div>);
    }
    if (this.state.numSitesOfState !== null) {
      rows.push(<div key='state'>Besser als { lowerSitesOfState }% aller Sites in <StateField state={this.props.thisSite.meta.state} /></div>);
    }

    return (
      <div className='row d-flex'>
        <div className='col-4 align-self-center'>
          Punkte: <ScoreField score={this.props.thisSite.score} maxScore={this.props.maxScore} />
        </div>
        <div className='col-8 align-self-center'>
          {rows}
        </div>
      </div>
    );
  }
}

export default SiteDetailsPage;
