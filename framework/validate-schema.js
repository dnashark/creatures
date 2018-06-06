module.exports = function validateSchema(args, schema) {
  const throwError = () => { throw new Error('invalid args') };

  if (Object.keys(schema).length != Object.keys(args).length) throwError();
  for (const key of Object.keys(args)) {
    const type = schema[key];
    const value = args[key];
    if (!type) throwError();
    if (type == String) {
      if (!value || typeof value != 'string') throwError();
    } else if (type == Number) {
      if (!value || typeof value != 'number') throwError();
    } else if (type == Boolean) {
      if (!value || typeof value != 'boolean') throwError();
    } else if (Object.getPrototypeOf(type) == Object.prototype) {
      if (!value || typeof value != 'object') throwError();
      validateSchema(value, type);
    } else {
      throw new Error('invalid schema');
    }
  }
};
