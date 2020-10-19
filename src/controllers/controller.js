export default class Controller {

  /**
   * @param {IndexPage|SubmittedPage} view View/Page instance
   * @param {Storage} storage Storage instance
   */
  constructor(routes, storage) {
    this.routes = routes;
    this.storage = storage;

    this.currentBookmarkPage = 1;
    this.bookmarksPerPage = 2;
  }

  /**
   * Initialise view depending on requested route
   * 
   * @param {string} appUrl Document location hash (e.g. #/, #/submitted)
   */
  setView(appUrl) {
    let route = appUrl.replace(/^#\//, '');

    const pageNumber = parseInt(route);
    const isPageNumber = (!isNaN(pageNumber));
    if(isPageNumber) {
      this.currentBookmarkPage = pageNumber;
      route = '';
    }

    this.view = this.routes[route];

    if(route === '') {
      this.loadIndexView();
    }
    if(route === 'submitted') {
      this.loadBookmarkSubmittedView();
    }
  }

  /**
   * Bind events in view to controller response functions
   */
  loadIndexView() {
    const bookmarks = this.storage.fetch();
    const state = { bookmarks: bookmarks };
    this.view.render(state, this.bookmarksPerPage, this.currentBookmarkPage);

    this.view.bindDeleteBookmark(this.deleteBookmark.bind(this));
    this.view.bindUpdateBookmark(this.updateBookmark.bind(this));
    this.view.bindAddBookmark(this.addBookmark.bind(this));
  }

  /**
   * Bind events in view to controller response functions
   */
  loadBookmarkSubmittedView() {
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
    window.location.href = '#/submitted';
  }

  /**
   * Delete bookmark to storage and render
   * 
   * @param {string} url Web page URL
   */
  deleteBookmark(bookmarkID) {
    this.storage.delete(bookmarkID);
    const bookmarks = this.storage.fetch();
    this.view.updateBookmarks(bookmarks, this.bookmarksPerPage, this.currentBookmarkPage);
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