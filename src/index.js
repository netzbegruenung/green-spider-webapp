import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import results from './spider_result_compact.json';
import screenshots from './screenshots.json';
import StatusInfo from './StatusInfo';
import ResultsTable from './ResultsTable';
import SiteDetailsPage from './SiteDetailsPage';
import registerServiceWorker from './registerServiceWorker';

const Home = () => (
  <ResultsTable results={results} />
);

const SiteDetails = ({ match }) => (
  <SiteDetailsPage sites={results} screenshots={screenshots} match={match} />
);

const AppMainContent = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/sites/:siteId" component={SiteDetails} />
    </div>
  </Router>
);

ReactDOM.render(<AppMainContent />, document.getElementById('root'));

ReactDOM.render(<StatusInfo results={results}/>, document.getElementById('status'));
registerServiceWorker();
