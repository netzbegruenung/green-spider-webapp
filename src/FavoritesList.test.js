import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import FavoritesList from './FavoritesList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <FavoritesList sizeLimit={10} urls={['http://example.com/']}/>
    </Router>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
