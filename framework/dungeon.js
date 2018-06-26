const controllers = require('../controllers');

module.exports = class Dungeon {
  constructor(name, adventures) {
    this.name_ = name;
    this.adventures_ = adventures;
  }

  get name() {
    return this.name_;
  }
  
  get path() {
    return controllers.DUNGEON.path + '?name=' + this.name_;
  }

  isUnlocked(player) {
    return this.getDungeonData(player).isUnlocked;
  }

  unlock(player) {
    this.getDungeonData(player).isUnlocked = true;
  }

  lock(player) {
    this.getDungeonData(player).isUnlocked = false;
  }

  async handler(req) {
    const index = Math.floor(Math.random() * this.adventures_.length);
    return await this.adventures_[index].handler(req);
  }

  getDungeonData(player) {
    let data = player.dungeon_data.get(this.name_);
    if (!data) {
      player.dungeon_data.set(this.name_, {});
      data = player.dungeon_data.get(this.name_);
    }
    return data;
  }
}