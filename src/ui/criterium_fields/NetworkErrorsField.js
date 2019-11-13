
import React, { Component } from 'react';
import LoggedErrorsField from './LoggedErrorsField';

class NetworkErrorsField extends Component {
  state = {logEntries: null};

  componentDidMount() {
    let logEntries = Object.values(this.props.details)[0].logs;
    if (typeof logEntries !== 'undefined') {
      let filteredEntries = logEntries.filter(item => item.source !== 'javascript');
      if (filteredEntries.length > 0) {
        this.setState({logEntries: filteredEntries});
      }
    }
  }

  render() {
    if (typeof this.props.data === 'undefined') {
      return <div />;
    }

    if (this.props.data.value) {
      return <LoggedErrorsField keyProp='nonetworkerrors' type='positive' titlePositive='Es wurden keine Probleme beim Laden verknüpfter Ressourcen festgestellt' />;
    }

    return (
      <LoggedErrorsField keyProp='nonetworkerrors' type='negative' titleNegative='Fehler beim Laden verknüpfter Ressourcen vermeiden' logEntries={this.state.logEntries} />
    );
  }
}

export default NetworkErrorsField;
