var Timer = {
  get actionButton() {
    delete this.actionButton;
    return this.actionButton = document.getElementById('start-cancel-button');
  },

  get tickerView() {
    delete this.tickerView;
    return this.tickerView = document.getElementById('timer-ticker-view');
  },

  get chronoView() {
    delete this.chronoView;
    return this.chronoView = document.getElementById('timer-chrono-view');
  },

  get timerField() {
    delete this.timerField;
    return this.timerField = document.getElementById('timer-field');
  },

  execute: function ti_execute(action) {
    if (!this[action]) {
      return;
    }

    this[action]();
  },

  start: function ti_start() {
    this.actionButton.dataset.action = 'cancel';
    this.chronoView.parentNode.classList.remove('ended');
    this.tickerView.classList.add('running');
    this.timerField.disabled = true;

    // simple duration parsing
    var durationComponents = this.timerField.value.split(':');
    var duration = 0;
    for (var i = 0; i < durationComponents.length; i++) {
      var unitHandler = (durationComponents.length - 1) * 60 - (i * 60);
      if (unitHandler == 0) {
        unitHandler = 1;
      }

      duration += unitHandler * 1000 * durationComponents[i];
    }

    this._endTime = Date.now() + duration;
    this.updateChrono(duration);

    this._ticker = setInterval(function ti_updateChrono(self) {
      var remaining = self._endTime - Date.now();
      if (remaining <= 0) {
        self.updateChrono(0);
        self.end();
        return;
      }

      self.updateChrono(remaining);
    }, 1000, this);
  },

  cancel: function ti_cancel() {
    this.actionButton.dataset.action = 'start';
    this.tickerView.classList.remove('running');
    this.timerField.disabled = false;

    clearInterval(this._ticker);
    delete this._ticker;
    delete this._endTime;
  },

  end: function ti_end() {
    //TODO: ring too
    try {
      navigator.mozVibrate(100, 100, 100);
    } catch (e) {}
    this.cancel();
    this.chronoView.parentNode.classList.add('ended');
  },

  updateChrono: function sw_updateChrono(remaining) {
    this.chronoView.innerHTML = new Date(remaining).toLocaleFormat('%M:%S');
  }
};
