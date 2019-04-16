import React, { Component } from 'react';

class SearchForm extends Component {
  handleChange = (event) => {
    this.props.callback(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    var hitsInfo = <span>&nbsp;</span>;
    if (this.props.hits !== null) {
      hitsInfo = <span>{this.props.hits} Treffer</span>;
    }

    return (
      <div className='col-12'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='queryInput'>Finde Deine Site</label>
            <input className='form-control' type='search' name='query' placeholder="z. B. kleinostheim" value={this.props.value} onChange={this.handleChange} id='queryInput' />
            <small className='form-text'>{hitsInfo}</small>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
