import React from 'react';
import ReactDOM from 'react-dom';
import ResultsTable from './ResultsTable';

const results = [
  {
    "cms": [
      "joomla"
    ],
    "created": "2018-10-02T14:02:43.285807+00:00",
    "icons": {
      "http://die-gruenen-bissendorf.de/": "932005cdd933ad5de0f1e8197c77e195.ico"
    },
    "input_url": "http://die-gruenen-bissendorf.de/",
    "meta": {
      "city": "Bissendorf",
      "district": "Osnabrück-Land",
      "level": "DE:ORTSVERBAND",
      "state": "Niedersachsen",
      "type": "REGIONAL_CHAPTER"
    },
    "rating": {
      "CANONICAL_URL": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "DNS_RESOLVABLE_IPV4": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FAVICON": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FEEDS": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "HTTPS": {
        "max_score": 2,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "HTTP_RESPONSE_DURATION": {
        "max_score": 1.0,
        "score": 0.5,
        "type": "number",
        "value": 134
      },
      "NO_NETWORK_ERRORS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "NO_SCRIPT_ERRORS": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "RESPONSIVE": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "SITE_REACHABLE": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "USE_SPECIFIC_FONTS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "WWW_OPTIONAL": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      }
    },
    "resulting_urls": [
      "http://www.die-gruenen-bissendorf.de/",
      "http://die-gruenen-bissendorf.de/"
    ],
    "score": 6.5
  },
  {
    "cms": [
      "wordpress-urwahl"
    ],
    "created": "2018-10-02T14:38:33.424517+00:00",
    "icons": {
      "http://die-gruenen-burscheid.de/": "b0166db4002d18f757c53ff6c34cb3ab.png"
    },
    "input_url": "http://die-gruenen-burscheid.de/",
    "meta": {
      "city": "Burscheid",
      "district": "Rheinisch-Bergischer Kreis",
      "level": "DE:ORTSVERBAND",
      "state": "Nordrhein-Westfalen",
      "type": "REGIONAL_CHAPTER"
    },
    "rating": {
      "CANONICAL_URL": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "DNS_RESOLVABLE_IPV4": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FAVICON": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FEEDS": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "HTTPS": {
        "max_score": 2,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "HTTP_RESPONSE_DURATION": {
        "max_score": 1.0,
        "score": 0.5,
        "type": "number",
        "value": 780
      },
      "NO_NETWORK_ERRORS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "NO_SCRIPT_ERRORS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "RESPONSIVE": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "SITE_REACHABLE": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "USE_SPECIFIC_FONTS": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "WWW_OPTIONAL": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      }
    },
    "resulting_urls": [
      "http://die-gruenen-burscheid.de/"
    ],
    "score": 8.5
  },
  {
    "cms": [
      "wordpress"
    ],
    "created": "2018-10-02T11:25:27.604681+00:00",
    "icons": {
      "http://die-gruenen-meppen.de/": "75da0b668686a57ff9622eeb5f54a2b5.ico"
    },
    "input_url": "http://die-gruenen-meppen.de/",
    "meta": {
      "city": "Meppen",
      "district": "Emsland-Süd",
      "level": "DE:ORTSVERBAND",
      "state": "Niedersachsen",
      "type": "REGIONAL_CHAPTER"
    },
    "rating": {
      "CANONICAL_URL": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "DNS_RESOLVABLE_IPV4": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FAVICON": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "FEEDS": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "HTTPS": {
        "max_score": 2,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "HTTP_RESPONSE_DURATION": {
        "max_score": 1.0,
        "score": 0.5,
        "type": "number",
        "value": 500
      },
      "NO_NETWORK_ERRORS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "NO_SCRIPT_ERRORS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "RESPONSIVE": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "SITE_REACHABLE": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "USE_SPECIFIC_FONTS": {
        "max_score": 1,
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "WWW_OPTIONAL": {
        "max_score": 1,
        "score": 1,
        "type": "boolean",
        "value": true
      }
    },
    "resulting_urls": [
      "http://die-gruenen-meppen.de/"
    ],
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
  ReactDOM.render(<ResultsTable results={results} screenshots={screenshots}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
