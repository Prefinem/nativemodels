/* eslint max-params: off */
const parseValue = require('./parseValue');

const get = (schema, target, property, context) => {
  console.log('target', target);
  if (schema[property]) {
    return schema[property].fn ? schema[property].fn(target, property, context) : target[property];
  }

  return undefined;
};

const getOwnPropertyDescriptor = (schema, target, property) =>
  schema[property]
    ? {
        configurable: true,
        enumerable: true,
        value: schema[property].fn ? '[computedValue]' : target[property],
        writable: true,
      }
    : undefined;

const ownKeys = (schema, target) => {
  const allKeys = [...Object.keys(target), ...Object.keys(schema).filter((key) => schema[key].fn)];

  return [...new Set(allKeys)];
};

const set = (schema, target, property, value, options) => {
  if (!schema[property]) {
    throw new Error(`NativeModels - ${property} is not a property of model`);
  }

  const type = schema[property].fn && schema[property].type ? schema[property].type : schema[property];

  target[property] = parseValue(type, property, value, options);

  return true;
};

const proxyHandler = (schema, options, context) => ({
  get: (target, property) => get(schema, target, property, context),
  getOwnPropertyDescriptor: (target, property) => getOwnPropertyDescriptor(schema, target, property),
  ownKeys: (target) => ownKeys(schema, target),
  set: (target, property, value) => set(schema, target, property, value, options),
});

module.exports = proxyHandler;
