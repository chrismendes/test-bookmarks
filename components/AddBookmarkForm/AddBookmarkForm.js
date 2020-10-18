import './AddBookmarkForm.scss';

export default class AddBookmarkForm {

  constructor($container) {
    this.$container = $container;
  }
  
  /**
   * Generate HTML for bookmark list
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render() {
    if(this.$container) {
      const result = `
        <form class="addbookmarkform">
          <input type="text" placeholder="Enter URL" size="40" />
          <button class="button">Add Bookmark</button>
          <span class="addbookmarkform_error">Error message here</span>
        </form>
      `;
      this.$container.innerHTML = result;
    }
  }

}