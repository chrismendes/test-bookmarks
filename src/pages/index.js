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
    this.bookmarkList.bindDeleteClick(handler);
  }

  /**
   * Render the page
   * 
   * @param {object} data Data to pass to template HTML and render
   * @param {function} bindEvents Event binding function to call when elements rendered
   * @param {boolean} dataDisplayOnly Render/re-render data display components only
   */
  render(data, bindEvents, dataDisplayOnly = false) {
    if(data.bookmarks) {
      this.bookmarkList.render(data.bookmarks);
      this.pagination.render(data.bookmarks.length);

      if(!dataDisplayOnly) {
        this.addBookmarkForm.render();
      }

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
    this.bookmarkList.addBookmark(bookmarkURL);
  }

  /**
   * Trigger bookmark removal by dispatching to BookmarkList component
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   */
  removeBookmarkFromDOM(bookmarkID) {
    this.bookmarkList.deleteBookmark(bookmarkID);
  }

}