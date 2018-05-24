/** @returns {string} */
module.exports = function(bodyContent) {
  const pageContent =
    '<!doctype html>' +
    '<html>' +
      '<head>' +
        '<title>Companion Creatures</title>' +
      '</head>' +
      '<body>' +
        bodyContent +
      '</body>' +
    '</html>';
  return pageContent;
};
