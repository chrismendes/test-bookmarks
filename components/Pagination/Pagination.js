import './Pagination.scss';

export default class Pagination {

  constructor($container) {
    this.$container = $container;
  }

  /**
   * Calculate number of pages based on given requirements
   * 
   * @param {number} itemsTotal Total number of items to paginate
   * @param {number} perPage Number of items per page
   */
  calculatePagesTotal(itemsTotal, perPage) {
    return Math.ceil(itemsTotal/perPage);
  }
  
  /**
   * Generate HTML for pagination
   * 
   * @param {number} itemsTotal Total number of items to paginate
   * @param {number} currentPage Current active page
   * @param {number} perPage Number of items per page
   */
  render(itemsTotal, currentPage = 1, perPage = 20) {
    if(this.$container) {
      const pages = this.calculatePagesTotal(itemsTotal, perPage);

      let html = `
        <ul class="pagination">
          <li><a href="#">Prev</a></li>
      `;
      for(let i = 0; i < pages; i++) {
        html += (currentPage === i+1) ? `<li class="is-active">` : `<li>`;
        html += `<a href="#">${i+1}</a>`;
        html += `</li>`;
      }
      html += `
          <li><a href="#">Next</a></li>
        </ul>
      `;
      this.$container.innerHTML = html;
    }
  }

}