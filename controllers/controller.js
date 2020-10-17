import { validateURL } from '../helpers/validate';

export default class Controller {

  /**
   * @param {!View} view View instance
   * @param {!Storage*} storage Storage instance
   */
  constructor(view, storage) {
    this.view = view;
    this.storage = storage;
  }

  /**
   * Add bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  addBookmark(url) {
    
    const validURL = validateURL(url);
    
    this.storage.insert(url);

  }
  
}