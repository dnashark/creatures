const controllers = require('../../controllers');

module.exports = function(req, res) {
  res.send(
    '<h1>Dr. Apple\'s Lab</h1>' +
    '<p>Welcome to Dr. Apple\'s lab!</p>' +
    '<p><a href="' + controllers.FARM_TOWN.path + '">Exit to Farm Town</a></p>'
  );
};
