const controllers = require('../../controllers');
const forestDungeon = require('../dungeons/forest');
const template = require('../../framework/template');

const CONTENT = new template.FileTemplate(require.resolve('../views/map.html'));

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({
    forestUnlocked: forestDungeon.isUnlockedFor(req.player),
    forestPath: forestDungeon.path,
  }));
};
