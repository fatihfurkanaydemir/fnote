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

  if (title && body) {
    e.preventDefault();

    const note = {
      title,
      tags: tags === '' ? [] : tags.split(' '),
      body,
      id: model.state.lastId++,
      date: new Date(),
    };

    model.state.notes.push(note);

    NoteView.render(note);

    AddNoteView.remove();
    model.state.noteFormActive = false;
  }

  model.saveState();
};

const controlNoteEditBtn = function (noteEl) {
  model.state.currentId = +noteEl.dataset.id;
  const note = model.state.notes.find((n) => n.id === model.state.currentId);
  NoteView.edit(noteEl, note);
};

const controlNoteSaveBtn = function (form, e) {
  const formData = new FormData(form);
  const noteEl = form.closest('.note');
  model.state.currentId = +noteEl.dataset.id;

  const title = formData.get('title').trim();
  const tags = formData.get('tags').trim();
  const body = formData.get('notebody').trim();

  if (title && body) {
    e.preventDefault();

    const note = model.state.notes.find((n) => n.id === model.state.currentId);
    note.title = title;
    note.tags = tags === '' ? [] : tags.split(' ');
    note.body = body;

    NoteView.edit(noteEl, note, true);
  }

  model.saveState();
};

const controlEditNoteClose = function (noteEl) {
  const id = +noteEl.dataset.id;
  const note = model.state.notes.find((n) => n.id === id);
  NoteView.edit(noteEl, note, true);
};

const controlNoteExpandBtn = function (note) {
  note.classList.toggle('note-active');
};

const load = function () {
  model.loadState();
  model.state.noteFormActive = false;
  model.state.currentId = undefined;

  model.state.notes.forEach((note) => NoteView.render(note));
};

(function () {
  load();
  AddNoteBtnView.render();
  AddNoteBtnView.addClickHandler(controlAddNoteBtn);
  AddNoteView.addCloseHandler(controlAddNoteClose);
  AddNoteView.addSaveHandler(controlFormSaveBtn);
  NoteView.addExpandHandler(controlNoteExpandBtn);
  NoteView.addEditHandler(controlNoteEditBtn);
  NoteView.addSaveHandler(controlNoteSaveBtn);
  NoteView.addEditCloseHandler(controlEditNoteClose);
})();
