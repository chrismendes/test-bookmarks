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
    this.parentHandlers['add'] = handler;
    this.addBookmarkForm.bindFormSubmit(handler);
  }

  /**
   * Bind function to bookmark delete event
   * 
   * @param {function} handler Handler function provided by controller
   */
  bindDeleteBookmark(handler) {
    this.parentHandlers['delete'] = handler;
    this.bookmarkList.bindDeleteClick(null, handler);
  }

  /**
   * Bind function to bookmark update event
   * 
   * @param {function} handler Handler function provided by controller
   */
  bindUpdateBookmark(handler) {
    this.parentHandlers['save'] = handler;
    this.bookmarkList.bindSaveClick(null, handler);
  }

  /**
   * Render the page
   * 
   * @param {object} data Data to pass to template HTML and render
   * @param {function} bindEvents Event binding function to call when elements rendered
   */
  render(data, bindEvents) {
    if(data.bookmarks) {
      this.bookmarkList.render(data.bookmarks);
      this.pagination.render(data.bookmarks.length);
      this.addBookmarkForm.render();

      if(bindEvents) {
        bindEvents();
      }
    }
  }

  /**
   * Trigger new bookmark display by dispatching to BookmarkList component
   * 
   * @param {string} bookmarkURL Bookmark URL string
   */
  addBookmarkToDOM(bookmarkURL) {
    this.bookmarkList.addBookmark(bookmarkURL, this.parentHandlers['save'], this.parentHandlers['delete']);
  }

  /**
   * Trigger bookmark removal by dispatching to BookmarkList component
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   */
  removeBookmarkFromDOM(bookmarkID) {
    this.bookmarkList.deleteBookmark(bookmarkID);
  }

  /**
   * Trigger bookmark update by dispatching to BookmarkList component
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   * @param {string} url Bookmark URL
   */
  updateBookmarkInDOM(bookmarkID, url) {
    this.bookmarkList.updateBookmark(bookmarkID, url);
  }

}