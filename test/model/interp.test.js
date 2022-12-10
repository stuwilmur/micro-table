import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data
const countryData = [
  {year: 2000, country: 'Brazil', gdp: 655.4},
  {year: 2000, country: 'China', gdp: 1211},
  {year: 2001, country: 'Brazil', gdp: NaN},
  {year: 2001, country: 'China', gdp: 1339},
  {year: 2002, country: 'Brazil', gdp: 509.8},
  {year: 2002, country: 'China', gdp: 1471},
];

const countryDataInterpolated = [
  {year: 2000, country: 'Brazil', gdp: 655.4},
  {year: 2001, country: 'Brazil', gdp: 582.6},
  {year: 2002, country: 'Brazil', gdp: 509.8},
  {year: 2000, country: 'China', gdp: 1211},
  {year: 2001, country: 'China', gdp: 1339},
  {year: 2002, country: 'China', gdp: 1471},
];

// Tests
test('Interpolate one property on one group', () => {
  expect(
    areObjectsEqual(
      model()
        .interp()
        .x('year')
        .y('gdp')
        .groupBy('country')
        .end()
        .data(countryData),
      countryDataInterpolated,
    ),
  ).toBeTruthy();
});
