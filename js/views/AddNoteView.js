import { View } from './View';

class AddNoteView extends View {
  _parentEl = document.querySelector('.notes-container');

  addCloseHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const closeBtn = e.target.closest('.note-close-btn');

      if (!closeBtn) return;

      handler();
    });
  }

  addSaveHandler(handler) {
    this._parentEl.addEventListener(
      'click',
      this._saveListener.bind(this, handler)
    );
  }

  _saveListener(handler, e) {
    const saveBtn = e.target.closest('.btn-save');

    if (!saveBtn) return;

    handler(this._parentEl.querySelector('.note-form'), e);
  }

  remove() {
    this._parentEl.querySelector('.add-note').remove();
  }

  _generateMarkup() {
    return `<figure class="note add-note add-note-active">
    <form class="note-form">
      <div class="note-form-head">
        <input
          class="note-title-input"
          id="title"
          name="title"
          type="text"
          placeholder="Note title"
          required
        />

        <button class="note-close-btn" type="button">
          <ion-icon
            class="note-expand-icon"
            name="close-outline"
          ></ion-icon>
        </button>

        <input
          class="note-title-input"
          id="tags"
          name="tags"
          type="text"
          placeholder="Tags seperated with space"
          required
        />
      </div>
      <div class="note-form-body">
        <textarea
          class="note-body-text"
          name="notebody"
          id="notebody"
          rows="10"
          placeholder="Note body"
          required
        ></textarea>

        <div class="note-form-btns">
          <button class="note-form-btn btn-save" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  </figure>`;
  }
}

export default new AddNoteView();
