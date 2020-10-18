import { validateURL } from '../helpers/validate';

export default class Controller {

  /**
   * @param {IndexPage|SubmittedPage} view View/Page instance
   * @param {Storage} storage Storage instance
   */
  constructor(initView, storage) {
    this.view = initView;
    this.storage = storage;

    const bookmarks = this.storage.fetch();
    this.view.render({ bookmarks: bookmarks });
  }

  /**
   * Add bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  addBookmark(url) {
    const validURL = validateURL(url);
    if(validURL === true) {
      this.storage.insert(url);
    }

    this.view.render({ bookmarks: this.storage.fetch() });
  }
  
}