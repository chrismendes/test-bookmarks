import '../Bookmark';

export default class BookmarkList {

  constructor($container) {
    this.$container = $container;
  }

  /**
   * Bind handler function to edit button click
   * 
   * @param {element} [$bookmark] Owner bookmark of edit button, otherwise bind all edit buttons
   */
  bindEditClick($bookmark) {
    const $editButtons = ($bookmark) ? $bookmark.querySelectorAll('button[data-action=edit]') : this.$editButtons;

    for(const $button of $editButtons) {
      $button.addEventListener('click', () => {
        const $bookmark = $button.parentNode.parentNode;
        if($bookmark) {
          const bookmarkID = $bookmark.getAttribute('data-bookmarkid');
          if(bookmarkID) {
            this.toggleEditMode(bookmarkID);
          }
        }
      });
    }
  }

  /**
   * Bind handler function to cancel button click
   * 
   * @param {element} [$bookmark] Owner bookmark of cancel button, otherwise bind all cancel buttons
   */
  bindCancelClick($bookmark) {
    const $cancelButtons = ($bookmark) ? $bookmark.querySelectorAll('button[data-action=cancel]') : this.$cancelButtons;

    for(const $button of $cancelButtons) {
      $button.addEventListener('click', () => {
        const $bookmark = $button.parentNode.parentNode;
        if($bookmark) {
          const bookmarkID = $bookmark.getAttribute('data-bookmarkid');
          if(bookmarkID) {
            this.toggleEditMode(bookmarkID);
          }
        }
      });
    }
  }

  /**
   * Bind handler function to cancel button click
   */
  bindDeleteClick($bookmark, handler) {
    const $targetButtons = ($bookmark) ? $bookmark.querySelectorAll('button[data-action=delete]') : this.$deleteButtons;

    if(!handler) {
      return false;
    }

    for(const $button of $targetButtons) {
      $button.addEventListener('click', () => {
        const $bookmark = $button.parentNode.parentNode;
        if($bookmark) {
          const bookmarkID = $bookmark.getAttribute('data-bookmarkid');
          if(bookmarkID) {
            handler(bookmarkID);
          }
        }
      });
    }
  }

  /**
   * Bind handler function to save button click
   */
  bindSaveClick($bookmark, handler) {
    const $targetButtons = ($bookmark) ? $bookmark.querySelectorAll('button[data-action=save]') : this.$saveButtons;

    if(!handler) {
      return false;
    }

    for(const $button of $targetButtons) {
      $button.addEventListener('click', () => {
        const $bookmark = $button.parentNode.parentNode;
        const $input = $bookmark.querySelector('.bookmark_editurl');
        if($bookmark && $input) {
          const bookmarkID = $bookmark.getAttribute('data-bookmarkid');
          const url = $input.value;
          if(bookmarkID && url) {
            handler(bookmarkID, url);
          }
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
   * Generate HTML for bookmark list
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render(bookmarks) {
    if(!this.$container) return false;
    for(let i = 0; i < bookmarks.length; i++) {
      const $bookmark = this.createBookmarkElement(i, bookmarks[i]);
      this.$container.appendChild($bookmark);
    }
    this.postRender();
  }

  /**
   * Inject new bookmark at top of list
   * 
   * @param {string} url Bookmark URL string
   */
  addBookmark(url, saveHandler, deleteHandler) {
    const bookmarkID = 0;
    const $bookmark = this.createBookmarkElement(bookmarkID, url);
    this.$container.prepend($bookmark);

    this.reassignBookmarkIDs();
    this.bindEditClick($bookmark);
    this.bindCancelClick($bookmark);
    this.bindDeleteClick($bookmark, deleteHandler);
    this.bindSaveClick($bookmark, saveHandler);
  }

  /**
   * Remove bookmark element from list
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   */
  deleteBookmark(bookmarkID) {
    const $bookmark = document.querySelector(`.bookmark[data-bookmarkid="${bookmarkID}"`);
    if($bookmark) {
      $bookmark.remove();
      this.reassignBookmarkIDs();
    }
  }

  /**
   * Update bookmark element in list
   * 
   * @param {number} bookmarkID Bookmark ID used to pick bookmark from DOM
   * @param {string} url New bookmark URL
   */
  updateBookmark(bookmarkID, url) {
    const $bookmark = document.querySelector(`.bookmark[data-bookmarkid="${bookmarkID}"`);
    if($bookmark) {
      const $url = $bookmark.querySelector('.bookmark_url');
      if($url) {
        $url.textContent = url;
        $url.setAttribute('href', url);
        this.toggleEditMode(bookmarkID);
      }
    }
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
   * Post-render duties (e.g. cache DOM elements)
   */
  postRender() {
    this.$bookmarks = this.$container.querySelectorAll('.bookmark');
    this.$editButtons = this.$container.querySelectorAll('button[data-action=edit]');
    this.$cancelButtons = this.$container.querySelectorAll('button[data-action=cancel]');
    this.$deleteButtons = this.$container.querySelectorAll('button[data-action=delete]');
    this.$saveButtons = this.$container.querySelectorAll('button[data-action=save]');

    this.bindEditClick();
    this.bindCancelClick();
  }

}