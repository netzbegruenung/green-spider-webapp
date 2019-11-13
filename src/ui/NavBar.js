import React, { Component } from 'react';
import StatusInfo from './StatusInfo';

class NavBar extends Component {
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 header border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto"><a href="/">Green Spider</a></h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <span id="status" className="p-2"><StatusInfo sitesLastUpdated={this.props !== null ? this.props.sitesLastUpdated : null}/></span>
          <a className="p-2 text-light" href="https://github.com/netzbegruenung/green-spider/"><i className="ion-logo-github"></i> GitHub</a>
          <a className="p-2 text-light" href="https://blog.netzbegruenung.de/projekte/green-spider/"><i className="ion-md-information-circle"></i> Über</a>
        </nav>
      </div>
    );
  }
}

export default NavBar;
