import React, { Component } from 'react';
import CriteriumField from './CriteriumField';
import PropTypes from 'prop-types';


class HTTPSField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='https' type='positive' title='Die Site ist über HTTPS erreichbar' />;
    }

    return <CriteriumField keyProp='https' type='negative' title='Die Site sollte über HTTPS erreichbar sein'>
      <HTTPSProblemsTable details={this.props.details} />
      <p>Per TLS verschlüsselte HTTP-Verbindungen schützen Nutzer*innen vor der Preisgabe privater Informationen.
        Entsprechend gehört HTTPS für immer mehr Nutzer*innen bei einem vertrauenswürdigen Webangebot zu den
        Pflicht-Kriterien. Auch viele Unternehmen, darunter beispielsweise Google, haben inzwischen die HTTPS-Verbindung
        zum Standard erklärt. Seiten, die nicht per HTTPS erreichbar sind, werden entsprechend von Google im
        Suchergebnis schlechter platziert.</p>
      <p>Inzwischen gibt es TLS-Zertifikate für verschlüsselte Server-Kommunikation auch kostenlos, z. B. von
        <a href='https://letsencrypt.org/getting-started/' target='_blank' rel='noopener noreferrer'>Let's Encrypt</a>.</p>
      <p>Lesetipp: <a href='https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html' target='_blank' rel='noopener noreferrer'>HTTPS as a ranking signal </a></p>
    </CriteriumField>;
  }
}

class HTTPSProblemsTable extends Component {
  render() {
    if (typeof this.props.details === 'undefined') {
      return null;
    }

    return <div>
      <p>Sämtliche auflösbaren Hostnamen bzw. Domains sollten per HTTPS erreichbar sein, und sei es nur zum Zweck einer Weiterleitung. Die folgende(n) URL(s) wurden überprüft:</p>
      <ul>
          {
            Object.entries(this.props.details).map((item) => {
              if (item[0].startsWith('https:')) {
                return <li key={item[0]}>
                    <p>
                      <code>{item[0]}</code>
                      {
                        item[1].exception === null ? <span className='badge badge-primary'>OK</span> : <span className='badge badge-warning'>Fehler</span>
                      }
                    </p>
                    {
                      item[1].exception !== null ? <p>Fehlermeldung: <code>{item[1].exception.message}</code></p> : undefined
                    }
                  </li>;
              } else {
                return undefined;
              }
            })
          }
      </ul>
    </div>;
  }
}

HTTPSField.propTypes = {
  data: PropTypes.object,    // HTTPS rating information
  details: PropTypes.object, // url_reachability check details
};

export default HTTPSField;
