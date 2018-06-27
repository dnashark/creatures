const controllers = require('../../controllers');
const healingCenter = require('../dungeons/healing-center');
const template = require('../../framework/template');

const CONTENT = new template.FileTemplate(require.resolve('../views/farm-town.html'));

module.exports = function(req, res) {
  res.send(CONTENT.apply({
    healingCenterUnlocked: healingCenter.isUnlockedFor(req.player),
    healingCenterPath: healingCenter.path,
  }));
};
