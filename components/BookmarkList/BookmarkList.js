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
      <div class="bookmark">
        <a class="bookmark_url" href="${bookmark}" target="_blank">${bookmark}</a>
        <input class="bookmark_editurl" type="text" value="${bookmark}" />
        <div class="bookmark_buttons">
          <button class="button button-secondary" data-action="edit">Edit</button>
          <button class="button button-last" data-action="delete">Delete</button>
          <button class="button" data-action="save">Save</button>
        </div>
      </div>
    `, '');
    this.$container.innerHTML = result;
  }

}