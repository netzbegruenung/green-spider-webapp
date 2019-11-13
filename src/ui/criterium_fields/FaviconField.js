import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class FaviconField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='favicon' type='positive' title='Die Site hat ein Icon' />;
    }

    return <CriteriumField keyProp='favicon' type='negative' title='Die Site benötigt ein Icon'>
        <p>Ein Icon hilft Nutzer*innen, ein Browser-Tab oder ein Bookmark der Site besser wieder zu erkennen.</p>
        <p>Anleitung: <a href='https://www.w3.org/2005/10/howto-favicon' target='_blank' rel='noopener noreferrer'>How
        to Add a Favicon to your Site</a></p>
      </CriteriumField>;
  }
}

export default FaviconField;
