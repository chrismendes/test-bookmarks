import '../Bookmark';
import '../Memo/Memo.scss';

export default class BookmarkList {

  constructor() {
    this.parentHandlers = {};
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
   * Update bookmark element in list
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   */
  updateBookmark(bookmarkID) {
    const $bookmark = document.querySelector(`.bookmark[data-bookmarkid="${bookmarkID}"`);
    const newURL = $bookmark.querySelector('.bookmark_editurl').value;

    if($bookmark && newURL) {
      const $url = $bookmark.querySelector('.bookmark_url');
      if($url) {
        $url.textContent = newURL;
        $url.setAttribute('href', newURL);
        this.toggleEditMode(bookmarkID);
        this.parentHandlers['save'](bookmarkID, newURL);
      }
    }
  }

  /**
   * Dispatch bookmark to parent for deletion
   * 
   * @param {number} bookmarkID Bookmark ID used to identify bookmark to delete
   */
  deleteBookmark(bookmarkID) {
    this.parentHandlers['delete'](bookmarkID);
  }

  /**
   * Update bookmark IDs kept in data-bookmarkid to reflect sequential order (0, 1, 2, etc)
   */
  reassignBookmarkIDs() {
    this.$bookmarks = this.$container.querySelectorAll('.bookmark');
    for(let i = 0; i < this.$bookmarks.length; i++) {
      this.$bookmarks[i].setAttribute('data-bookmarkid', i);
    }
  }

  /**
   * Bind action buttons across all bookmarks with event handlers
   * 
   * @param {element} $bookmark Owner bookmark of edit button, otherwise bind all edit buttons
   */
  bindActionButtons() {
    const buttons = ['edit', 'cancel', 'delete', 'save'];

    for(const $bookmark of this.$bookmarks) {
      for(const button of buttons) {

        const $button = $bookmark.querySelector(`button[data-action=${button}]`);
        const bookmarkID = $bookmark.getAttribute('data-bookmarkid');
        let action = null;

        if(button === 'edit' || button === 'cancel') {
          action = () => this.toggleEditMode(bookmarkID);
        }
        if(button === 'delete') {
          action = () => this.deleteBookmark(bookmarkID);
        }
        if(button === 'save') {
          action = () => this.updateBookmark(bookmarkID);
        }
        $button.addEventListener('click', action);

      }
    }
  }

  /**
   * Cache parent-provided functions for handling events
   * 
   * @param {string} event String donating user action (e.g. 'save')
   * @param {function} handler Parent function to call upon event
   */
  registerEventHandler(event, handler) {
    this.parentHandlers[event] = handler;
  }

  /**
   * Create DOM element for a bookmark
   * 
   * @param {number} id Unique bookmark ID
   * @param {string} url Bookmark URL string
   * @returns {element} Bookmark element ready to be injected into DOM
   */
  createBookmarkElement(id, url) {
    const div = document.createElement('div');
    const html = `
      <div class="bookmark" data-bookmarkid="${id}">
        <a class="bookmark_url" href="${url}" target="_blank">${url}</a>
        <input class="bookmark_editurl" type="text" value="${url}" />
        <div class="bookmark_buttons">
          <button class="button button-secondary" data-action="edit">Edit</button>
          <button class="button button-last" data-action="delete">Delete</button>
          <button class="button button-last" data-action="cancel">Cancel</button>
          <button class="button" data-action="save">Save</button>
        </div>
      </div>
    `;
    div.innerHTML = html;
    return div.firstElementChild;
  }

  /**
   * Create DOM element for displaying "No bookmarks" message
   */
  createEmptyListMessage() {
    const div = document.createElement('div');
    const html = `
      <div class="memo">
        <h2 class="memo_title">Bookmark List Empty</h2>
        <span class="memo_msg">Add a new bookmark above.</span>
      </div>
    `;
    div.innerHTML = html;
    return div.firstElementChild;
  }

  /**
   * Generate HTML for bookmark list
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render($container, bookmarks, indexStart = 0, limit = 10) {
    this.$container = $container;
    if(!this.$container) return false;
    this.$container.innerHTML = '';

    if(bookmarks.length > 0) {

      const listSize = (bookmarks.length > limit) ? limit : bookmarks.length;
      const indexEnd = ((indexStart+listSize) > bookmarks.length) ? bookmarks.length : (indexStart+listSize);

      for(let i = indexStart; i < indexEnd; i++) {
        const $bookmark = this.createBookmarkElement(i, bookmarks[i]);
        this.$container.appendChild($bookmark);
      }
      this.cacheElements();
      this.bindActionButtons();

    } else {
      const $emptyMessage = this.createEmptyListMessage();
      this.$container.appendChild($emptyMessage);
    }
  }

  /**
   * Cache DOM elements for future use
   */
  cacheElements() {
    this.$bookmarks = this.$container.querySelectorAll('.bookmark');
    this.$editButtons = this.$container.querySelectorAll('button[data-action=edit]');
    this.$cancelButtons = this.$container.querySelectorAll('button[data-action=cancel]');
    this.$deleteButtons = this.$container.querySelectorAll('button[data-action=delete]');
    this.$saveButtons = this.$container.querySelectorAll('button[data-action=save]');
  }

}