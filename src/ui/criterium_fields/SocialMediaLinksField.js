import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class SocialMediaLinksField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='socialmedialinks' type='positive' title='Die Site verlinkt auf Social Media Profile' />;
    }

    return <CriteriumField keyProp='socialmedialinks' type='negative' title='Es sollte mind. einen Link zu einem Social Media Profil geben'>
        <p>Über Social-Media-Profile ist es möglich, häufiger mit Nutzer*innen in Kontakt zu treten. Sofern es Profile
          gibt, sollten diese am besten von jeder Seite der Site verlinkt werden. Aktuell werden Links zu Facebook, 
          Twitter und Instagram gewertet.</p>
      </CriteriumField>;
  }
}

export default SocialMediaLinksField;
