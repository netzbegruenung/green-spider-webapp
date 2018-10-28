import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import sitesData from './spider_result_compact.json';
import screenshots from './screenshots.json';
import StatusInfo from './StatusInfo';
import ResultsList from './ResultsList';
import SiteDetailsPage from './SiteDetailsPage';
import registerServiceWorker from './registerServiceWorker';
import lunr from 'lunr';

let searchIndex = lunr(function() {
  this.field('url');
  this.field('state');
  this.field('district');
  this.field('city');

  for (var site of sitesData) {
    this.add({
      "id": site.input_url,
      "url": [site.input_url],
      "state": site.meta.state,
      "district": site.meta.district,
      "city": site.meta.city,
    });
  }
});

const Home = () => (
  <ResultsList results={sitesData} searchIndex={searchIndex} />
);

const SiteDetails = ({ match }) => (
  <SiteDetailsPage sites={sitesData} screenshots={screenshots} match={match} />
);

const AppMainContent = () => (
  <Router>
    <div className='row'>
      <div className='col-lg'></div>
      <div className='col-lg-8 col-sm-12'>
        <Route exact path="/" component={Home} />
        <Route path="/sites/:siteId" component={SiteDetails} />
      </div>
      <div className='col-lg'></div>
    </div>
  </Router>
);

ReactDOM.render(<AppMainContent />, document.getElementById('root'));

ReactDOM.render(<StatusInfo results={sitesData}/>, document.getElementById('status'));
registerServiceWorker();
