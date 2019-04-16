export class Favorites {
  store = window.localStorage;
  itemName = 'favourites_v1'

  /**
   * Reads all favourites
   */
  readAll() {
    var favsString = this.store.getItem(this.itemName);

    if (favsString === null || typeof(favsString) === 'undefined' || favsString === '') {
      return [];
    }

    return favsString.split(' ');
  }

  /**
   * Returns true if favorites include the given key
   * 
   * @param String key
   */
  include(key) {
    var favs = this.readAll();
    if (favs.includes(key)) {
      return true;
    }
    return false;
  }

  /**
   * Add an item to the favorites
   * @param String key 
   */
  add(key) {
    var favs = this.readAll();
    if (favs.includes(key)) {
      return;
    }

    favs.push(key);
    favs.sort();

    var favsString = favs.join(' ');
    this.store.setItem(this.itemName, favsString);
  }

  /**
   * Remove a key from the favorites
   * 
   * @param String key 
   */
  remove(key) {
    var favs = this.readAll();
    var filtered = favs.filter(function(value, index, arr){
      return value !== key;
    });
    var favsString = filtered.join(' ');
    this.store.setItem(this.itemName, favsString);
  }

}