import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import SitesSearch from './SitesSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SitesSearch sitesCount={1000} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
