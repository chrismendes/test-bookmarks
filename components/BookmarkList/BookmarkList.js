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

    const result = bookmarks.reduce((list, bookmark, index) => list + `
      <div class="bookmark" data-bookmarkid="${index}">
        <a class="bookmark_url" href="${bookmark}" target="_blank">${bookmark}</a>
        <input class="bookmark_editurl" type="text" value="${bookmark}" />
        <div class="bookmark_buttons">
          <button class="button button-secondary" data-action="edit" data-bookmarkid="${index}">Edit</button>
          <button class="button button-last" data-action="delete" data-bookmarkid="${index}">Delete</button>
          <button class="button" data-action="save" data-bookmarkid="${index}">Save</button>
        </div>
      </div>
    `, '');
    this.$container.innerHTML = result;

    this.postRender();
  }

  /**
   * Bind handler function to edit button click
   */
  bindEditModeClick() {
    for(const $button of this.$editButtons) {
      $button.addEventListener('click', () => {
        const bookmarkID = $button.getAttribute('data-bookmarkid');
        if(bookmarkID) {
          this.toggleEditMode(bookmarkID);
        }
      });
    }
  }

  /**
   * Show/hide edit controls when toggle edit mode for bookmark
   * 
   * @param {number} bookmarkID Bookmark ID used to pick elements from DOM
   */
  toggleEditMode(bookmarkID) {
    const $bookmark = document.querySelector(`.bookmark[data-bookmarkid="${bookmarkID}"`);
    const className = 'is-editing';
    const $input = $bookmark.querySelector('.bookmark_editurl');

    if($bookmark) {
      $bookmark.classList.toggle(className);
      if($input) {
        $input.select();
      }
    }
  }

  /**
   * Post-render duties (e.g. cache DOM elements)
   */
  postRender() {
    this.$editButtons = this.$container.querySelectorAll('button[data-action=edit]');
    this.bindEditModeClick();
  }

}