import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

/**
 * A cheap hash function for hashing strings
 * 
 * @param String The string to be hashed
 */
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
      return hash;
  }
  for (let i=0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

class LoggedErrorsField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <CriteriumField keyProp={this.props.keyProp} type='positive' title={this.props.titlePositive} />;
    }

    return (
      <CriteriumField keyProp={this.props.keyProp} type='negative' title={this.props.titleNegative}>
        { this.props.logEntries !== null && this.props.logEntries !== [] ?
          <table className='table'>
            <tbody>
              {
                this.props.logEntries.map((item) => {
                  return <tr key={hashCode([item.source, item.level, item.message].join('-'))}>
                      <td><span className='badge badge-primary'>{item.source}</span></td>
                      <td><span className={item.level === 'SEVERE' ? 'badge badge-danger' : 'badge badge-warning'}>{item.level}</span></td>
                      <td><code>{item.message}</code></td>
                    </tr>;
                })
              }
            </tbody>
          </table>
        :
        <p>Es können leider keine Details zu den gesammelten Fehlern angezeigt werden.</p> }
      </CriteriumField>  
    );
  }
}

export default LoggedErrorsField;
