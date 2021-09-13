export const state = {
  noteFormActive: false,
  lastId: 0,
  currentId: undefined,
  notes: [],
};

export const saveState = function () {
  localStorage.setItem('state', JSON.stringify(state));
};

export const loadState = function () {
  const loadedState = JSON.parse(localStorage.getItem('state'));

  if (!loadedState) return;

  state.lastId = loadedState.lastId;
  state.notes = loadedState.notes;
};
