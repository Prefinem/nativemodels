const createType = require('./../createType');
const createModel = require('./../createModel');

const parseValue = (type, key, value) => createModel({ [key]: type })({ [key]: value })[key];

const getOverridedValue = (type, key, record) => (type ? parseValue(type, key, record[key]) : record[key]);

const isAsync = (fn) => fn && (fn.then || fn.constructor.name === 'AsyncFunction');

const resolve = (response, type, key) => Promise.resolve(response).then((value) => parseValue(type, key, value));

const computeWithType = (userFn, type, { context, key, record }) => {
  if (isAsync(userFn)) {
    return resolve(userFn(record, key), type, key, context);
  }

  const response = userFn(record, key, context);

  return isAsync(response) ? resolve(response, type, key) : parseValue(type, key, response);
};

const computed = (userFn, type, options = { allowOverride: false }) =>
  createType({
    fn: (record, key, context) => {
      if (options.allowOverride && record[key]) {
        return getOverridedValue(type, key, record);
      } else if (type) {
        return computeWithType(userFn, type, { context, key, record });
      }

      return userFn(record, key, context);
    },
    name: 'computed',
    type: options.allowOverride ? type : undefined,
  });

module.exports = computed;
