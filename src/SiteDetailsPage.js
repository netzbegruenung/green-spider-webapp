import React, { Component } from 'react';
import { TypeField, StateField } from './LocationLabel';
import CriteriumField from './CriteriumField';
import FavouriteAddRemove from './FavouriteAddRemove';
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import URLField from './URLField';
import './SiteDetailsPage.css';
import axios from 'axios';
import _ from 'underscore';


/**
 * A cheap hash function for hashing strings
 * 
 * @param String The string to be hashed
 */
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
      return hash;
  }
  for (let i=0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}


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
        component: <CanonicalURLField key='canonicalurl' data={this.state.site.rating.CANONICAL_URL} details={this.state.site.checks.url_canonicalization} />,
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
        component: <CookiesField key='cookies' data={this.state.site.rating.NO_THIRD_PARTY_COOKIES} details={this.state.site.checks.load_in_browser} />,
        data: this.state.site.rating.NO_THIRD_PARTY_COOKIES,
      },
      {
        criterium: 'NO_SCRIPT_ERRORS',
        component: <ScriptErrorsField key='scripterrors' data={this.state.site.rating.NO_SCRIPT_ERRORS} details={this.state.site.checks.load_in_browser} />,
        data: this.state.site.rating.NO_SCRIPT_ERRORS,
      },
      {
        criterium: 'NO_NETWORK_ERRORS',
        component: <NetworkErrorsField key='networkerrors' data={this.state.site.rating.NO_NETWORK_ERRORS} details={this.state.site.checks.load_in_browser} />,
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

class CanonicalURLField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='canonicalurl' type='positive' title='Verschiedene URL-Varianten werden auf eine einzige umgeleitet' />;
    }

    return <CriteriumField keyProp='canonicalurl' type='negative' title='Verschiedene URL-Varianten sollten auf eine einzige umgeleitet werden'>
        <p>Die Site ist unter den folgenden URLs erreichbar:</p>
        <ul>
          {
            this.props.details.map((url) => {
              return <li key={url}>{url}</li>;
            })
          }
        </ul>
        <p>Es sollte eine URL ausgewählt werden, auf die von allen anderen Varianten weiter geleitet wird.</p>
      </CriteriumField>;
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

    return <CriteriumField keyProp='dnsresolvable' type='negative' title='Die Domain bzw. der Hostname benötigt einen DNS-Eintrag'>
        <p>Das bedeutet in der Regel, dass eine genutzte Domain beim Registrar nicht verlängert wurde. Falls der Hostname
          der Site nicht identisch mit der Domain ist, und stattdessen beispielsweise mit `www.` beginnt, könnte es sich
          auch um eine fehlende Konfiguration beim DNS-Provider handeln.</p>
      </CriteriumField>;
  }
}

class FaviconField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='favicon' type='positive' title='Die Site hat ein Icon' />;
    }
    return <CriteriumField keyProp='favicon' type='negative' title='Die Site benötigt ein Icon'>
        <p>Ein Icon hilft Nutzer*innen, ein Browser-Tab oder ein Bookmark der Site besser wieder zu erkennen.</p>
        <p>Anleitung: <a href='https://www.w3.org/2005/10/howto-favicon' target='_blank' rel='noopener noreferrer'>How
        to Add a Favicon to your Site</a></p>
      </CriteriumField>;
  }
}

class FeedField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Die Site verweist auf mind. einen RSS-/Atom-Feed' />;
    }
    return <CriteriumField keyProp='feed' type='negative' title='Es sollten RSS- oder Atom-Feeds angeboten und mittels rel=alternate link verlinkt werden'>
        <p>Feeds helfen Suchmaschinen dabei, aktuelle Meldungen zeitnah nach Veröffentlichung in ihren Suchindex
          aufzunehmen, was die Site besser in Suchergebnissen platziert. Außerdem helfen sie auch versierten 
          Nutzer*innen dabei, über neue Inhalte auf dem laufenden zu bleiben.</p>
        <p>Die meistgenutzten CMSe unterstützen die Veröffentlichung von Feeds ohne zusätzlichen Aufwand.</p>
        <p>Anleitung: <a href='https://netzbegruenung.github.io/unofficial-gcms-docs/#/rss-feeds' target='_blank'
          rel='noopener noreferrer'>RSS Feeds aktivieren in GCMS</a></p>
      </CriteriumField>;
  }
}

class CookiesField extends Component {
  state = {thirdPartyCookies: null};

  componentDidMount() {
    let url = Object.keys(this.props.details)[0];
    let cookies = this.props.details[url].cookies;
    if (typeof cookies !== 'undefined') {
      let parsedURL = new URL(url);
      let thirdPartyCookies = cookies.filter(cookie => {
        return parsedURL.hostname.indexOf(cookie.host_key);
      });
      if (thirdPartyCookies.length > 0) {
        this.setState({thirdPartyCookies: thirdPartyCookies});
      }
    }
  }

