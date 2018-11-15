import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import NavBar from './NavBar';
import SitesSearch from './SitesSearch';
import SiteDetailsPage from './SiteDetailsPage';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import axios from 'axios';
import lunr from 'lunr';


class App extends React.Component {
  state = {
    loading: true,
    searchIndex: null,
    sitesLastUpdated: null,
    sitesHash: null,
  };

  componentDidMount = () => {
    // check for fresh data every 5 minutes
    window.setInterval(this.loadData, 5 * 60 * 1000);

    // and load fresh data now
    this.loadData();
  }

  loadData = () => {
    axios.get('/api/v1/spider-results/last-updated/')
      .then((response) => {
        // load data only of newer than what we have
        if (response.data.last_updated !== this.state.sitesLastUpdated) {
          this.setState({loading: true});

          axios.get('/api/v1/spider-results/compact/?date=' + encodeURIComponent(response.data.last_updated))
            .then((response2) => {
              // handle success
              let sitesHash = {};
              for (var site of response2.data) {
                sitesHash[site.input_url] = site;
              }

              this.setState({
                loading: false,
                sitesHash: sitesHash,
                sitesLastUpdated: response.data.last_updated,
                searchIndex: this.createSearchIndex(response2.data),
              });

            })
            .catch((error) => {
              console.error(error);
              this.setState({loading: false});
            })
        }
      })
      .catch((error) => {
        console.error('error checking for updates', error);
      })
  }

  createSearchIndex = (sites) => {
    let searchIndex = lunr(function() {
      this.field('url');
      this.field('state');
      this.field('district');
      this.field('city');
    
      for (var site of sites) {
        this.add({
          "id": site.input_url,
          "url": [site.input_url],
          "state": site.meta.state,
          "district": site.meta.district,
          "city": site.meta.city,
        });
      }
    });

    return searchIndex;
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
                <Route render={() => <SitesSearch sitesHash={this.state.sitesHash} searchIndex={this.state.searchIndex} lastUpdated={this.state.sitesLastUpdated} />} exact path="/" />
                <Route component={(match) => <SiteDetailsPage match={match} sitesHash={this.state.sitesHash} lastUpdated={this.state.sitesLastUpdated} />} path="/sites/:siteId" />
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

registerServiceWorker();
