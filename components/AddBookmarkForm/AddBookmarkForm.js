import './AddBookmarkForm.scss';

export default class AddBookmarkForm {

  constructor($container) {
    this.$container = $container;
  }

  /**
   * Bind given function to form submit event and prevent default browser behaviour
   * 
   * @param {function} handler Function to bind to event
   */
  bindFormSubmit(handler) {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(handler);
      return false;
    });
  }

  /**
   * Respond to form submit event
   * 
   * @param {function} parentHandler Function to pass user input to for parent-level processing
   */
  handleFormSubmit(parentHandler) {
    const formInput = this.$input.value;
    if(formInput.length > 0) {
      parentHandler(formInput);
    }
  }

  /**
   * Inject HTML for bookmark list into DOM
   * 
   * @param {array} bookmarks Array of bookmark URL strings
   */
  render() {
    if(this.$container) {
      const result = `
        <form class="addbookmarkform">
          <input type="text" placeholder="Enter URL" size="40" />
          <button type="submit" class="button">Add Bookmark</button>
          <span class="addbookmarkform_error">Error message here</span>
        </form>
      `;
      this.$container.innerHTML = result;
      this.postRender();
    }
  }

  /**
   * Post-render duties (e.g. reacquire DOM elements)
   */
  postRender() {
    this.$form = this.$container.querySelector('form');
    this.$input = this.$container.querySelector('input[type=text]');
  }

}