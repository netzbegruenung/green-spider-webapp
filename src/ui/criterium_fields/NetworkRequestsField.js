import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class NetworkRequestsField extends Component {
  render() {
    if (this.props.data.score === this.props.data.max_score) {
      return <CriteriumField keyProp='duration' type='positive' title={`Beim Laden werden nur wenige (${ this.props.data.value }) HTTP-Anfragen benötigt.`} />;
    } else if (this.props.data.score >= 0) {
      return <CriteriumField keyProp='duration' type='mediocre' title={`Beim Laden werden relativ wenige (${ this.props.data.value }) HTTP-Anfragen benötigt.`}>
        <p>Je weniger HTTP-Anfragen für das Laden einer Seite nötig sind, desto schneller kann die Seite geladen werden. Das gilt inbesondere für Netzwerkverbindungen
          mit hohen Latenzen, allen voran Mobilfunknetze.</p>
        <p>HTTP-Anfragen können mit einer Reihe von Maßnahmen reduziert werden. Beispiele:</p>
        <ul>
          <li>Mehrere CSS-Dateien zu einer einzigen zusammen fassen.</li>
          <li>Mehrere JavaScript-Dateien zu einer einzigen zusammen fassen.</li>
          <li>Grafik-Elemente wie z. B. Icons zu Sprites zusammen fassen.</li>
        </ul>
        <p>Auf Seiten, auf denen zahlreiche News-Meldungen angezeigt werden, wobei jeweils eine Abbildung enthalten ist, kann auch schon die Verringerung der Anzahl von News-Beiträgen je Seite eine spürbare Beschleunigung ergeben.</p>
        <p>Weitere Hinweise liefern Werkzeuge wie z. B. <a href="https://developers.google.com/speed/pagespeed/insights/" rel="noopener noreferrer" target="_blank">Google PageSpeed Insights</a></p>
      </CriteriumField>;
    }

    return <CriteriumField keyProp='duration' type='negative' title={`Beim Laden sollten weniger HTTP-Anfragen ausgelöst werden. (Aktuell: ${ this.props.data.value })`}>
        <p>Je weniger HTTP-Anfragen für das Laden einer Seite nötig sind, desto schneller kann die Seite geladen werden. Das gilt inbesondere für Netzwerkverbindungen
          mit hohen Latenzen, allen voran Mobilfunknetze.</p>
        <p>HTTP-Anfragen können mit einer Reihe von Maßnahmen reduziert werden. Beispiele:</p>
        <ul>
          <li>Mehrere CSS-Dateien zu einer einzigen zusammen fassen.</li>
          <li>Mehrere JavaScript-Dateien zu einer einzigen zusammen fassen.</li>
          <li>Grafik-Elemente wie z. B. Icons zu Sprites zusammen fassen.</li>
        </ul>
        <p>Auf Seiten, auf denen zahlreiche News-Meldungen angezeigt werden, wobei jeweils eine Abbildung enthalten ist, kann auch schon die Verringerung der Anzahl von News-Beiträgen je Seite eine spürbare Beschleunigung ergeben.</p>
        <p>Weitere Hinweise liefern Werkzeuge wie z. B. <a href="https://developers.google.com/speed/pagespeed/insights/" rel="noopener noreferrer" target="_blank">Google PageSpeed Insights</a></p>
      </CriteriumField>;
  }
}

export default NetworkRequestsField;
