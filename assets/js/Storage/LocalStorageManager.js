import StorageManager from "./StorageManager.js";

export default class LocalStorageManager extends StorageManager {
  constructor() {
    super();

    this.type = 'local';
  }
}