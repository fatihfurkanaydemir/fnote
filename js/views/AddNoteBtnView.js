import { View } from './View';

class AddNoteBtnView extends View {
  _parentEl = document.querySelector('.addnotebtn-container');

  addClickHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.addnote-btn');

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `<button class="addnote-btn" type="button">Add a note</button>`;
  }
}

export default new AddNoteBtnView();
