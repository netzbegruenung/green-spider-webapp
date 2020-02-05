import axios from 'axios';
import React, { Component } from 'react';
import { APIEndpoint } from '../index';

class Screenshots extends Component {
  _isMounted = false;

  state = {
    isLoading: true,
    screenshots: null,
  };

  componentDidMount() {
    this._isMounted = true;

    var baseURL = 'http://green-spider-screenshots.sendung.de';

    // load data
    if (this.props.url) {
      let url = this.props.url;

      axios.get(APIEndpoint + `/api/v1/screenshots/site?url=${encodeURIComponent(url)}`)
        .then((response) => {
          // Success
          let screenshots = null;

          if (response.data.length > 0) {
            screenshots = {mobile: null, desktop: null};

            for (let i=0; i<response.data.length; i++) {
              response.data[i].screenshot_url = response.data[i].screenshot_url.replace(baseURL, '/screenshots');
              let width = response.data[i].size[0];
              if (width < 500) {
                screenshots.mobile = response.data[i];
              } else {
                screenshots.desktop = response.data[i];
              }
            }
          }

          if (this._isMounted) {
            this.setState({
              isLoading: false,
              screenshots: screenshots,
            });
          }
        })
        .catch((error) => {
          // handle error
          console.error(error);
          if (this._isMounted) {
            this.setState({isLoading: false});
          }
        });
    } else {
      if (this._isMounted) {
        this.setState({isLoading: false});
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.screenshots === null) {
      if (this.state.isLoading) {
        return <div>Lade Screenshots...</div>;
      } else {
        return <div>Aktuell sind keine Screenshots vorhanden</div>;
      }
    }

    let mobile = null;
    let desktop = null;
    let created = null;

    if (this.state.screenshots.mobile !== null) {
      mobile = (
        <a className='screenshot' href={'https://green-spider.netzbegruenung.de'+this.state.screenshots.mobile.screenshot_url} target='_blank' rel='noopener noreferrer' title='Screenshot für Smartphone-Ansicht anzeigen'>
          <img className='screenshot' src={this.state.screenshots.mobile.screenshot_url} width='100%' alt='Mobile Screenshot' />
        </a>
      );
      created = this.state.screenshots.mobile.created;
    }
    if (this.state.screenshots.desktop !== null) {
      desktop = (
        <a className='screenshot' href={'https://green-spider.netzbegruenung.de'+this.state.screenshots.desktop.screenshot_url} target='_blank' rel='noopener noreferrer' title='Screenshot für Desktop-Ansicht anzeigen'>
          <img className='screenshot' src={this.state.screenshots.desktop.screenshot_url} width='100%' alt='Desktop Screenshot' />
        </a>
      );
      created = this.state.screenshots.desktop.created;
    }

    return (
      <div className='row'>
        <div className='col-12'>
          <div className='row d-flex align-items-stretch'>
            <div className='col-3'>{mobile}</div>
            <div className='col-9'>{desktop}</div>
          </div>
          <div className='row'>
            <div className='col-12 text-right'>
              <small>Screenshots vom {new Date(created).toLocaleDateString('de-DE')}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Screenshots;
