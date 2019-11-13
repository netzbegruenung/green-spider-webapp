import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import LocationLabel from './LocationLabel';
import ScoreField from './ScoreField';
import URLField from './URLField';


class SearchResultItem extends Component {
  render() {
    return (
      <Link key={this.props.site._source.url} to={`/sites/${ encodeURIComponent(this.props.site._source.url) }`} className='SitesSearch'>
        <div className='SitesSearch row'>
          <div className='col-9 col-sm-10 col-md-10'>
            <LocationLabel
              level={this.props.site._source.meta.level}
              type={this.props.site._source.meta.type}
              district={this.props.site._source.meta.district}
              city={this.props.site._source.meta.city}
              state={this.props.site._source.meta.state} truncate={true} />
            <URLField url={this.props.site._source.url} link={false} />
          </div>
          <div className='col-3 col-sm-2 col-md-2 d-flex'>
            <ScoreField score={this.props.site._source.score} maxScore={16} />
          </div>
        </div>
      </Link>
    );
  }
}

SearchResultItem.propTypes = {
  site: PropTypes.object.isRequired,
};

export default SearchResultItem;

