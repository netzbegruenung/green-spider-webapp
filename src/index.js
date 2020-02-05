import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import NavBar from './ui/NavBar';
import SitesSearch from './SitesSearch';
import SiteDetailsPage from './SiteDetailsPage';
import history from './lib/history';

export const APIEndpoint = '';
// For development against production API:
//export const APIEndpoint = 'https://cors-anywhere.herokuapp.com/https://green-spider.netzbegruenung.de';

class App extends React.Component {
  state = {
    sitesLastUpdated: null,
    sitesCount: null,
  };

  componentDidMount() {
    axios.get(APIEndpoint + '/api/v1/spider-results/last-updated/')
      .then((response) => {
        if (response.data.last_updated !== this.state.sitesLastUpdated) {
          this.setState({sitesLastUpdated: response.data.last_updated});
        }
      });
    axios.get(APIEndpoint + '/api/v1/spider-results/count/')
      .then((response) => {
        this.setState({sitesCount: response.data.count});
      });
  }

  tokenizeURL = (url) => {
    return url.replace(/[:.-/]+/gi, ' ');
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar sitesLastUpdated={this.state.sitesLastUpdated} />
          <div className='container'>
            <div className='row'>
              <div className='col-lg'></div>
              <div className='col-lg-8 col-sm-12'>
                <Route render={() => <SitesSearch sitesCount={this.state.sitesCount}/>} exact path="/" />
                <Route component={(match) => <SiteDetailsPage match={match} lastUpdated={this.state.sitesLastUpdated} sitesCount={this.state.sitesCount} />} path="/sites/:siteId" />
              </div>
              <div className='col-lg'></div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


// temporary: unregister old service eorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
