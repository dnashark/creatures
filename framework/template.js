const fs = require('fs');

const constants = require('../constants');
const controllers = require('../controllers');

/**
 * @param {string} content
 * @returns {string} 
 */
function replacePaths(content) {
  return content.replace(/@\{(\w+)\}/g, function(match, group) {
    if (!controllers[group]) throw new Error('unresolved path');
    return controllers[group].path;
  });
}

function replaceConstants(content) {
  return content.replace(/!\{(\w+)\}/g, function(match, group) {
    if (constants[group] == undefined) throw new Error('unresolved constant');
    return constants[group];
  });
}

function replaceIf(content, variableValues) {
  return content.replace(/\?\{(\w+)\:((\$\{\w+\}|[^]*?)*?)\}/g, function(match, group1, group2) {
    return variableValues[group1] ? group2 : '';
  });
}

function replaceIfNot(content, variableValues) {
  return content.replace(/\^\{(\w+)\:((\$\{\w+\}|[^]*?)*?)\}/g, function(match, group1, group2) {
    return !variableValues[group1] ? group2 : '';
  });
}

function replaceVariables(content, variableValues) {
  return content.replace(/\$\{(\w+)\}/g, function(match, group) {
    const value = variableValues[group];
    if (value === undefined || value === null) throw new Error('unresolved variable');
    return value;
  })
}

class StringTemplate {
  /**
   * @param {string} content 
   */
  constructor(content) {
    /** @private {string} */
    this.content_ = replaceConstants(replacePaths(content));
  }

  /**
   * @param {!Object<string, string>} variableValues
   * @returns {string} 
   */
  apply(variableValues) {
    variableValues = variableValues || {};

    let content = replaceIf(this.content_, variableValues);
    content = replaceIfNot(content, variableValues);
    content = replaceVariables(content, variableValues);
    return content;
  }
};

class FileTemplate extends StringTemplate {
  /**
   * @param {string} path 
   * @param {boolean=} cache 
   */
  constructor(path) {
    const content = fs.readFileSync(path, {encoding: 'utf8'});
    super(content);
  }
}

// TODO: Should only have a single string template with methods fromString and fromFile
module.exports = {
  StringTemplate,
  FileTemplate,
};
