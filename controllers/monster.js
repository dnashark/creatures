class MonsterController {
  constructor(model) {
    this.model_ = model;
  }

  get type() {
    return this.model_.type;
  }
}

module.exports = MonsterController;