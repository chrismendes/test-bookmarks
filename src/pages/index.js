import AddBookmarkForm from '../components/AddBookmarkForm';
import BookmarkList from '../components/BookmarkList';
import Pagination from '../components/Pagination';

export default class IndexPage {

  constructor() {
    const $containers = {
      addBookmarkForm: document.querySelector('.js-addbookmarkform'),
      bookmarkList:    document.querySelector('.js-bookmarks'),
      pagination:      document.querySelector('.js-pagination')
    };

    this.addBookmarkForm = new AddBookmarkForm($containers.addBookmarkForm);
    this.bookmarkList = new BookmarkList($containers.bookmarkList);
    this.pagination = new Pagination($containers.pagination);
    this.parentHandlers = {};
  }

  /**
   * Bind function to form submit event
   * 
   * @param {function} handler Handler function provided by controller
   */
  bindAddBookmark(handler) {
    this.addBookmarkForm.bindFormSubmit(handler);
  }

  /**
   * Bind function to bookmark delete event
   * 
   * @param {function} handler Handler function provided by controller
   */
  bindDeleteBookmark(handler) {
    this.bookmarkList.registerEventHandler('delete', handler);
  }

  /**
   * Bind function to bookmark update event
   * 
   * @param {function} handler Handler function provided by controller
   */
  bindUpdateBookmark(handler) {
    this.parentHandlers['save'] = handler;
    this.bookmarkList.registerEventHandler('save', handler);
  }

  /**
   * Render the page
   * 
   * @param {object} data Data to pass to template HTML and render
   * @param {function} bindEvents Event binding function to call when elements rendered
   */
  render(data) {
    if(data.bookmarks) {
      this.bookmarkList.render(data.bookmarks);
      this.pagination.render(data.bookmarks.length);
      this.addBookmarkForm.render();
    }
  }

  /**
   * Re-render bookmarks with provided data
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  updateBookmarks(bookmarks) {
    this.bookmarkList.render(bookmarks);
  }
  
}