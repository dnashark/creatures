class PlayerController {
  constructor(model) {
    this.model_ = model;
  }

  /** @returns {string} */
  get name() {
    return this.model_.name;
  }

  /** @returns {string} */
  get scenario() {
    return this.model_.scenario;
  }

  /** @param {string} value */
  set scenario(value) {
    this.model_.scenario = value;
  }

  /**
   * @param {string} password 
   * @returns {boolean}
   */
  authenticate(password) {
    return password === this.model_.password;
  }
}

module.exports = PlayerController;
