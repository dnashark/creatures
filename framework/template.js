module.exports = class Template {
  /**
   * @param {string} content 
   */
  constructor(content) {
    /** @private {string} */
    this.content_ = content;
    this.variableMap_ = createVariableMap(content);
  }

  /**
   * @param {!Object<string, string>} variableValues
   * @returns {string} 
   */
  apply(variableValues) {
    const THROW_ERROR = function() { throw new Error('Non-matching template values'); }

    if (Object.keys(variableValues).length != this.variableMap_.size) THROW_ERROR();
    
    let content = this.content_;
    for (const variable of Object.keys(variableValues)) {
      const regex = this.variableMap_.get(variable);
      if (!regex) THROW_ERROR();

      content = content.replace(regex, variableValues[variable]);
    }
    return content;
  }
};

/**
 * @param {string} content
 * @returns {!Map<string, !RegExp>} 
 */
function createVariableMap(content) {
  const VARIABLE_PATTERN = /\$\{(\w+)\}/g;

  /** @type {!Map<string, !RegExp>} */
  const variableMap = new Map();

  let match;
  while (match = VARIABLE_PATTERN.exec(content)) {
    const variable = match[1];
    variableMap.set(variable, new RegExp('\\$\\{' + variable + '\\}', 'g'));
  }

  return variableMap; 
}