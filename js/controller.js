import 'core-js/stable';
import 'regenerator-runtime/runtime';

import AddNoteView from './views/AddNoteView';

const controlAddNoteClose = function (e) {
  AddNoteView.getElement().classList.remove('add-note-active');
};

(function () {
  AddNoteView.addCloseHandler(controlAddNoteClose);
})();
