import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import './CriteriumField.css';

const transitionDuration = 300;

const defaultTransitionStyle = {
  transition: `max-height ${transitionDuration}ms ease-in-out`,
  maxHeight: 0,
  overflowY: 'hidden',
};

const transitionStyles = {
  entering: { maxHeight: 500 },
  entered:  { maxHeight: 500, overflowY: 'auto' },
  exiting:  { maxHeight: 0 },
  exited:  { maxHeight: 0 },
};


class CriteriumField extends Component {
  state = {expanded: false};

  showHide = (evt) => {
    evt.preventDefault();
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    if (this.props.type === 'positive') {
      return (
        <div key={this.props.keyProp} className='CriteriumField good'>
          <IconGood />
          <span className='align-middle'>{this.props.title}</span>
        </div>
      );
    } else if (this.props.type === 'mediocre') {
      if (this.props.children === null || typeof this.props.children === 'undefined') {
        return (
          <div key={this.props.keyProp} className='CriteriumField mediocre'>
            { this.props.icon ? this.props.icon : <IconOptimize /> }
            <span className='align-middle'>{this.props.title}</span>
          </div>
        );
      }

      return (
        <div key={this.props.keyProp} className='CriteriumField mediocre'>
          <div className='CriteriumField-title'>
            <a href='/' onClick={this.showHide}>
              { this.props.icon ? this.props.icon : <IconOptimize /> }
              <span className='align-middle'>{this.props.title}</span>
            </a>
          </div>
          <Transition in={this.state.expanded} timeout={transitionDuration}>
            {state => (
              <div style={{
                ...defaultTransitionStyle,
                ...transitionStyles[state]
                }} className={`CriteriumField-details CriteriumField-${state}`}>
                {this.props.children}
              </div>
            )}
          </Transition>
        </div>
      );
    } else {
      if (this.props.children === null || typeof this.props.children === 'undefined') {
        return (
          <div key={this.props.keyProp} className='CriteriumField bad'>
            <div><IconBad /> <span className='align-middle'>{this.props.title}</span></div>
          </div>
        );
      }

      return (
        <div key={this.props.keyProp} className='CriteriumField bad'>
          <div className='CriteriumField-title'><a href='/' onClick={this.showHide}><IconBad /> <span className='align-middle'>{this.props.title}</span></a></div>
            <Transition in={this.state.expanded} timeout={transitionDuration}>
              {state => (
                <div style={{
                  ...defaultTransitionStyle,
                  ...transitionStyles[state]
                  }} className={`CriteriumField-details CriteriumField-${state}`}>
                  {this.props.children}
                </div>
              )}
            </Transition>
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
