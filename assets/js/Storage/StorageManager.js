export default class StorageManager {
  constructor() {
    this.type = null;
  }

  has(key) {
    if (this.type === 'local') {
      return localStorage.getItem(key) !== null;
    }

    return sessionStorage.getItem(key) !== null;
  }

  get(key) {
    let value = this.type === 'local' ? localStorage.getItem(key) : sessionStorage.getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {
    }

    return value;
  }

  set(key, value) {
    return this.type === 'local' ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  }

  addValue(key, value) {
    let storageValue = this.get(key);

    if (!storageValue) {
      storageValue = [];
    }

    storageValue.push(value);

    this.set(key, JSON.stringify(storageValue));
  }

  removeValue(key, index) {
    let storageValue = this.get(key);

    if (!storageValue || storageValue.length === 0) {
      return;
    }

    storageValue.splice(index, 1);
    this.set(key, JSON.stringify(storageValue));
  }
}