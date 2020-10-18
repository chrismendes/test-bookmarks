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
    const state = {
      bookmarks: bookmarks
    };
    this.view.render(state, this.bindUIEvents.bind(this));
  }

  /**
   * Bind events in view to controller response functions
   */
  bindUIEvents() {
    this.view.bindAddBookmark(this.addBookmark.bind(this));
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

    this.view.render({ bookmarks: this.storage.fetch() }, null, true);
  }
  
}