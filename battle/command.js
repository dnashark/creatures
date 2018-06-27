const Type = {
  MOVE: 1,
}

class Command {
  constructor(type, index) {
    this.type_ = type;
    this.index_ = index;
  }

  get isMove() { return this.type_ == Type.MOVE; }

  get index() { return this.index_; }
};

module.exports = {
  move: (index) => new Command(Type.MOVE, index),
};