  expiryString(duration) {
    if (duration < 60 * 3) {
      return Math.floor(duration).toString() + " Sekunden";
    }
    duration = duration / 60.0;
    if (duration < 100) {
      return Math.floor(duration).toString() + " Minuten";
    }
    duration = duration / 60.0;
    if (duration < 48) {
      return Math.floor(duration).toString() + " Stunden";
    }
    duration = duration / 24.0;
    if (duration < 100) {
      return Math.floor(duration).toString() + " Tage";
    }
    duration = duration / 30.0;
    if (duration < 15) {
      return Math.floor(duration).toString() + " Monate";
    }
    duration = duration * 30.0 / 365;
    return Math.floor(duration).toString() + " Jahre";
  }

  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Es werden keine Third Party Cookies gesetzt' />;
    }

    return (
      <CriteriumField keyProp='feed' type='negative' title='Beim Laden der Site werden Third Party Cookies gesetzt'>
        <p>Cookies von Dritten, auch Third Party Cookies genannt, erlauben das Verfolgen von Nutzer*innen über
          die Grenzen der Seite, auf der die Cookies gesetzt wurden, hinweg. Damit stellen sie einen Eingriff in die
          Informationelle Selbstbestimmung dar, insbesondere dann, wenn sie ohne Einwilligung gesetzt werden.</p>
        <p>Da Green Spider keine Einwilligung in das Setzen von Cookies gibt, werden alle nachstehenden Cookies
          ohne explizite Einwilligung gesetzt.</p>
        <table className='table' style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Name</th>
              <th>Lebensdauer</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.thirdPartyCookies !== null ? this.state.thirdPartyCookies.map((cookie) => {
                return <tr key={[cookie.host_key, cookie.name].join('-')}>
                    <td>{cookie.host_key}</td>
                    <td>{cookie.name}</td>
                    <td>{this.expiryString(Math.abs(cookie.expires_utc - cookie.creation_utc) / 1000000)}</td>
                  </tr>;
              }) : null
            }
          </tbody>
        </table>
      </CriteriumField>
    );
  }
}

class FontField extends Component {
  render() {
    let font = 'Arvo';
    if (this.props.meta && this.props.meta.type && this.props.meta.type === 'YOUTH_ORGANIZATION') {
      font = 'Titillium';
    }

    if (typeof this.props.data === 'undefined') {
      return <div />;
    }

    if (this.props.data.value) {
      return <CriteriumField keyProp='font' type='positive' title={`Die Site verwendet die Schriftart ${font}`} />;
    }

    return <CriteriumField keyProp='font' type='negative' title={`Die Site sollte die Schriftart ${font} verwenden`}>
        <p>Die Schriftart Arvo bzw. der Variante für Überschriften, Arvo Gruen, ist ein markanter Bestandteil der
          Corporate-Design-Richtlinien von BÜNDNIS 90/DIE GRÜNEN. Die Verwendung der Schrift hilft dabei, den Absender
          kenntlich zu machen, so wie es auch der Einsatz der richtigen Farben und die Verwendung des Logos tun.</p>
        <p>Die empfohlenen Schriften stehen unter{' '}
          <a href='https://github.com/netzbegruenung/webfonts' target='_blank'
          rel="noopener noreferrer">github.com/netzbegruenung/webfonts</a> für die
          einfache Verwendung auf Webseiten zur Verfügung.</p>
      </CriteriumField>;
  }
}

class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />;
    }

    return <CriteriumField keyProp='https' type='negative' title='Die Site sollte über HTTPS erreichbar sein'>
      <p>Per TLS verschlüsselte HTTP-Verbindungen schützen Nutzer*innen vor der Preisgabe privater Informationen.
        Entsprechend gehört HTTPS für immer mehr Nutzer*innen bei einem vertrauenswürdigen Webangebot zu den
        Pflicht-Kriterien. Auch viele Unternehmen, darunter beispielsweise Google, haben inzwischen die HTTPS-Verbindung
        zum Standard erklärt. Seiten, die nicht per HTTPS erreichbar sind, werden entsprechend von Google im
        Suchergebnis schlechter platziert.</p>
      <p>Inzwischen gibt es TLS-Zertifikate für Verschlüsselte Server-Kommunikation auch kostenlos, z. B. von
        <a href='https://letsencrypt.org/getting-started/' target='_blank' rel='noopener noreferrer'>Let's Encrypt</a>.</p>
      <p>Lesetipp: <a href='https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html' target='_blank' rel='noopener noreferrer'>HTTPS as a ranking signal </a></p>
    </CriteriumField>;
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

    return <CriteriumField keyProp='responsive' type='negative' title='Mobile Endgeräte sollten unterstützt werden'>
        <p>Green Spider testet, wie breit die Startseite der Site auf verschieden breiten Bildschirmen ausfällt.
          Ist in einer Breite die Seite breiter als der Bildschirm, so gilt der Test als nicht bestanden.
          Nutzer*innen con Smartphones sehen in diesen Fällen häufig einen horizontalen Scrollbalken oder müssen
          zum vollständigen Betrachten der Seite die Inhalte horizontal Verschieben.</p>

        <p>Tipp: Zieh den Browserfenster so schmal wie Du kannst, im besten Fall auf 360 Pixel Breite. Damit erhältst
          Du einen Eindruck, welche Inhalte über den Rand hinausragen.</p>
      </CriteriumField>;
  }
}

