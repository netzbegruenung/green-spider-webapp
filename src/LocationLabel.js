import React, { Component } from 'react';

class TypeField extends Component {
  render() {
    var label = '';
    var title = '';

    if (this.props.level === 'DE:BUNDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Bundesverband';
        label = 'GJ BV';
      } else {
        title = 'Bundesverband';
        label = 'BV';
      }
    } else if (this.props.level === 'DE:LANDESVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Landesverband';
        label = 'GJ LV';
      } else {
        title = 'Landesverband';
        label = 'LV';
      }
    } else if (this.props.level === 'DE:REGIONALVERBAND') {
      title = 'Regionalverband';
      label = 'RV';
    } else if (this.props.level === 'DE:BEZIRKSVERBAND') {
      title = 'Bezirksverband';
      label = 'BeV';
    } else if (this.props.level === 'DE:KREISVERBAND') {
      if (this.props.type === 'YOUTH_ORGANIZATION') {
        title = 'Grüne Jugend Kreisverband';
        label = 'GJ KV';
      } else {
        title = 'Kreisverband';
        label = 'KV';
      }
    } else if (this.props.level === 'DE:ORTSVERBAND') {
      title = 'Ortsverband';
      label = 'OV';
    }

    return <abbr className='TypeField' title={title}>{label}</abbr>;
  }
}

class StateField extends Component {
  render() {
    var label = this.props.state;

    switch (this.props.state) {
      case 'Nordrhein-Westfalen':
        label = 'NW';
        break;
      case 'Rheinland-Pfalz':
        label = 'RP';
        break;
      case 'Niedersachsen':
        label = 'NS';
        break;
      case 'Baden-Württemberg':
        label = 'BW';
        break;
      case 'Bayern':
        label = 'BY';
        break;
      case 'Berlin':
        label = 'BE';
        break;
      case 'Brandenburg':
        label = 'BB';
        break;
      case 'Bremen':
        label = 'HB';
        break;
      case 'Hamburg':
        label = 'HB';
        break;
      case 'Hessen':
        label = 'HE';
        break;
      case 'Mecklenburg-Vorpommern':
        label = 'MV';
        break;
      case 'Saarland':
        label = 'SL';
        break;
      case 'Sachsen':
        label = 'SN';
        break;
      case 'Sachsen-Anhalt':
        label = 'SA';
        break;
      case 'Schleswig-Holstein':
        label = 'SH';
        break;
      case 'Thüringen':
        label = 'SN';
        break;
      default:
        label = this.props.state;
    }
    
    return <abbr title={this.props.state}>{label}</abbr>;
  }
}

class LocationLabel extends Component {
  render() {
    var brief = true;
    if (typeof this.props.brief !== 'undefined') {
      brief = this.props.brief;
    }

    var label = '';
    var type = <TypeField level={this.props.level} type={this.props.type} />;

    var stateField = brief ? <StateField state={this.props.state} /> : <span>{this.props.state}</span>;

    var className = 'LocationLabel';
    if (this.props.truncate) {
      className += ' text-truncate';
    }
    
    if (this.props.city === null && this.props.district !== null) {
      label = this.props.district;
      return <span className={className}>{type} {label}, {stateField}</span>;
    } else if (this.props.city !== null && this.props.district === null) {
      label = this.props.city;
      return <span className={className}>{type} {label}, {stateField}</span>;
    } else if (this.props.city !== null && this.props.district !== null) {
      label = `${this.props.city}, ${this.props.district}`;
      return <span className={className}>{type} {label}, {stateField}</span>;
    }
    
    label = this.props.state;
    return <span className={className}>{type} {label}</span>;
  }
}

export default LocationLabel;
