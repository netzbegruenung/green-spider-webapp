import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class ResponsiveField extends Component {
    render() {
      if (this.props.data.score === this.props.data.max_score) {
        return <CriteriumField keyProp='responsive' type='positive' title='Die Site ist offenbar auf mobilen Endgeräten nutzbar' />;
      } else if (this.props.data.score > 0) {
        return <CriteriumField keyProp='responsive' type='mediocre' title='Mobile Endgeräte könnten noch besser unterstützt werden' />;
      }
  
      return <CriteriumField keyProp='responsive' type='negative' title='Mobile Endgeräte sollten unterstützt werden'>
          <p>Immer mehr Menschen nutzen das Web über ein mobiles Endgerät wie z. B. ein Smartphone. Die Site sollte
            dies unterstützen, indem das Layout sich <em>"responsive"</em> an das Endgerät anpasst.</p>
          <p>Green Spider testet, wie breit die Startseite der Site auf verschieden breiten Bildschirmen ausfällt.
            Ist in einer Breite die Seite breiter als der Bildschirm, so gilt der Test als nicht bestanden.
            Nutzer*innen con Smartphones sehen in diesen Fällen häufig einen horizontalen Scrollbalken oder müssen
            zum vollständigen Betrachten der Seite die Inhalte horizontal Verschieben.</p>
  
          <p>Tipp: Zieh den Browserfenster so schmal wie Du kannst, im besten Fall auf 360 Pixel Breite. Damit erhältst
            Du einen Eindruck, welche Inhalte über den Rand hinausragen.</p>
        </CriteriumField>;
    }
  }

  export default ResponsiveField;
  