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
   * Fetch all bookmarks from storage
   * 
   * @returns {array} Array of URL strings, or empty array
   */
  fetch() {
    return this.getBookmarks();
  }
  
  /**
   * Insert bookmark into storage
   * 
   * @param {string} bookmarkIn URL string
   */
  insert(bookmarkIn) {
    const bookmarks = this.getBookmarks();
    bookmarks.unshift(bookmarkIn);
    this.setBookmarks(bookmarks);
  }

  /**
   * Update bookmark at given index with given value
   * 
   * @param {number} index Position of bookmark to edit
   * @param {string} bookmarkURL New bookmark URL
   */
  update(index, bookmarkURL) {
    const bookmarks = this.getBookmarks();
    bookmarks[index] = bookmarkURL;
    this.setBookmarks(bookmarks);
  }

  /**
   * Delete bookmark at given index
   * 
   * @param {number} index Position of bookmark to delete
   */
  delete(index) {
    const bookmarks = this.getBookmarks();
    bookmarks.splice(index, 1);
    this.setBookmarks(bookmarks);
  }

}