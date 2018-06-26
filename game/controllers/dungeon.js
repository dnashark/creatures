const fs = require('fs');

const controllers = require('../../controllers');

const dungeons = {};
for (const filename of fs.readdirSync(__dirname + '/../dungeons')) {
  const dungeon = require('../dungeons/' + filename);
  if (dungeons[dungeon.name]) throw new Error('duplicate dungeon name: ' + dungeon.name);
  dungeons[dungeon.name] = dungeon;
}

module.exports = async function(req, res) {
  const dungeon = req.query.name && dungeons[req.query.name];
  if (dungeon && dungeon.isUnlockedFor(req.player)) {
    const content = await dungeon.handler(req);
    await req.player.save();
    res.send(content);
  } else {
    res.redirect(controllers.MAP.path);
  }
};
