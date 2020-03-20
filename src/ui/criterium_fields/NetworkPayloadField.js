import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class NetworkPayloadField extends Component {
  render() {
    if (this.props.data.score === this.props.data.max_score) {
      return <CriteriumField keyProp='duration' type='positive' title={`Beim Laden werden geringe Datenmengen (${ this.props.data.value / 1000 } KB) übertragen.`} />
    } else if (this.props.data.score >= 0) {
      return <CriteriumField keyProp='duration' type='mediocre' title={`Beim Laden werden mäßige Datenmengen (${ this.props.data.value / 1000 } KB) übertragen.`}>
        <p>Je geringer die Datenmenge, die beim Laden einer Seite zu übertragen ist, desto
        schneller baut sich die Seite bei den Endnutzer_innen auf.</p>
      <p>Seiten, die beim Aufruf sehr große Datenmengen übertragen, schließen insbesondere Menschen
        mit geringeren Bandbreiten, in ländlicheren Regionen, mit älteren und weniger leistungsfähigen Endgeräten von der Teilhabe aus.</p>
      </CriteriumField>;
    }

    return <CriteriumField keyProp='duration' type='negative' title={`Beim Laden sollten kleinere Datenmengen übertragen werden (aktuell: ${ this.props.data.value / 1000000.0 } MB)`}>
      <p>Je geringer die Datenmenge, die beim Laden einer Seite zu übertragen ist, desto
        schneller baut sich die Seite bei den Endnutzer_innen auf.</p>
      <p>Seiten, die beim Aufruf sehr große Datenmengen übertragen, schließen insbesondere Menschen
        mit geringeren Bandbreiten, in ländlicheren Regionen, mit älteren und weniger leistungsfähigen Endgeräten von der Teilhabe aus.</p>
    </CriteriumField>;
  }
}

export default NetworkPayloadField;
