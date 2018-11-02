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
    this.loadData();
  }

  loadData = () => {
    axios.get('/api/v1/spider-results/compact/')
      .then((response) => {
        // handle success
        let sitesHash = {};
        let maxDate = '';
        for (var site of response.data) {
          sitesHash[site.input_url] = site;
          
          // get latest date
          if (site.created > maxDate) {
            maxDate = site.created;
          }
        }

        this.setState({
          loading: false,
          sitesHash: sitesHash,
          sitesLastUpdated: maxDate,
          searchIndex: this.createSearchIndex(response.data),
        });

      })
      .catch((error) => {
        // handle error
        console.error(error);
        this.setState({loading: false});
      })
      .then(() => {
        // always executed
      });
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
                <Route render={() => <SitesSearch sitesHash={this.state.sitesHash} searchIndex={this.state.searchIndex} />} exact path="/" />
                <Route component={(match) => <SiteDetailsPage match={match} sitesHash={this.state.sitesHash} />} path="/sites/:siteId" />
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
