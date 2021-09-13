import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';

import AddNoteView from './views/AddNoteView';
import AddNoteBtnView from './views/AddNoteBtnView';
import NoteView from './views/NoteView';

const controlAddNoteClose = function () {
  AddNoteView.remove();
  model.state.noteFormActive = false;
};

const controlAddNoteBtn = function () {
  if (!model.state.noteFormActive) {
    AddNoteView.render();
    model.state.noteFormActive = true;
  }
};

const controlFormSaveBtn = function (form, e) {
  const formData = new FormData(form);

  const title = formData.get('title').trim();
  const tags = formData.get('tags').trim();
  const body = formData.get('notebody').trim();

  if (title && tags && body) {
    e.preventDefault();

    const note = {
      title,
      tags: tags.split(' '),
      body,
      id: model.state.lastId++,
      date: new Date(),
    };

    model.state.notes.push(note);

    NoteView.render(note);

    AddNoteView.remove();
    model.state.noteFormActive = false;
  }
};

const controlNoteExpandBtn = function (note) {
  note.classList.toggle('note-active');
};

AddNoteBtnView.render();

(function () {
  AddNoteBtnView.addClickHandler(controlAddNoteBtn);
  AddNoteView.addCloseHandler(controlAddNoteClose);
  AddNoteView.addSaveHandler(controlFormSaveBtn);
  NoteView.addExpandHandler(controlNoteExpandBtn);
})();
