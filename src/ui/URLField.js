/**
 * The URLField is used to display a site URL.
 * 
 * IDN domains (punycode notation) are converted to Unicode for displaying.
 * 
 * Props configuration:
 * 
 * - link boolean: If true, the URL is actually linked with the URL target (default = true).
 * - showScheme: If true, the schema of the URL will be visible. (default = false)
 * - showPath: If true, the Path part is displayed. Otherwise only the domain will be shown. (default = false)
 */

import React, { Component } from 'react';
import punycode from 'punycode';


class URLField extends Component {
  parseURL(url) {
    let parts = url.split("://", 2);
    let scheme = parts[0];
    let rest = parts[1];
    
    parts = rest.split("/");
    let domain = parts[0];
    let path = null;

    if (parts.length > 1) {
      path = "/" + parts[1];
    }
    
    if (parts.length > 3) {
      path = parts[3]
    }
    return {
      scheme: scheme,
      domain: domain,
      path: path,
    };
  }

  render() {
    let parsed = this.parseURL(this.props.url);

    let labelURL = '';

    if (this.props.showScheme === true) {
      labelURL += parsed.scheme + "://";
    }

    labelURL += punycode.toUnicode(parsed.domain);

    if (this.props.schowPath) {
      labelURL += parsed.path;
    }

    if (this.props.link !== null && this.props.link !== false) {
      return <span className='URLField text-truncate'><a href={this.props.url} target="_blank" rel="noopener noreferrer">{ labelURL }</a></span>;
    }
    return <span className='URLField text-truncate'>{ labelURL }</span>;
  }
}

export default URLField;
