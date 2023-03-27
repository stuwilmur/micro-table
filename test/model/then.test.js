import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

const modelA = model().const().called('b').value(1).end();
const modelB = model()
  .calc()
  .called('c')
  .does((r) => r.b * 2)
  .end();
const data = [{a: 1}, {a: 3}];
const expectedResult = [
  {a: 1, b: 1, c: 2},
  {a: 3, b: 1, c: 2},
];

test('Add model B to model A', () => {
  expect(
    areObjectsEqual(modelA.add(modelB).data(data), expectedResult),
  ).toBeTruthy();
});
