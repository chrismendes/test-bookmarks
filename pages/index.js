import BookmarkList from '../components/BookmarkList';

export default class IndexPage {
  
  constructor() {
    const $bookmarkListContainer = document.querySelector('.js-bookmarks');
    this.bookmarkList = new BookmarkList($bookmarkListContainer);
  }

  render(data) {
    if(data.bookmarks) {
      this.bookmarkList.render(data.bookmarks);
    }
  }
  
}