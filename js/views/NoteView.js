import { View } from './View';

class NoteView extends View {
  _parentEl = document.querySelector('.notes-container');

  addExpandHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.note-expand-btn');

      if (!btn) return;

      const note = e.target.closest('.note');
      handler(note);
    });
  }

  _generateMarkup() {
    return `
        <figure class="note" data-id="${this._data.id}">
          <div class="note-content">
            <div class="note-head">
              <p class="note-title">${this._data.title}</p>

              <button class="note-expand-btn" id="btn" type="button">
                <ion-icon
                  class="note-expand-icon"
                  name="chevron-down-outline"
                ></ion-icon>
              </button>

              <div class="note-tags">
                ${this._data.tags.reduce(
                  (acc, tag) => acc + `<span class="note-tag">${tag}</span>`,
                  ''
                )}
              </div>
            </div>

            <div class="note-body">
              <textarea
                class="note-body-text"
                name="notebody"
                id="notebody"
                rows="10"
                placeholder="Note body"
                disabled
              >
${this._data.body}
            </textarea
              >
              <div class="note-form-btns">
                <button class="note-form-btn btn-remove" type="button">
                  Remove
                </button>
                <button class="note-form-btn btn-edit" type="button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </figure>
    `;
  }
}

export default new NoteView();
