export class ClickAndHold {
  _isHeld = false;
  _activeTimeoutId = null;

  constructor(target, callback, timeout) {
    this._target = target;
    this._callback = callback;
    this._timeout = timeout;

    ['mousedown', 'touchstart'].forEach((event) =>
      this._target.addEventListener(event, this._onHoldStart.bind(this))
    );

    ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel'].forEach(
      (event) =>
        this._target.addEventListener(event, this._onHoldEnd.bind(this))
    );

    this._target.addEventListener('mouseover', this._onHover.bind(this));
  }

  _onHover(e) {
    this._target.textContent = 'Hold to remove';
  }

  _onHoldStart(e) {
    this._isHeld = true;
    this._target.style.backgroundColor = 'red';
    this._target.textContent = 'Hold to remove';

    this._activeTimeoutId = setTimeout(() => {
      if (this._isHeld) {
        this._callback(e);
      }
    }, this._timeout * 1000);
  }

  _onHoldEnd() {
    this._isHeld = false;
    clearTimeout(this._activeTimeoutId);
    this._target.textContent = 'Remove';

    this._target.style = '';
  }
}
