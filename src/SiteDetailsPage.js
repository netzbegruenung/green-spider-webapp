import axios from 'axios';
import React, { Component } from 'react';
import LocationLabel from './ui/LocationLabel';
import CanonicalURLField from './ui/criterium_fields/CanonicalURLField';
import ContactLinkField from './ui/criterium_fields/ContactLinkField';
import CookiesField from './ui/criterium_fields/CookiesField';
import DNSResolvableField from './ui/criterium_fields/DNSResolvableField';
import FaviconField from './ui/criterium_fields/FaviconField';
import FeedField from './ui/criterium_fields/FeedField';
import FontField from './ui/criterium_fields/FontField';
import HTTPSField from './ui/criterium_fields/HTTPSField';
import NetworkErrorsField from './ui/criterium_fields/NetworkErrorsField';
import ReachableField from './ui/criterium_fields/ReachableField';
import ResponseDurationField from './ui/criterium_fields/ResponseDurationField';
import ResponsiveField from './ui/criterium_fields/ResponsiveField';
import ScriptErrorsField from './ui/criterium_fields/ScriptErrorsField';
import SocialMediaLinksField from './ui/criterium_fields/SocialMediaLinksField';
import WWWOptionalField from './ui/criterium_fields/WWWOptionalField';
import CMSInfo from './ui/CMSInfo';
import Screenshots from './ui/Screenshots';
import FavouriteAddRemove from './ui/FavouriteAddRemove';
import URLField from './ui/URLField';
import SiteIcon from './ui/SiteIcon';
import ScoreComparisonWidget from './ui/ScoreComparisonWidget';

import './SiteDetailsPage.css';


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
        component: <ReachableField key='reachable' data={this.state.site.rating.SITE_REACHABLE} details={this.state.site.checks.url_reachability} />,
        data: this.state.site.rating.SITE_REACHABLE,
      },
      {
        criterium: 'CANONICAL_URL',
        component: <CanonicalURLField key='canonicalurl' data={this.state.site.rating.CANONICAL_URL} details={this.state.site.checks.url_canonicalization} />,
        data: this.state.site.rating.CANONICAL_URL,
      },
      {
        criterium: 'HTTPS',
        component: <HTTPSField key='https' data={this.state.site.rating.HTTPS} details={this.state.site.checks.url_reachability} />,
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

export default SiteDetailsPage;
