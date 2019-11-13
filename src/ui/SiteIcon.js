import React, { Component } from 'react';

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

export default SiteIcon;
