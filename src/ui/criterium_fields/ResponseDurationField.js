import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

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

export default ResponseDurationField;
