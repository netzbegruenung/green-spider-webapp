import React, { Component } from 'react';

class StatusInfo extends Component {
  render() {
    if (this.props === null || this.props.sitesLastUpdated === null) {
      return <span>Daten werden geladen...</span>;
    }

    return <span>Stand: { new Date(this.props.sitesLastUpdated).toLocaleDateString('de-DE') }</span>;
  }
}

export default StatusInfo;
