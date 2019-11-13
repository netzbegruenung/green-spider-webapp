import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class ContactLinkField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='contactlink' type='positive' title='Die Site hat einen Link "Kontakt"' />;
    }

    return <CriteriumField keyProp='contactlink' type='negative' title='Es sollte einen Link namens "Kontakt" geben'>
        <p>Wenn Nutzer*innen mit dem Betreiber einer Site in Kontakt treten wollen, ist ein gut sichtbarer Link mit der
          Beschriftung "Kontakt" eine der einfachsten Möglichkeit.</p>
      </CriteriumField>;
  }
}

export default ContactLinkField;
