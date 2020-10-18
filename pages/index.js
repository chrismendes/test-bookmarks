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

  bindAddBookmark() {
    
  }
  
  /**
   * Render the page
   * 
   * @param {object} data Data to pass to template HTML and render
   */
  render(data) {
    if(data.bookmarks) {
      this.addBookmarkForm.render();
      this.bookmarkList.render(data.bookmarks);
      this.pagination.render(data.bookmarks.length);
    }
  }
  
}