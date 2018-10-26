import React, { Component } from 'react';
import './ScoreField.css';
import chroma from 'chroma-js';


class ScoreField extends Component {
  render() {
    var ratio = this.props.score / this.props.maxScore;
    var bg = chroma.mix('#8D5335', '#75B66B', ratio);
    return <span className='ScoreField align-self-center' style={{backgroundColor: bg.hex()}}>{ this.props.score }</span>;
  }
}

export default ScoreField;
