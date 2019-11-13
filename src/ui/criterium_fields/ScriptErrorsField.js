import React, { Component } from 'react';
import LoggedErrorsField from './LoggedErrorsField';

class ScriptErrorsField extends Component {
  state = {logEntries: null};

  componentDidMount() {
    let logEntries = Object.values(this.props.details)[0].logs;
    if (typeof logEntries !== 'undefined') {
      let filteredEntries = logEntries.filter(item => item.source === 'javascript');
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
      return <LoggedErrorsField keyProp='noscripterrors' type='positive' titlePositive='Es wurden keine JavaScript-Fehler festgestellt' />;
    }

    return <LoggedErrorsField keyProp='noscripterrors' type='negative' titleNegative='JavaScript-Fehler beheben' logEntries={this.state.logEntries} />;
  }
}

export default ScriptErrorsField;
