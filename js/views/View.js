export class View {
  _data;

  render(data = null) {
    this._data = data;

    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
