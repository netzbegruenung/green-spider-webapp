import React, { Component } from 'react';
import CriteriumField from './CriteriumField';

class CookiesField extends Component {
  state = {thirdPartyCookies: null};

  componentDidMount() {
    let url = Object.keys(this.props.details)[0];
    let cookies = this.props.details[url].cookies;
    if (typeof cookies !== 'undefined') {
      let parsedURL = new URL(url);
      let thirdPartyCookies = cookies.filter(cookie => {
        return parsedURL.hostname.indexOf(cookie.host_key);
      });
      if (thirdPartyCookies.length > 0) {
        this.setState({thirdPartyCookies: thirdPartyCookies});
      }
    }
  }

  expiryString(duration) {
    if (duration < 60 * 3) {
      return Math.floor(duration).toString() + " Sekunden";
    }
    duration = duration / 60.0;
    if (duration < 100) {
      return Math.floor(duration).toString() + " Minuten";
    }
    duration = duration / 60.0;
    if (duration < 48) {
      return Math.floor(duration).toString() + " Stunden";
    }
    duration = duration / 24.0;
    if (duration < 100) {
      return Math.floor(duration).toString() + " Tage";
    }
    duration = duration / 30.0;
    if (duration < 15) {
      return Math.floor(duration).toString() + " Monate";
    }
    duration = duration * 30.0 / 365;
    return Math.floor(duration).toString() + " Jahre";
  }

  render() {
    if (this.props.data.value) {
      return <CriteriumField keyProp='feed' type='positive' title='Es werden keine Third Party Cookies gesetzt' />;
    }

    return (
      <CriteriumField keyProp='feed' type='negative' title='Beim Laden der Site werden Third Party Cookies gesetzt'>
        <p>Cookies von Dritten, auch Third Party Cookies genannt, erlauben das Verfolgen von Nutzer*innen über
          die Grenzen der Seite, auf der die Cookies gesetzt wurden, hinweg. Damit stellen sie einen Eingriff in die
          Informationelle Selbstbestimmung dar, insbesondere dann, wenn sie ohne Einwilligung gesetzt werden.</p>
        <p>Da Green Spider keine Einwilligung in das Setzen von Cookies gibt, werden alle nachstehenden Cookies
          ohne explizite Einwilligung gesetzt.</p>
        <table className='table' style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Name</th>
              <th>Lebensdauer</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.thirdPartyCookies !== null ? this.state.thirdPartyCookies.map((cookie) => {
                return <tr key={[cookie.host_key, cookie.name].join('-')}>
                    <td>{cookie.host_key}</td>
                    <td>{cookie.name}</td>
                    <td>{this.expiryString(Math.abs(cookie.expires_utc - cookie.creation_utc) / 1000000)}</td>
                  </tr>;
              }) : null
            }
          </tbody>
        </table>
      </CriteriumField>
    );
  }
}

export default CookiesField;
