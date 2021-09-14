import { View } from './View';

class SearchView extends View {
  _parentEl = document.querySelector('.search-container');

  addSearchHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const searchBtn = e.target.closest('.btn-search');

      if (!searchBtn) return;

      const form = searchBtn.closest('.search-form');

      handler(form, e);
    });
  }

  addClearHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const clearBtn = e.target.closest('.btn-clear');

      if (!clearBtn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
    <form class="search-form">
      <input
        type="text"
        class="search-input"
        id="search"
        name="search"
        placeholder="Search notes by tags"
        required
      />
      <div class="search-buttons">
      <button type="submit" class="note-form-btn btn-search">
        Search
      </button>
      <button type="button" class="note-form-btn btn-clear">
        Clear
      </button>
      </div>
    </form>`;
  }
}

export default new SearchView();
