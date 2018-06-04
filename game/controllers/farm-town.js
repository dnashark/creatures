const controllers = require('../controllers');

module.exports = function(req, res) {
  res.send(
    '<h1>Farm Town</h1>' +
    '<p>You are standing in Farm Town. This is where you live. There are many places to visit.</p>' +
    '<ul>' +
      '<li><a href="' + controllers.DR_APPLES_LAB.path + '">Dr. Apple\'s Lab</a></li>' +
    '</ul>' +
    '<p><a href="' + controllers.MAP.path + '">Leave Farm Town</a></p>'
  );
};
