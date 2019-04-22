import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CriteriumField extends Component {
  render() {
    if (this.props.type === 'positive') {
      return <div key={this.props.keyProp} className='good'><IconGood /> <span className='align-middle'>{this.props.title}</span></div>;
    } else if (this.props.type === 'mediocre') {
      return <div key={this.props.keyProp} className='mediocre'>{ this.props.icon ? this.props.icon : <IconOptimize /> }<span className='align-middle'>{this.props.title}</span></div>;
    } else {
      return (
        <div key={this.props.keyProp} className='bad'>
          <div><IconBad /> <span className='align-middle'>{this.props.title}</span></div>
          {
            this.props.children ? <div className='criterium-details'>{this.props.children}</div> : null
          }
        </div>
      );
    }
  }
}

CriteriumField.propTypes = {
  type: PropTypes.oneOf(['positive', 'mediocre', 'negative']),
  title: PropTypes.string.isRequired,
  keyProp: PropTypes.string.isRequired,
  icon: PropTypes.instanceOf(Component),
};

class IconGood extends Component {
  render() {
    return <i className='icon ion-md-checkmark-circle align-middle'></i>;
  }
}

class IconBad extends Component {
  render() {
    return <i className='icon ion-md-close-circle align-middle'></i>;
  }
}

class IconOptimize extends Component {
  render() {
    return <i className='icon ion-md-construct align-middle'></i>;
  }
}

export default CriteriumField;
