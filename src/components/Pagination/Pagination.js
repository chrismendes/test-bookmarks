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
  render($container, itemsTotal, currentPage = 1, perPage = 20) {
    this.$container = $container;

    if(this.$container) {
      const totalPages = this.calculatePagesTotal(itemsTotal, perPage);
      const prevClass = (currentPage > totalPages && itemsTotal > 0) ? '' : 'is-disabled';
      const nextClass = (currentPage < totalPages && itemsTotal > 0) ? '' : 'is-disabled';

      let html = `
        <ul class="pagination">
          <li class="${prevClass}"><a href="#">Prev</a></li>
      `;
      for(let i = 0; i < totalPages; i++) {
        html += (currentPage === i+1) ? `<li class="is-active">` : `<li>`;
        html += `<a href="#">${i+1}</a>`;
        html += `</li>`;
      }
      html += `
      <li class="${nextClass}"><a href="#">Next</a></li>
        </ul>
      `;
      this.$container.innerHTML = html;
    }
  }

}