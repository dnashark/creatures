const Event = require('./event');

class Transition {
  /**
   * @param {!Event} event 
   */
  constructor(event) {
    /** @private */
    this.event_ = event;
  }

  get event() { return this.event_; }
}

module.exports = Transition;
