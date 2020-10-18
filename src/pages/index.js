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
  
}