module.exports = class Move {
  constructor(args) {
    this.name_ = args.name;
    this.power_ = args.power;
    this.accuracy_ = args.accuracy;
    this.isSpecial_ = args.isSpecial;
    this.cost_ = args.cost;
  }

  get name() { return this.name_; }
  get power() { return this.power_; }
  get accuracy() { return this.accuracy_; }
  get isSpecial() { return this.isSpecial_; }
  get cost() { return this.cost_; }
};
