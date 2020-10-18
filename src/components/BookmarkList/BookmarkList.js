import '../Bookmark';

export default class BookmarkList {

  constructor($container) {
    this.$container = $container;
  }

  /**
   * Bind handler function to edit button click
   */
  bindEditClick() {
    for(const $button of this.$editButtons) {
      // $button.removeEventListener('click');
      $button.addEventListener('click', () => {
        const bookmarkID = $button.getAttribute('data-bookmarkid');
        if(bookmarkID) {
          this.toggleEditMode(bookmarkID);
        }
      });
    }
  }

  /**
   * Bind handler function to cancel button click
   */
  bindCancelClick() {
    for(const $button of this.$cancelButtons) {
      // $button.removeEventListener('click');
      $button.addEventListener('click', () => {
        const bookmarkID = $button.getAttribute('data-bookmarkid');
        if(bookmarkID) {
          this.toggleEditMode(bookmarkID);
        }
      });
    }
  }

  /**
   * Bind handler function to cancel button click
   */
  bindDeleteClick(handler) {
    for(const $button of this.$deleteButtons) {
      // $button.removeEventListener('click');
      $button.addEventListener('click', () => {
        const bookmarkID = $button.getAttribute('data-bookmarkid');
        if(bookmarkID) {
          handler(bookmarkID);
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
   * Return HTML markup for a bookmark
   * 
   * @param {number} id Unique bookmark ID
   * @param {string} url Bookmark URL string
   * @returns {string} HTML string ready to inject into DOM
   */
  getBookmarkHTML(id, url) {
    return `
      <div class="bookmark" data-bookmarkid="${id}">
        <a class="bookmark_url" href="${url}" target="_blank">${url}</a>
        <input class="bookmark_editurl" type="text" value="${url}" />
        <div class="bookmark_buttons">
          <button class="button button-secondary" data-action="edit" data-bookmarkid="${id}">Edit</button>
          <button class="button button-last" data-action="delete" data-bookmarkid="${id}">Delete</button>
          <button class="button button-last" data-action="cancel" data-bookmarkid="${id}">Cancel</button>
          <button class="button" data-action="save" data-bookmarkid="${id}">Save</button>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate HTML for bookmark list
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render(bookmarks) {
    if(!this.$container) return false;
    const result = bookmarks.reduce((list, url, index) => list + this.getBookmarkHTML(index, url), '');
    this.$container.innerHTML = result;
    this.postRender();
  }

  /**
   * Inject new bookmark at top of list
   * 
   * @param {string} url Bookmark URL string
   */
  addBookmark(url) {
    const bookmarkID = 0;
    const html = this.getBookmarkHTML(bookmarkID, url);
    const nodes = document.createRange().createContextualFragment(html);
    this.$container.prepend(nodes);
  }

  /**
   * Post-render duties (e.g. cache DOM elements)
   */
  postRender() {
    this.$editButtons = this.$container.querySelectorAll('button[data-action=edit]');
    this.$cancelButtons = this.$container.querySelectorAll('button[data-action=cancel]');
    this.$deleteButtons = this.$container.querySelectorAll('button[data-action=delete]');
    this.$saveButtons = this.$container.querySelectorAll('button[data-action=save]');

    this.bindEditClick();
    this.bindCancelClick();
    // this.bindSaveClick();
    // this.bindDeleteClick();
  }

}