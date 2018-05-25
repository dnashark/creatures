module.exports = {
  path: '/logOut',
  method: 'GET',
  handle: (req, res) => {
    req.session = null;
    res.redirect('/');
  },  
};
