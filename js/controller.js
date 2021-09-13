import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import { HOLD_TO_REMOVE_TIME } from './config';
import { ClickAndHold } from './helpers';

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

const controlNoteRemoveBtn = function (e) {
  const noteEl = e.target.closest('.note');
  const id = noteEl.dataset.id;
  noteEl.classList.remove('note-active');

  setTimeout(() => noteEl.remove(), 250);
  const index = model.state.notes.findIndex((n) => n.id === +id);
  model.state.notes.splice(index, 1);
  model.saveState();
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

    const btnRemove = document
      .querySelector('.note')
      .querySelector('.btn-remove');
    new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);

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
  let noteEl = form.closest('.note');
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

    noteEl = NoteView.edit(noteEl, note, true);
    const btnRemove = noteEl.querySelector('.btn-remove');
    new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);
  }

  model.saveState();
};

const controlEditNoteClose = function (noteEl) {
  const id = +noteEl.dataset.id;
  const note = model.state.notes.find((n) => n.id === id);

  noteEl = NoteView.edit(noteEl, note, true);
  const btnRemove = noteEl.querySelector('.btn-remove');
  new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);
};

const controlNoteExpandBtn = function (note) {
  note.classList.toggle('note-active');
};

const load = function () {
  model.loadState();
  model.state.noteFormActive = false;
  model.state.currentId = undefined;

  model.state.notes.forEach((note) => NoteView.render(note));

  document.querySelectorAll('.note').forEach((note) => {
    const btnRemove = note.querySelector('.btn-remove');
    new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);
  });
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
