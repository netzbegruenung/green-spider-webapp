import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import results from './spider_result.json';
import screenshots from './screenshots.json';
import ResultsTable from './ResultsTable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ResultsTable results={results} screenshots={screenshots}/>, document.getElementById('root'));
registerServiceWorker();
