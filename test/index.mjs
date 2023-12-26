import test from 'ava'; // eslint-disable-line
import {
  find,
  update,
  remove,
} from '../src/index.mjs';

test('find', (t) => {
  let data = ['1', '2', '3', '4'];
  t.deepEqual(find(data, '3'), '3');
  t.deepEqual(find(data, '5'), null);
  t.deepEqual(find(data, (d) => d === '3'), '3');
  t.deepEqual(find(data, (d) => d === '6'), null);
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
  t.deepEqual(find(data, {
    name: 'bbb',
  }), { name: 'bbb' });
  t.deepEqual(find(data, {
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
  t.deepEqual(find(data, {
    name: 'bbb',
  }), { name: 'bbb', age: 22 });
  t.is(find(data, {
    name: 'bbb',
    age: 33,
  }), null);
  t.deepEqual(find(data, {
    name: 'bbb',
    age: 22,
  }), { name: 'bbb', age: 22 });
});

test('update', (t) => {
  let data = [1, 2, 3];
  t.deepEqual(update(data, 2, 8), [1, 8, 3]);
  t.deepEqual(update(data, 9, 8), [1, 2, 3]);
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
  t.deepEqual(update(data, 9, 8), data);
  t.deepEqual(update(data, { age: 22 }, { age: 88 }), [
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

test('remove', (t) => {
  const data = [1, 2, 3, 8, 9];
  t.deepEqual(remove(data, 8), [1, 2, 3, 9]);
});
