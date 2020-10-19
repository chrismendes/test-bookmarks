export default class Controller {

  /**
   * @param {IndexPage|SubmittedPage} view View/Page instance
   * @param {Storage} storage Storage instance
   */
  constructor(routes, storage) {
    this.routes = routes;
    this.storage = storage;
  }

  /**
   * Initialise view depending on requested route
   * 
   * @param {string} appUrl Document location hash (e.g. #/, #/submitted)
   */
  setView(appUrl) {
    const route = appUrl.replace(/^#\//, '');
    this.view = this.routes[route];

    if(route === '') {
      this.initIndexPageView();
    }
    if(route === 'submitted') {
      this.initSubittedPageView();
    }
  }

  /**
   * Bind events in view to controller response functions
   */
  initIndexPageView() {
    const bookmarks = this.storage.fetch();
    const state = { bookmarks: bookmarks };
    this.view.render(state);

    this.view.bindDeleteBookmark(this.deleteBookmark.bind(this));
    this.view.bindUpdateBookmark(this.updateBookmark.bind(this));
    this.view.bindAddBookmark(this.addBookmark.bind(this));
  }

  /**
   * Bind events in view to controller response functions
   */
  initSubittedPageView() {
    const lastBookmark = this.storage.fetchLast();
    const state = { lastBookmark: lastBookmark };
    this.view.render(state);
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