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

export const update = (list, query, data, fn) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  const obj = list[index];
  if (fn) {
    fn(obj);
  }
  if (typeof obj === 'object') {
    const item = {
      ...obj,
      ...data,
    };
    return list.slice(0, index)
      .concat([item])
      .concat(list.slice(index + 1));
  }
  return list.slice(0, index)
    .concat([data])
    .concat(list.slice(index + 1));
};

export const remove = (list, query, fn) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  const item = list[index];
  if (fn) {
    fn(item);
  }
  return list.slice(0, index).concat(list.slice(index + 1));
};

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

export const append = (list, item) => [...list, item];

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
