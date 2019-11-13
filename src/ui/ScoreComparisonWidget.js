import axios from 'axios';
import React, { Component } from 'react';
import ScoreField from './ScoreField';
import { TypeField, StateField } from './LocationLabel';

class ScoreComparisonWidget extends Component {
  state = {
    numLowerSites: null,
    numSitesOfType: null,
    numLowerSitesOfType: null,
    numSitesOfState: null,
    numLowerSitesOfState: null,
  };

  componentDidMount() {
    if (this.props.sitesCount) {
      // compare to all sites
      var q1 = '+score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
      axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q1))
        .then((response) => {
          this.setState({
            numLowerSites: response.data.count
          });
        });
      
      // compare to sites of same type
      if (this.props.thisSite.meta.type && this.props.thisSite.meta.level) {
        var q2 = '+meta.type:' + this.props.thisSite.meta.type + ' +meta.level:"' + this.props.thisSite.meta.level + '"';
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q2))
          .then((response) => {
            this.setState({
              numSitesOfType: response.data.count
            });
          });
        var q3 = '+meta.type:' + this.props.thisSite.meta.type + ' +meta.level:"' + this.props.thisSite.meta.level + '" +score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q3))
          .then((response) => {
            this.setState({
              numLowerSitesOfType: response.data.count
            });
          });
      }
      
      // compare to sites of same state
      if (this.props.thisSite.meta.state) {
        var q4 = '+meta.state:"' + this.props.thisSite.meta.state + '"';
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q4))
          .then((response) => {
            this.setState({
              numSitesOfState: response.data.count
            });
          });
        var q5 = '+meta.state:"' + this.props.thisSite.meta.state + '" +score:[0 TO '+ this.props.thisSite.score +'] -score:'+ this.props.thisSite.score;
        axios.get('/api/v1/spider-results/count/?q=' + encodeURIComponent(q5))
          .then((response) => {
            this.setState({
              numLowerSitesOfState: response.data.count
            });
          });
      }

    }
  }

  
  render() {
    if (this.props.sitesCount === null) {
      return <div className='row d-flex'></div>;
    }

    var lowerSites = (this.state.numLowerSites !== null) ? (this.state.numLowerSites / this.props.sitesCount * 100).toFixed(1) : '–';
    var lowerSitesOfType = (this.state.numSitesOfType !== null && this.state.numLowerSitesOfType !== null) ? (this.state.numLowerSitesOfType / this.state.numSitesOfType * 100).toFixed(1) : '–';
    var lowerSitesOfState = (this.state.numSitesOfState !== null && this.state.numLowerSitesOfState !== null) ? (this.state.numLowerSitesOfState / this.state.numSitesOfState * 100).toFixed(1) : '–';

    var rows = [<div key='all'>Besser als { lowerSites }% aller Sites</div>];

    if (this.state.numSitesOfType !== null) {
      rows.push(<div key='type'>Besser als { lowerSitesOfType }% aller <TypeField level={this.props.thisSite.meta.level} type={this.props.thisSite.meta.type} />-Sites</div>);
    }
    if (this.state.numSitesOfState !== null) {
      rows.push(<div key='state'>Besser als { lowerSitesOfState }% aller Sites in <StateField state={this.props.thisSite.meta.state} /></div>);
    }

    return (
      <div className='row d-flex'>
        <div className='col-4 align-self-center'>
          Punkte: <ScoreField score={this.props.thisSite.score} maxScore={this.props.maxScore} />
        </div>
        <div className='col-8 align-self-center'>
          {rows}
        </div>
      </div>
    );
  }
}

export default ScoreComparisonWidget;
