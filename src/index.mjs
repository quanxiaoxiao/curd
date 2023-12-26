/**
 * @param {Array<*>} list
 * @param {*} query
 * @returns {number}
 */
const findIndex = (list, query) => {
  if (!Array.isArray(list)) {
    throw new Error('data is not array');
  }
  if (query == null) {
    return -1;
  }
  const size = list.length;
  if (size === 0) {
    return -1;
  }
  const type = typeof query;
  if (type === 'function') {
    return list.findIndex(query);
  }
  if (query !== null && type === 'object') {
    const keys = Object.keys(query);
    if (keys.length === 0) {
      return 0;
    }
    return list.findIndex((item) => keys.every((key) => item[key] === query[key]));
  }
  return list.indexOf(query);
};

/**
 * @template T
 * @param {Array<T>} list
 * @param {*} query
 * @param {T} d
 * @returns {Array<T>}
 */
export const update = (list, query, d) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  const obj = list[index];
  if (typeof obj === 'object') {
    const item = {
      ...list[index],
      ...d,
    };
    return list.slice(0, index)
      .concat([item])
      .concat(list.slice(index + 1));
  }
  return list.slice(0, index)
    .concat([d])
    .concat(list.slice(index + 1));
};

/**
 * @template T
 * @param {Array<T>} list
 * @param {*} query
 * @returns {Array<T>}
 */
export const remove = (list, query) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  return list.slice(0, index).concat(list.slice(index + 1));
};

/**
 * @template T
 * @param {Array<T>} list
 * @param {T} item
 * @param {*} query
 * @return {Array<T>}
 */
export const insert = (list, item, query) => {
  if (query) {
    const index = findIndex(list, query);
    if (index === -1) {
      return list;
    }
    return list.slice(0, index)
      .concat([item])
      .concat(list.slice(index));
  }
  return [item, ...list];
};

/**
 * @template T
 * @param {Array<T>} list
 * @param {T} item
 * @returns {Array<T>}
 */
export const append = (list, item) => [...list, item];

/**
 * @param {Array<*>} list
 * @param {*} query
 * @returns {Array<*>}
 */
export const filter = (list, query) => {
  if (query == null) {
    return list;
  }
  const type = typeof query;
  if (type === 'function') {
    return list.filter(query);
  }
  if (type !== 'object') {
    return list.filter((item) => item !== query);
  }
  const keys = Object.keys(query);
  if (keys.length === 0) {
    return list;
  }
  return list
    .filter((item) => !keys.every((key) => item[key] === query[key]));
};

/**
 * @template T
 * @param {Array<T>} list
 * @param {*} query
 * @returns {T|null}
 */
export const find = (list, query) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return null;
  }
  return list[index];
};

export default {
  find,
  filter,
  append,
  insert,
  remove,
  update,
};
