import AddBookmarkForm from '../components/AddBookmarkForm';
import BookmarkList from '../components/BookmarkList';
import Pagination from '../components/Pagination';

export default class IndexPage {

  constructor() {
    this.parentHandlers = {};
    this.$containers = {};
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
  render(data, bookmarksPerPage, currentPage = 1) {
    if(data.bookmarks && bookmarksPerPage) {
      this.renderComponentContainers();
      this.initComponents();

      const offset = ((currentPage-1) * bookmarksPerPage);

      this.bookmarkList.render(this.$containers.bookmarkList, data.bookmarks, offset, bookmarksPerPage);
      this.pagination.render(this.$containers.pagination, data.bookmarks.length, currentPage, bookmarksPerPage);
      this.addBookmarkForm.render(this.$containers.addBookmarkForm);
    }
  }

  /**
   * Inject component container markup into the DOM
   */
  renderComponentContainers() {
    const $container = document.querySelector('.js-appview');
    const html = `
      <div class="l-section-highlighted">
        <div class="l-container">
          <div class="js-addbookmarkform"></div>
        </div>
      </div>
      <div class="l-section">
        <div class="l-container">
          <div class="js-bookmarks"></div>
        </div>
      </div>
      <div class="l-section">
        <div class="l-container">
          <div class="js-pagination"></div>
        </div>
      </div>
    `;
    $container.innerHTML = html;
  }

  /**
   * Initialise components and provide container DOM elements
   */
  initComponents() {
    this.$containers = {
      addBookmarkForm: document.querySelector('.js-addbookmarkform'),
      bookmarkList:    document.querySelector('.js-bookmarks'),
      pagination:      document.querySelector('.js-pagination')
    };
    
    this.addBookmarkForm = new AddBookmarkForm();
    this.bookmarkList = new BookmarkList();
    this.pagination = new Pagination();
  }

  /**
   * Re-render bookmarks with provided data
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  updateBookmarks(bookmarks, bookmarksPerPage, currentPage = 1) {
    const offset = ((currentPage-1) * bookmarksPerPage);
    this.bookmarkList.render(this.$containers.bookmarkList, bookmarks, offset, bookmarksPerPage);
    this.pagination.render(this.$containers.pagination, bookmarks.length, currentPage, bookmarksPerPage);
  }
  
}