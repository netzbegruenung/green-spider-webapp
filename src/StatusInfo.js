import React, { Component } from 'react';

class StatusInfo extends Component {

  /**
   * Calculates date range of the results data to be displayed 
   */
  constructor(props) {
    super(props);

    var minDate = '2999-12-31T00:00:00.0000Z';
    var maxDate = '0000-00-00T00:00:00.0000Z';

    for (var i = 0, len = this.props.results.length; i < len; i++) {
      if (this.props.results[i].created > maxDate) {
        maxDate = this.props.results[i].created;
      }
      if (this.props.results[i].created < minDate) {
        minDate = this.props.results[i].created;
      }
    }

    this.state = {
      minDate: new Date(minDate),
      maxDate: new Date(maxDate),
    };
  }

  render() {
    if (this.props.results) {
      return (
        <span>Stand <span>{this.state.maxDate.toLocaleDateString("de-DE")}</span></span>
      );
    }
    return <span>Nicht geladen</span>
  }
}

export default StatusInfo;
