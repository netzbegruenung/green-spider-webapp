import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import SitesSearch from './SitesSearch';

const results = [
  {
    "created": "2018-10-02T14:02:43.285807+00:00",
    "input_url": "http://die-gruenen-bissendorf.de/",
    "meta": {
      "city": "Bissendorf",
      "district": "Osnabrück-Land",
      "level": "DE:ORTSVERBAND",
      "state": "Niedersachsen",
      "type": "REGIONAL_CHAPTER"
    },
    "score": 6.5
  },
  {
    "created": "2018-10-02T14:38:33.424517+00:00",
    "input_url": "http://die-gruenen-burscheid.de/",
    "meta": {
      "city": "Burscheid",
      "district": "Rheinisch-Bergischer Kreis",
      "level": "DE:ORTSVERBAND",
      "state": "Nordrhein-Westfalen",
      "type": "REGIONAL_CHAPTER"
    },
    "score": 8.5
  },
  {
    "created": "2018-10-02T11:25:27.604681+00:00",
    "input_url": "http://die-gruenen-meppen.de/",
    "meta": {
      "city": "Meppen",
      "district": "Emsland-Süd",
      "level": "DE:ORTSVERBAND",
      "state": "Niedersachsen",
      "type": "REGIONAL_CHAPTER"
    },
    "score": 6.5
  },
];

const screenshots = {
  "http://www.die-gruenen-bissendorf.de/": "93695b13199eb7b301b967aae03b8fde.png",
  "http://die-gruenen-burscheid.de/": "0ac84f36d27c5d5b8f10657fa5a501bb.png",
  "http://die-gruenen-meppen.de/": "9eb95b52e37211ca0c2e1c9fb54be2ec.png",
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SitesSearch results={results} screenshots={screenshots}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
