const throwError = () => { throw new Error('invalid args') };

module.exports = function validateSchema(args, schema) {
  if (Array.isArray(schema)) {
    validateArraySchema(args, schema);
  } else if (Object.getPrototypeOf(schema) == Object.prototype) {
    validateObjectSchema(args, schema);
  } else {
    throwError();
  }
};

function validateObjectSchema(args, schema) {
  if (Object.keys(schema).length != Object.keys(args).length) throwError();
  for (const key of Object.keys(args)) {
    const type = schema[key];
    const value = args[key];
    validateValue(value, type);
  }
}

function validateArraySchema(args, schema) {
  if (!Array.isArray(args)) throwError();
  if (schema.length != 1) throwError();

  const type = schema[0];
  for (const value of args) {
    validateValue(value, type);
  }
}

function validateValue(value, type) {
  if (!type) throwError();
  if (type == String) {
    if (!value || typeof value != 'string') throwError();
  } else if (type == Number) {
    if (!value || typeof value != 'number') throwError();
  } else if (type == Boolean) {
    if (!value || typeof value != 'boolean') throwError();
  } else if (Object.getPrototypeOf(type) == Object.prototype) {
    if (!value || typeof value != 'object') throwError();
    validateObjectSchema(value, type);
  } else if (Array.isArray(type)) {
    validateArraySchema(value, type);
  } else {
    throw new Error('invalid schema');
  }
}