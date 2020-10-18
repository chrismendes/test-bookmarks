import BookmarkList from '../components/BookmarkList';
import Pagination from '../components/Pagination';

export default class IndexPage {
  
  constructor() {
    const $containers = {
      bookmarkList: document.querySelector('.js-bookmarks'),
      pagination:   document.querySelector('.js-pagination'),
    };

    this.bookmarkList = new BookmarkList($containers.bookmarkList);
    this.pagination = new Pagination($containers.pagination);
  }

  render(data) {
    if(data.bookmarks) {
      this.bookmarkList.render(data.bookmarks);
      this.pagination.render(data.bookmarks.length);
    }
  }
  
}