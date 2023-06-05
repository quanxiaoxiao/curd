const findIndex = (list, query) => {
  if (!Array.isArray(list)) {
    throw new Error('data is not array');
  }
  const size = list.length;
  if (size === 0) {
    return -1;
  }
  if (typeof query === 'function') {
    return list.findIndex(query);
  }
  const keys = Object.keys(query);
  if (keys.length === 0) {
    return 0;
  }
  if (typeof query === 'object' && query !== null) {
    return list.findIndex((item) => keys.every((key) => item[key] === query[key]));
  }
  return list.indexOf(query);
};

export const update = (list, query, d) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  return [
    ...list.slice(0, index),
    { ...list[index], ...d },
    ...list.slice(index + 1),
  ];
};

export const remove = (list, query) => {
  const index = findIndex(list, query);
  if (index === -1) {
    return list;
  }
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1),
  ];
};

export const insert = (list, item, query) => {
  if (query) {
    const index = findIndex(list, query);
    if (index === -1) {
      return list;
    }
    const arr = [...list];
    arr.splice(index, 0, item);
    return arr;
  }
  return [item, ...list];
};

export const append = (list, item) => [...list, item];

export const filter = (list, query) => {
  if (typeof query === 'function') {
    return list.filter(query);
  }
  const keys = Object.keys(query);
  if (keys.length === 0) {
    return list;
  }
  const isPlainObject = typeof query === 'object' && query !== null;
  return list
    .filter((item) => {
      if (isPlainObject) {
        return !keys.every((key) => item[key] === query[key]);
      }
      return item !== query;
    });
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
