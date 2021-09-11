class AddNoteView {
  _parentEl = document.querySelector('.add-note');

  addCloseHandler(handler) {
    this._parentEl
      .querySelector('.note-close-btn')
      .addEventListener('click', handler);
  }

  addSaveHandler(handler) {
    this._parentEl
      .querySelector('.btn-save')
      .addEventListener('click', handler);
  }

  getElement() {
    return this._parentEl;
  }
}

export default new AddNoteView();
