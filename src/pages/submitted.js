import '../components/Memo/Memo.scss';

export default class SubmittedPage {

  render(data) {
    const lastBookmark = data.lastBookmark;
    const $container = document.querySelector('.js-appview');

    if(!lastBookmark || !$container) {
      return false;
    }

    const html = `
      <div class="l-section-highlighted">
        <div class="l-container">
          <div class="memo">
            <h2 class="memo_title">Bookmark Submitted</h2>
            <span class="memo_msg">Your bookmark <a href="${lastBookmark}" target="_blank">${lastBookmark}</a> has been added.</span>
            <span class="memo_button">
              <a href="/#/" class="button">Back to bookmark list</a>
            </span>
          </div>
        </div>
      </div>
    `;
    $container.innerHTML = html;
  }

}