import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class DNSResolvableField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='dnsresolvable' type='positive' title='Es existiert ein DNS-Eintrag für den Host- bzw. Domainnamen' />
    }

    return <CriteriumField keyProp='dnsresolvable' type='negative' title='Die Domain bzw. der Hostname benötigt einen DNS-Eintrag'>
        <p>Das bedeutet in der Regel, dass eine genutzte Domain beim Registrar nicht verlängert wurde. Falls der Hostname
          der Site nicht identisch mit der Domain ist, und stattdessen beispielsweise mit `www.` beginnt, könnte es sich
          auch um eine fehlende Konfiguration beim DNS-Provider handeln.</p>
      </CriteriumField>;
  }
}

export default DNSResolvableField;
