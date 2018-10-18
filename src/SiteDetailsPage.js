import React, { Component } from 'react';
import { Link } from "react-router-dom";
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

class CMSField extends Component {
  render() {
    return <div>CMS: { this.props.cms }</div>;
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
          <div className='good'>
            Site Icon: <img src={'/siteicons/' + icons[0]} width={32} height={32} alt='Icon' />
          </div>
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
    var className = 'bad text';
    if (this.props.data.score > 0) {
      className = 'mediocre text';
    }
    if (this.props.data.score > 0.5) {
      className = 'good text';
    }

    if (this.props.data.value) {
      return <div className={className}>Server Antwortzeit: { this.props.data.value } ms</div>;
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

    return <div>Screenshots: { screenshotElements[0] } { screenshotElements[1] }</div>;
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

    var backlink = (
      <div className='backlink'>
        <Link to='/'>Zurück</Link>
      </div>);

    if (typeof this.state !== 'undefined') {
      return (
        <div className='SiteDetailsPage'>
          {backlink}

          <h1>{ this.state.site.meta.level }</h1>

          <p><a href={ this.state.url } rel='noopener noreferrer'>{ this.state.url }</a></p>

          <CanonicalURLField data={this.state.site.rating.CANONICAL_URL} />
          <ReachableField data={this.state.site.rating.SITE_REACHABLE} />
          <ResponseDurationField data={this.state.site.rating.HTTP_RESPONSE_DURATION} />
          <FaviconField data={this.state.site.rating.FAVICON} icons={this.state.site.icons} />
          <HTTPSField data={this.state.site.rating.HTTPS} />
          <WWWOptionalField data={this.state.site.rating.WWW_OPTIONAL} />
          <CanonicalURLField data={this.state.site.rating.CANONICAL_URL} />
          <ResponsiveField data={this.state.site.rating.RESPONSIVE} />
          <FontField data={this.state.site.rating.USE_SPECIFIC_FONTS} />
          <FeedField data={this.state.site.rating.FEEDS} />
          <ScriptErrorsField data={this.state.site.rating.NO_SCRIPT_ERRORS} />
          <NetworkErrorsField data={this.state.site.rating.NO_NETWORK_ERRORS} />
          <ScreenshotsField screenshot={screenshots} />
          <CMSField cms={this.state.site.cms} />

        </div>
      )
    } else {
      return (
        <div className='SiteDetailsPage'>
          {backlink}

          <h1>{ this.url }</h1>

          <p>Daten werden geladen...</p>

        </div>
      )
    }
  }
}
export default SiteDetailsPage;
