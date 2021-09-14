import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import { HOLD_TO_REMOVE_TIME } from './config';
import { ClickAndHold } from './helpers';

import SearchView from './views/SearchView';
import AddNoteView from './views/AddNoteView';
import AddNoteBtnView from './views/AddNoteBtnView';
import NoteView from './views/NoteView';

const load = function (notes = null) {
  if (notes) {
    clear();
    notes.forEach((note) => NoteView.render(note));

    document.querySelectorAll('.note').forEach((note) => {
      const btnRemove = note.querySelector('.btn-remove');
      new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);
    });
  } else {
    model.loadState();
    model.state.noteFormActive = false;
    model.state.currentId = undefined;

    if (model.state.notes.length > 0) clear();

    model.state.notes.forEach((note) => NoteView.render(note));

    document.querySelectorAll('.note').forEach((note) => {
      const btnRemove = note.querySelector('.btn-remove');
      new ClickAndHold(btnRemove, controlNoteRemoveBtn, HOLD_TO_REMOVE_TIME);
    });
  }
};

const renderMessage = function (message) {
  const container = document.querySelector('.notes-container');

  const markup = `<p class="message">${message}</p>`;

  container.insertAdjacentHTML('afterbegin', markup);
};

const clear = function () {
  document.querySelector('.notes-container').innerHTML = '';
  document.querySelector('.search-input').value = '';
};

const controlClear = function () {
  clear();
  load();

  if (model.state.notes.length === 0)
    renderMessage('No notes yet. Start by adding a note.');
};

const controlAddNoteClose = function () {
  AddNoteView.remove();
  model.state.noteFormActive = false;

  if (model.state.notes.length === 0)
    renderMessage('No notes yet. Start by adding a note.');
};

const controlAddNoteBtn = function () {
  if (!model.state.noteFormActive) {
    AddNoteView.render();
    model.state.noteFormActive = true;

    const msg = document.querySelector('.message');
    if (msg) msg.remove();
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

  if (model.state.notes.length === 0)
    renderMessage('No notes yet. Start by adding a note.');
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

const controlSearchBtn = function (form, e) {
  const formData = new FormData(form);

  const text = formData.get('search').trim();

  if (text) {
    e.preventDefault();
    const tags = text.split(' ');

    const found = model.state.notes.filter((note) => {
      let match = false;
      tags.forEach((tag) => {
        if (note.tags.includes(tag)) {
          match = true;
          clear;
          return;
        }
      });

      if (match) return note;
    });

    load(found);

    if (found.length === 0) renderMessage('No notes found');
  }
};

(function () {
  SearchView.render();
  SearchView.addSearchHandler(controlSearchBtn);
  SearchView.addClearHandler(controlClear);
  AddNoteBtnView.render();
  AddNoteBtnView.addClickHandler(controlAddNoteBtn);
  renderMessage('No notes yet. Start by adding a note.');
  load();
  AddNoteView.addCloseHandler(controlAddNoteClose);
  AddNoteView.addSaveHandler(controlFormSaveBtn);
  NoteView.addExpandHandler(controlNoteExpandBtn);
  NoteView.addEditHandler(controlNoteEditBtn);
  NoteView.addSaveHandler(controlNoteSaveBtn);
  NoteView.addEditCloseHandler(controlEditNoteClose);
})();
