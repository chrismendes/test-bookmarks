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
    this.view.bindDeleteBookmark(this.deleteBookmark.bind(this));
  }

  /**
   * Add bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  addBookmark(url) {
    this.storage.insert(url);
    const state = {
      bookmarks: this.storage.fetch()
    };
    // this.view.render(state, null, true);
    this.view.addBookmarkToList(url);
  }

  /**
   * Delete bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  deleteBookmark(bookmarkID) {
    this.storage.delete(bookmarkID);
    const state = {
      bookmarks: this.storage.fetch()
    };
    this.view.render(state, this.bindUIEvents.bind(this), true);
  }
  
}