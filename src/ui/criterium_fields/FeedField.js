import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class FeedField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Die Site verweist auf mind. einen RSS-/Atom-Feed' />;
    }
    
    return <CriteriumField keyProp='feed' type='negative' title='Es sollten RSS- oder Atom-Feeds angeboten und mittels rel=alternate link verlinkt werden'>
        <p>Feeds helfen Suchmaschinen dabei, aktuelle Meldungen zeitnah nach Veröffentlichung in ihren Suchindex
          aufzunehmen, was die Site besser in Suchergebnissen platziert. Außerdem helfen sie auch versierten 
          Nutzer*innen dabei, über neue Inhalte auf dem laufenden zu bleiben.</p>
        <p>Die meistgenutzten CMSe unterstützen die Veröffentlichung von Feeds ohne zusätzlichen Aufwand.</p>
        <p>Anleitung: <a href='https://confluence.netzbegruenung.de/display/SUP/RSS+Feeds+aktivieren' target='_blank'
          rel='noopener noreferrer'>RSS Feeds aktivieren in GCMS</a></p>
      </CriteriumField>;
  }
}

export default FeedField;
