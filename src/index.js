import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import ResultsTable from './ResultsTable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ResultsTable />, document.getElementById('root'));
registerServiceWorker();
