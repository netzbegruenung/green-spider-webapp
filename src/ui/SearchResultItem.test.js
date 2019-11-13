import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import SearchResultItem from './SearchResultItem';

it('renders without crashing', () => {
  const site = {
    _source: {
      url: 'http://example.com/',
      meta: {
        level: 'DE:ORTSVERBAND',
      }
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <SearchResultItem site={site}/>
    </Router>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
