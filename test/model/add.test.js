import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data
const modelA = model().const().called('b').value(1).end();
const modelB = model()
  .calc()
  .called('c')
  .does((r) => r.b * 2)
  .end();
const data = [{a: 1}, {a: 3}];

// Tests
test('Compose model A and model B', () => {
  expect(
    areObjectsEqual(
      modelA.add(modelB).data(data),
      modelB.data(modelA.data(data)),
    ),
  ).toBeTruthy();
});

test('Compose model B and model A', () => {
  expect(
    areObjectsEqual(
      modelB.add(modelA).data(data),
      modelA.data(modelB.data(data)),
    ),
  ).toBeTruthy();
});
