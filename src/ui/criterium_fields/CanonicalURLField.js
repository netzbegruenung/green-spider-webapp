import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

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
        <p>Es sollte eine URL ausgewählt werden, auf die von allen anderen Varianten weiter geleitet wird. Für die Weiterleitung sollte ein HTTP Response mit Code 301 oder alternativ 302 genutzt werden.</p>
      </CriteriumField>;
  }
}

export default CanonicalURLField;
