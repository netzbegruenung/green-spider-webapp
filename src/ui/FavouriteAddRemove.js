import React, { Component } from 'react';
import { Favorites } from '../lib/Favorites';

class FavouriteAddRemove extends Component {
  state = {
    isFav: false,
  };

  favs = new Favorites();

  componentDidMount() {
    if (this.favs.include(this.props.site.url)) {
      this.setState({isFav: true});
    }
  }

  onClickAdd = () => {
    console.debug('onClickAdd');
    this.favs.add(this.props.site.url);
    this.setState({isFav: true});
  };

  onClickRemove = () => {
    console.debug('onClickRemove');
    this.favs.remove(this.props.site.url);
    this.setState({isFav: false});
  };

  render() {
    var fav = null;
    if (this.state.isFav) {
      fav = (
        <div className='row'>
          <div className='col-md-4' style={{marginBottom: 10}}>
            <button type='button' className='btn btn-secondary' onClick={this.onClickRemove} style={{width: '100%'}}>Favorit entfernen</button>
          </div>
          <div className='col-md-8'>
            <p>Die Seite ist als Favorit gespeichert und so immer über die Startseite verfügbar.</p>
          </div>
        </div>
      );
    } else {
      fav = (
        <div className='row'>
          <div className='col-md-4' style={{marginBottom: 10}}>
            <button type='button' className='btn btn-primary' onClick={this.onClickAdd} style={{width: '100%'}}>Zu meinen Favoriten</button>
          </div>
          <div className='col-md-8'>
            <p>Speichere diese Seite als Favoriten, um sie direkt auf der Startseite angezeigt zu bekommen.</p>
          </div>
        </div>
      );
    }

    return (
      <div className='favourite-add-remove row'>
        <div className='col-12'>
          {fav}
        </div>
      </div>
    );
  }
}

export default FavouriteAddRemove;
