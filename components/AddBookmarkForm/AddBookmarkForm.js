import './AddBookmarkForm.scss';
import { validateURL } from '../../helpers/validate';

export default class AddBookmarkForm {

  constructor($container) {
    this.$container = $container;
    this.errors = {
      invalid: 'Please specify a valid URL'
    }
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
   * Respond to form submit event by validating user input and triggering next step
   * 
   * @param {function} parentHandler Function to pass user input to for parent-level processing
   */
  handleFormSubmit(parentHandler) {
    const formInput = this.$input.value;
    if(formInput.length > 0) {
      const validURL = validateURL(formInput);
      if(validURL === true) {
        parentHandler(formInput);
      } else {
        this.showError(this.errors.invalid);
      }
    }
  }

  showError(errorMsg) {
    this.$error.innerHTML = errorMsg;
    this.$form.classList.add('is-error');
  }

  /**
   * Inject HTML for bookmark list into DOM
   */
  render() {
    if(this.$container) {
      const result = `
        <form class="addbookmarkform">
          <input type="text" placeholder="Enter URL" size="40" />
          <button type="submit" class="button">Add Bookmark</button>
          <span class="addbookmarkform_error js-error"></span>
        </form>
      `;
      this.$container.innerHTML = result;
      this.postRender();
    }
  }

  /**
   * Post-render duties (e.g. cache DOM elements)
   */
  postRender() {
    this.$form = this.$container.querySelector('form');
    this.$input = this.$container.querySelector('input[type=text]');
    this.$error = this.$container.querySelector('.js-error');
  }

}