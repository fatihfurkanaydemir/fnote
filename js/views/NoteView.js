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

  addEditHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-edit');

      if (!btn) return;

      const note = e.target.closest('.note');
      handler(note);
    });
  }

  addEditCloseHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const closeBtn = e.target.closest('.note-close-btn--edit');

      if (!closeBtn) return;

      handler(closeBtn.closest('.note'));
    });
  }

  addSaveHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const saveBtn = e.target.closest('.btn-save--edit');

      if (!saveBtn) return;

      handler(saveBtn.closest('.note-form'), e);
    });
  }

  edit(noteEl, note, update = false) {
    if (!update)
      noteEl.innerHTML = `
      <form class="note-form">
        <div class="note-form-head">
          <input
            class="note-title-input"
            id="title"
            name="title"
            type="text"
            placeholder="Note title"
            value="${note.title}"
            required
          />

          <button class="note-close-btn note-close-btn--edit" type="button">
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
            value="${note.tags.join(' ')}"
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
          >
${note.body}</textarea>

         <div class="note-form-btns">
           <button class="note-form-btn btn-save btn-save--edit" type="submit">
             Save
           </button>
         </div>
        </div>
      </form>
    `;
    else
      noteEl.innerHTML = `
        <div class="note-content">
              <div class="note-head">
                <p class="note-title">${note.title}</p>

                <button class="note-expand-btn" id="btn" type="button">
                  <ion-icon
                    class="note-expand-icon"
                    name="chevron-down-outline"
                  ></ion-icon>
                </button>

                <div class="note-tags">
                  ${note.tags.reduce(
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
${note.body}</textarea>
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
    `;

    return noteEl;
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
