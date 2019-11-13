import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class FontField extends Component {
  render() {
    let font = 'Arvo';
    if (this.props.meta && this.props.meta.type && this.props.meta.type === 'YOUTH_ORGANIZATION') {
      font = 'Titillium';
    }

    if (typeof this.props.data === 'undefined') {
      return <div />;
    }

    if (this.props.data.value) {
      return <CriteriumField keyProp='font' type='positive' title={`Die Site verwendet die Schriftart ${font}`} />;
    }

    return <CriteriumField keyProp='font' type='negative' title={`Die Site sollte die Schriftart ${font} verwenden`}>
        <p>Die Schriftart Arvo bzw. der Variante für Überschriften, Arvo Gruen, ist ein markanter Bestandteil der
          Corporate-Design-Richtlinien von BÜNDNIS 90/DIE GRÜNEN. Die Verwendung der Schrift hilft dabei, den Absender
          kenntlich zu machen, so wie es auch der Einsatz der richtigen Farben und die Verwendung des Logos tun.</p>
        <p>Die empfohlenen Schriften stehen unter{' '}
          <a href='https://github.com/netzbegruenung/webfonts' target='_blank'
          rel="noopener noreferrer">github.com/netzbegruenung/webfonts</a> für die
          einfache Verwendung auf Webseiten zur Verfügung.</p>
      </CriteriumField>;
  }
}

export default FontField;
