import React, { Component } from 'react';
import _ from 'underscore';


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

export default CMSInfo;
