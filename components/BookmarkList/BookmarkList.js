import '../Bookmark';

export default class BookmarkList {

  constructor($container) {
    this.$container = $container;
  }
  
  /**
   * Generate HTML for bookmark list
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render(bookmarks) {
    if(!this.$container) return false;

    bookmarks.reverse();
    const result = bookmarks.reduce((list, bookmark) => list + `
      <span class="bookmark"><a href="${bookmark}" target="_blank">${bookmark}</a></span>
    `, '');
    this.$container.innerHTML = result;
  }

}