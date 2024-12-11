import StorageManager from "./StorageManager.js";

export default class SessionStorageManager extends StorageManager {
  constructor() {
    super();

    this.type = 'session';
  }
}