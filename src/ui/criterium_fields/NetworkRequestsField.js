import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class NetworkRequestsField extends Component {
  render() {
    if (this.props.data.score === this.props.data.max_score) {
      return <CriteriumField keyProp='duration' type='positive' title={`Beim Laden werden nur wenige (${ this.props.data.value }) HTTP-Anfragen benötigt.`} />;
    } else if (this.props.data.score >= 0) {
      return <CriteriumField keyProp='duration' type='mediocre' title={`Beim Laden werden relativ wenige (${ this.props.data.value }) HTTP-Anfragen benötigt.`} />;
    }

    return <CriteriumField keyProp='duration' type='negative' title={`Beim Laden sollten weniger HTTP-Anfragen ausgelöst werden. (Aktuell: ${ this.props.data.value })`} />;
  }
}

export default NetworkRequestsField;
