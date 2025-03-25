import assert from 'node:assert';
import test from 'node:test';

import {
  find,
  remove,
  update,
} from './index.mjs';

test('find', () => {
  let data = ['1', '2', '3', '4'];
  assert.deepEqual(find(data, '3'), '3');
  assert.deepEqual(find(data, '5'), null);
  assert.deepEqual(find(data, (d) => d === '3'), '3');
  assert.deepEqual(find(data, (d) => d === '6'), null);
  assert.throws(() => {
    find({}, {});
  });
  assert.equal(find(['aaa'], null), null);
  assert.equal(find([], { name: 'bbb' }), null);
  assert.equal(find(['aaa'], {}), 'aaa');
  data = [
    {
      name: 'aaa',
    },
    {
      name: 'bbb',
    },
    {
      name: 'ccc',
    },
  ];
  assert.deepEqual(find(data, {
    name: 'bbb',
  }), { name: 'bbb' });
  assert.deepEqual(find(data, {
    name: 'eee',
  }), null);
  data = [
    {
      name: 'aaa',
      age: 11,
    },
    {
      name: 'bbb',
      age: 22,
    },
    {
      name: 'ccc',
      age: 33,
    },
  ];
  assert.deepEqual(find(data, {
    name: 'bbb',
  }), { name: 'bbb', age: 22 });
  assert.equal(find(data, {
    name: 'bbb',
    age: 33,
  }), null);
  assert.deepEqual(find(data, {
    name: 'bbb',
    age: 22,
  }), { name: 'bbb', age: 22 });
});

test('update', () => {
  let data = [1, 2, 3];
  assert.deepEqual(update(data, 2, 8), [1, 8, 3]);
  assert.deepEqual(update(data, 9, 8), [1, 2, 3]);
  data = [
    {
      name: 'aaa',
      age: 22,
    },
    {
      name: 'bbb',
      age: 22,
    },
    {
      name: 'ccc',
      age: 33,
    },
  ];
  assert.deepEqual(update(data, 9, 8), data);
  assert.deepEqual(update(data, { age: 22 }, { age: 88 }), [
    {
      name: 'aaa',
      age: 88,
    },
    {
      name: 'bbb',
      age: 22,
    },
    {
      name: 'ccc',
      age: 33,
    },
  ]);
});

test('update2', () => {
  const data = [
    {
      name: 'aaa',
      age: 22,
    },
    {
      name: 'bbb',
      age: 22,
    },
    {
      name: 'ccc',
      age: 33,
    },
  ];
  assert.deepEqual(update(data, (d) => {
    if (d.name === 'bbb') {
      return true;
    }
    return false;
  }, { age: 88 }), [
    {
      name: 'aaa',
      age: 22,
    },
    {
      name: 'bbb',
      age: 88,
    },
    {
      name: 'ccc',
      age: 33,
    },
  ]);
});

test('remove', () => {
  const data = [1, 2, 3, 8, 9];
  assert.deepEqual(remove(data, 8), [1, 2, 3, 9]);
});
