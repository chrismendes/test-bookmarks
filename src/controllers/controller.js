export default class Controller {

  /**
   * @param {IndexPage|SubmittedPage} view View/Page instance
   * @param {Storage} storage Storage instance
   */
  constructor(view, storage) {
    this.view = view;
    this.storage = storage;

    this.initView();
  }

  /**
   * Bind events in view to controller response functions
   */
  initView() {
    this.view.bindDeleteBookmark(this.deleteBookmark.bind(this));
    this.view.bindUpdateBookmark(this.updateBookmark.bind(this));

    const bookmarks = this.storage.fetch();
    const state = { bookmarks: bookmarks };
    this.view.render(state);

    this.view.bindAddBookmark(this.addBookmark.bind(this));
  }

  /**
   * Add bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  addBookmark(url) {
    this.storage.insert(url);
    const bookmarks = this.storage.fetch();
    this.view.updateBookmarks(bookmarks);
  }

  /**
   * Delete bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  deleteBookmark(bookmarkID) {
    this.storage.delete(bookmarkID);
    const bookmarks = this.storage.fetch();
    this.view.updateBookmarks(bookmarks);
  }

  /**
   * Update bookmark in storage and render
   * 
   * @param {number} bookmarkID Bookmark ID
   * @param {string} url Web page URL
   */
  updateBookmark(bookmarkID, url) {
    this.storage.update(bookmarkID, url);
    const bookmarks = this.storage.fetch();
    this.view.updateBookmarks(bookmarks);
  }
  
}