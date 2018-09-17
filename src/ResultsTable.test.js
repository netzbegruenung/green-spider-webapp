import React from 'react';
import ReactDOM from 'react-dom';
import ResultsTable from './ResultsTable';

const results = [
  {
    "details": {
      "canonical_urls": [
        "http://die-gruenen-bissendorf.de/"
      ],
      "cms": "joomla",
      "feeds": [
        "http://die-gruenen-bissendorf.de/index.php?format=feed&type=rss"
      ],
      "hostnames": {
        "die-gruenen-bissendorf.de": {
          "aliases": [
            "die-gruenen-bissendorf.de",
            "www.die-gruenen-bissendorf.de"
          ],
          "ip_addresses": [
            "80.77.31.190"
          ],
          "resolvable": true,
          "resolved_hostname": "die-gruenen-bissendorf.de"
        },
        "www.die-gruenen-bissendorf.de": {
          "resolvable": false
        }
      },
      "icons": {
        "http://die-gruenen-bissendorf.de/templates/etosha/favicon.ico": "932005cdd933ad5de0f1e8197c77e195.ico"
      },
      "ipv4_addresses": [
        "80.77.31.190"
      ],
      "resolvable_urls": [
        {
          "error": null,
          "redirects_to": null,
          "url": "http://die-gruenen-bissendorf.de/"
        },
        {
          "error": {
            "message": "HTTPSConnectionPool(host='die-gruenen-bissendorf.de', port=443): Max retries exceeded with url: / (Caused by SSLError(CertificateError(\"hostname 'die-gruenen-bissendorf.de' doesn't match either of 'allstats.fc-host41.de', 'cp.fc-host41.de', 'dateimanager.fc-host41.de', 'fc-host41.de', 'imap.fc-host41.de', 'mail.fc-host41.de', 'mysql.fc-host41.de', 'stats.fc-host41.de', 'webmail.fc-host41.de', 'www.fc-host41.de'\",),))",
            "type": "<class 'requests.exceptions.SSLError'>"
          },
          "redirects_to": null,
          "url": "https://die-gruenen-bissendorf.de/"
        }
      ],
      "responsive": {
        "min_width": 1147
      },
      "urlchecks": [
        {
          "content": {
            "canonical_link": null,
            "encoding": "utf-8",
            "feeds": [
              "http://die-gruenen-bissendorf.de/index.php?format=feed&type=rss",
              "http://die-gruenen-bissendorf.de/index.php?format=feed&type=rss"
            ],
            "generator": "Joomla! 1.5 - Open Source Content Management",
            "icon": "http://die-gruenen-bissendorf.de/templates/etosha/favicon.ico",
            "opengraph": null,
            "title": "Willkommen bei den Grünen in Bissendorf"
          },
          "duration": 206,
          "error": null,
          "responsive": {
            "document_width": {
              "1024x768": 1185,
              "1920x1080": 1905,
              "320x480": 1147,
              "768x1024": 1147
            },
            "viewport_meta_tag": null
          },
          "status_code": 200,
          "url": "http://die-gruenen-bissendorf.de/"
        }
      ]
    },
    "input_url": "http://die-gruenen-bissendorf.de/",
    "meta": {
      "city": "Bissendorf",
      "district": "Osnabrück-Land",
      "level": "DE:ORTSVERBAND",
      "state": "Niedersachsen"
    },
    "result": {
      "CANONICAL_URL": {
        "score": 1,
        "value": true
      },
      "DNS_RESOLVABLE_IPV4": {
        "score": 1,
        "value": true
      },
      "FAVICON": {
        "score": 1,
        "value": true
      },
      "FEEDS": {
        "score": 1,
        "value": true
      },
      "HTTPS": {
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "HTTP_RESPONSE_DURATION": {
        "score": 0.5,
        "type": "number",
        "value": 206
      },
      "RESPONSIVE": {
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "SITE_REACHABLE": {
        "score": 1,
        "value": true
      },
      "WWW_OPTIONAL": {
        "score": 0,
        "type": "boolean",
        "value": false
      }
    },
    "score": 5.5
  },
  {
    "details": {
      "canonical_urls": [
        "http://die-gruenen-burscheid.de/"
      ],
      "cms": "wordpress-urwahl",
      "feeds": [
        "http://die-gruenen-burscheid.de/comments/feed/",
        "http://die-gruenen-burscheid.de/feed/"
      ],
      "hostnames": {
        "die-gruenen-burscheid.de": {
          "aliases": [
            "die-gruenen-burscheid.de"
          ],
          "ip_addresses": [
            "217.160.122.91"
          ],
          "resolvable": true,
          "resolved_hostname": "die-gruenen-burscheid.de"
        },
        "www.die-gruenen-burscheid.de": {
          "aliases": [
            "www.die-gruenen-burscheid.de"
          ],
          "ip_addresses": [
            "217.160.122.91"
          ],
          "resolvable": true,
          "resolved_hostname": "www.die-gruenen-burscheid.de"
        }
      },
      "icons": {
        "http://die-gruenen-burscheid.de/wp-content/themes/urwahl3000/favicon.png": "b0166db4002d18f757c53ff6c34cb3ab.png"
      },
      "ipv4_addresses": [
        "217.160.122.91"
      ],
      "resolvable_urls": [
        {
          "error": null,
          "redirects_to": null,
          "url": "http://die-gruenen-burscheid.de/"
        },
        {
          "error": null,
          "redirects_to": "http://die-gruenen-burscheid.de/",
          "url": "http://www.die-gruenen-burscheid.de/"
        },
        {
          "error": {
            "message": "HTTPSConnectionPool(host='die-gruenen-burscheid.de', port=443): Max retries exceeded with url: / (Caused by SSLError(SSLError(1, '[SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:841)'),))",
            "type": "<class 'requests.exceptions.SSLError'>"
          },
          "redirects_to": null,
          "url": "https://die-gruenen-burscheid.de/"
        },
        {
          "error": {
            "message": "HTTPSConnectionPool(host='www.die-gruenen-burscheid.de', port=443): Max retries exceeded with url: / (Caused by SSLError(SSLError(1, '[SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:841)'),))",
            "type": "<class 'requests.exceptions.SSLError'>"
          },
          "redirects_to": null,
          "url": "https://www.die-gruenen-burscheid.de/"
        }
      ],
      "responsive": {
        "min_width": 305,
        "viewport_meta_tag": [
          "width=device-width, initial-scale=1.0"
        ]
      },
      "urlchecks": [
        {
          "content": {
            "canonical_link": "http://die-gruenen-burscheid.de/",
            "encoding": "utf-8",
            "feeds": [
              "http://die-gruenen-burscheid.de/feed/",
              "http://die-gruenen-burscheid.de/comments/feed/"
            ],
            "generator": null,
            "icon": "http://die-gruenen-burscheid.de/wp-content/themes/urwahl3000/favicon.png",
            "opengraph": [
              "og:description",
              "og:site_name",
              "og:title",
              "og:type",
              "og:url"
            ],
            "title": "Die Grünen in Burscheid"
          },
          "duration": 690,
          "error": null,
          "responsive": {
            "document_width": {
              "1024x768": 1009,
              "1920x1080": 1905,
              "320x480": 305,
              "768x1024": 753
            },
            "viewport_meta_tag": "width=device-width, initial-scale=1.0"
          },
          "status_code": 200,
          "url": "http://die-gruenen-burscheid.de/"
        }
      ]
    },
    "input_url": "http://die-gruenen-burscheid.de/",
    "meta": {
      "city": "Burscheid",
      "district": "Rheinisch-Bergischer Kreis",
      "level": "DE:ORTSVERBAND",
      "state": "Nordrhein-Westfalen"
    },
    "result": {
      "CANONICAL_URL": {
        "score": 1,
        "value": true
      },
      "DNS_RESOLVABLE_IPV4": {
        "score": 1,
        "value": true
      },
      "FAVICON": {
        "score": 1,
        "value": true
      },
      "FEEDS": {
        "score": 1,
        "value": true
      },
      "HTTPS": {
        "score": 0,
        "type": "boolean",
        "value": false
      },
      "HTTP_RESPONSE_DURATION": {
        "score": 0.5,
        "type": "number",
        "value": 690
      },
      "RESPONSIVE": {
        "score": 1,
        "type": "boolean",
        "value": true
      },
      "SITE_REACHABLE": {
        "score": 1,
        "value": true
      },
      "WWW_OPTIONAL": {
        "score": 1,
        "value": true
      }
    },
    "score": 7.5
  },
];

const screenshots = {
  "http://2016.gruene-rodgau.de": "93695b13199eb7b301b967aae03b8fde.png",
  "http://agl-eberbach.de/aktuelles.html": "11d8fa9f7e60fd7ff794606cd0b42af2.png",
  "http://al-gruene.de/": "580cce185c75d7a648b597d3bf4e4325.png",
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsTable results={results} screenshots={screenshots}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
