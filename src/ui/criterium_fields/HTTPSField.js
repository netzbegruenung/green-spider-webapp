import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />;
    }

    return <CriteriumField keyProp='https' type='negative' title='Die Site sollte über HTTPS erreichbar sein'>
      <p>Per TLS verschlüsselte HTTP-Verbindungen schützen Nutzer*innen vor der Preisgabe privater Informationen.
        Entsprechend gehört HTTPS für immer mehr Nutzer*innen bei einem vertrauenswürdigen Webangebot zu den
        Pflicht-Kriterien. Auch viele Unternehmen, darunter beispielsweise Google, haben inzwischen die HTTPS-Verbindung
        zum Standard erklärt. Seiten, die nicht per HTTPS erreichbar sind, werden entsprechend von Google im
        Suchergebnis schlechter platziert.</p>
      <p>Inzwischen gibt es TLS-Zertifikate für Verschlüsselte Server-Kommunikation auch kostenlos, z. B. von
        <a href='https://letsencrypt.org/getting-started/' target='_blank' rel='noopener noreferrer'>Let's Encrypt</a>.</p>
      <p>Lesetipp: <a href='https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html' target='_blank' rel='noopener noreferrer'>HTTPS as a ranking signal </a></p>
    </CriteriumField>;
  }
}

export default HTTPSField;
