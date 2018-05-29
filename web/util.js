function logout(req) {
  req.session = null;
}

function login(req, id) {
  req.session.userId = id;
}

function getUserId(req) {
  return req.session && req.session.userId;
}

/** @returns {boolean} */
function isLoggedIn(req) {
  return !!getUserId(req);
}

module.exports = {
  logout,
  login,
  getUserId,
  isLoggedIn,
};