class ContactLinkField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='contactlink' type='positive' title='Die Site hat einen Link "Kontakt"' />;
    }

    return <CriteriumField keyProp='contactlink' type='negative' title='Es sollte einen Link namens "Kontakt" geben'>
        <p>Wenn Nutzer*innen mit dem Betreiber einer Site in Kontakt treten wollen, ist ein gut sichtbarer Link mit der
          Beschriftung "Kontakt" eine der einfachsten Möglichkeit.</p>
      </CriteriumField>;
  }
}

class SocialMediaLinksField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='socialmedialinks' type='positive' title='Die Site verlinkt auf Social Media Profile' />;
    }

    return <CriteriumField keyProp='socialmedialinks' type='negative' title='Es sollte mind. einen Link zu einem Social Media Profil geben'>
        <p>Über Social-Media-Profile ist es möglich, häufiger mit Nutzer*innen in Kontakt zu treten. Sofern es Profile
          gibt, sollten diese am besten von jeder Seite der Site verlinkt werden. Aktuell werden Links zu Facebook, 
          Twitter und Instagram gewertet.</p>
      </CriteriumField>;
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

class LoggedErrorsField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <CriteriumField keyProp={this.props.keyProp} type='positive' title={this.props.titlePositive} />;
    }

    return (
      <CriteriumField keyProp={this.props.keyProp} type='negative' title={this.props.titleNegative}>
        { this.props.logEntries !== null && this.props.logEntries !== [] ?
          <table className='table'>
            <tbody>
              {
                this.props.logEntries.map((item) => {
                  return <tr key={hashCode([item.source, item.level, item.message].join('-'))}>
                      <td><span className='badge badge-primary'>{item.source}</span></td>
                      <td><span className={item.level === 'SEVERE' ? 'badge badge-danger' : 'badge badge-warning'}>{item.level}</span></td>
                      <td><code>{item.message}</code></td>
                    </tr>;
                })
              }
            </tbody>
          </table>
        :
        <p>Es können leider keine Details zu den gesammelten Fehlern angezeigt werden.</p> }
      </CriteriumField>  
    );
  }
}

class NetworkErrorsField extends Component {
  state = {logEntries: null};

  componentDidMount() {
    let logEntries = Object.values(this.props.details)[0].logs;
    if (typeof logEntries !== 'undefined') {
      let filteredEntries = logEntries.filter(item => item.source !== 'javascript');
      if (filteredEntries.length > 0) {
        this.setState({logEntries: filteredEntries});
      }
    }
  }

  render() {
    if (typeof this.props.data === 'undefined') {
      return <div />;
    }

    if (this.props.data.value) {
      return <LoggedErrorsField keyProp='nonetworkerrors' type='positive' titlePositive='Es wurden keine Probleme beim Laden verknüpfter Ressourcen festgestellt' />;
    }

    return (
      <LoggedErrorsField keyProp='nonetworkerrors' type='negative' titleNegative='Fehler beim Laden verknüpfter Ressourcen vermeiden' logEntries={this.state.logEntries} />
    );
  }
}


class ScriptErrorsField extends Component {
  state = {logEntries: null};

  componentDidMount() {
    let logEntries = Object.values(this.props.details)[0].logs;
    if (typeof logEntries !== 'undefined') {
      let filteredEntries = logEntries.filter(item => item.source === 'javascript');
      if (filteredEntries.length > 0) {
        this.setState({logEntries: filteredEntries});
      }
    }
  }

  render() {
    if (typeof this.props.data === 'undefined') {
      return <div />;
    }
    
    if (this.props.data.value) {
      return <LoggedErrorsField keyProp='noscripterrors' type='positive' titlePositive='Es wurden keine JavaScript-Fehler festgestellt' />;
    }

    return <LoggedErrorsField keyProp='noscripterrors' type='negative' titleNegative='JavaScript-Fehler beheben' logEntries={this.state.logEntries} />;
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
