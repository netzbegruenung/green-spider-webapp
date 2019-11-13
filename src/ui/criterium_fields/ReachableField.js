import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class ReachableField extends Component {
  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='reachable' type='positive' title='Die Site war beim Test erreichbar' />;
    }

    return <CriteriumField keyProp='reachable' type='negative' title='Die Site war beim letzten Test nicht erreichbar'>
      <table className='table'>
        <thead>
          <tr>
            <th>URL</th>
            <th>HTTP Status</th>
            <th>Fehlermeldung</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.values(this.props.details).map(item => {
              return <tr key={item.url}>
                <td>{item.url}</td>
                <td>{item.status}</td>
                <td>{item.exception ? item.exception.message : null}</td>
              </tr>;
            })
          }
        </tbody>
      </table>
    </CriteriumField>;
  }
}

export default ReachableField;
