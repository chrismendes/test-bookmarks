export default class Storage {

  /**
   * @param {string} name App name used as Local Storage ref
   */
  constructor(name) {
 
    const localStorage = window.localStorage;
    let bookmarks = [];

    /**
     * Get bookmarks from local state or LocalStorage
     * 
     * @returns {array} Array of URL strings, or empty array
     */
    this.getBookmarks = () => {
      if(bookmarks.length > 0) return bookmarks;
      return JSON.parse(localStorage.getItem(name) || '[]');
    };

    /**
     * Set bookmarks to local state and LocalStorage
     * 
     * @param {array} bookmarksIn Array of URL strings
     */
    this.setBookmarks = (bookmarksIn) => {
      bookmarks = bookmarksIn;
      localStorage.setItem(name, JSON.stringify(bookmarksIn));
    };
    
  }

  /**
   * Insert bookmark into storage
   * 
   * @param {string} bookmarkIn URL string
   */
  insert(bookmarkIn) {
    const bookmarks = this.getBookmarks();
    bookmarks.push(bookmarkIn);
    this.setBookmarks(bookmarks);
  }

}