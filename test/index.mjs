import test from 'ava'; // eslint-disable-line
import { find } from '../src/index.mjs';

test('curd find', (t) => {
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
});
