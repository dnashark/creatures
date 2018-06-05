module.exports = {
  DR_APPLE_WELCOME: event('dr-apple-welcome'), 
};

/**
 * @param {string} moduleName
 * @param {string=} exportName
 */
function event(moduleName, exportName) {
  const module = require('./events/' + moduleName);
  return exportName ? module[exportName] : module;
}
