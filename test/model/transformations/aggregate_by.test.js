import {aggregateBy} from '../../../src/model/transformations';
import {areObjectsEqual} from '../../../src/util/utils';
import {sum, max} from 'd3';

// Test data

const athletes = [
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
  },
  {name: 'Lionel Messi', sport: 'Soccer', nation: 'Argentina', earnings: 111},
  {
    name: 'Cristiano Ronaldo',
    sport: 'Soccer',
    nation: 'Portugal',
    earnings: 108,
  },
  {name: 'Conor McGregor', sport: 'MMA', nation: 'Ireland', earnings: 99},
  {name: 'Neymar', sport: 'Soccer', nation: 'Brazil', earnings: 90},
  {
    name: 'LeBron James',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 85.5,
  },
  {
    name: 'Roger Federer',
    sport: 'Tennis',
    nation: 'Switzerland',
    earnings: 77.2,
  },
  {
    name: 'Stephen Curry',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 76.9,
  },
  {
    name: 'Matt Ryan',
    sport: 'Football',
    nation: 'United States',
    earnings: 67.3,
  },
  {
    name: 'Matthew Stafford',
    sport: 'Football',
    nation: 'United States',
    earnings: 59.5,
  },
];

const athletesAggregatedBySport = [
  {'sport': 'Boxing', 'total earnings': 285, 'max earnings': 285},
  {'sport': 'Soccer', 'total earnings': 309, 'max earnings': 111},
  {'sport': 'MMA', 'total earnings': 99, 'max earnings': 99},
  {'sport': 'Basketball', 'total earnings': 162.4, 'max earnings': 85.5},
  {'sport': 'Tennis', 'total earnings': 77.2, 'max earnings': 77.2},
  {'sport': 'Football', 'total earnings': 126.8, 'max earnings': 67.3},
];

const athletesAggregatedBySportAndNation = [
  {
    'sport': 'Boxing',
    'nation': 'United States',
    'total earnings': 285,
    'max earnings': 285,
  },
  {
    'sport': 'Soccer',
    'nation': 'Argentina',
    'total earnings': 111,
    'max earnings': 111,
  },
  {
    'sport': 'Soccer',
    'nation': 'Portugal',
    'total earnings': 108,
    'max earnings': 108,
  },
  {
    'sport': 'Soccer',
    'nation': 'Brazil',
    'total earnings': 90,
    'max earnings': 90,
  },
  {
    'sport': 'MMA',
    'nation': 'Ireland',
    'total earnings': 99,
    'max earnings': 99,
  },
  {
    'sport': 'Basketball',
    'nation': 'United States',
    'total earnings': 162.4,
    'max earnings': 85.5,
  },
  {
    'sport': 'Tennis',
    'nation': 'Switzerland',
    'total earnings': 77.2,
    'max earnings': 77.2,
  },
  {
    'sport': 'Football',
    'nation': 'United States',
    'total earnings': 126.8,
    'max earnings': 67.3,
  },
];

const athletesAggregatedByNone = [
  {'none': undefined, 'total earnings': 1059.4, 'max earnings': 285},
];

const totalAggregator = {
  name: 'total earnings',
  f: (x) => sum(x, (d) => d.earnings),
};
const maxAggregator = {
  name: 'max earnings',
  f: (x) => max(x, (d) => d.earnings),
};
const aggregators = [totalAggregator, maxAggregator];

// Tests

test('Test aggregate by one property', () => {
  expect(
    areObjectsEqual(
      aggregateBy(athletes, aggregators, 'sport'),
      athletesAggregatedBySport,
    ),
  ).toBeTruthy();
});

test('Test aggregate by two properties', () => {
  expect(
    areObjectsEqual(
      aggregateBy(athletes, aggregators, 'sport', 'nation'),
      athletesAggregatedBySportAndNation,
    ),
  ).toBeTruthy();
});

test('Test aggregate by missing (i.e. no aggregation) property', () => {
  expect(
    areObjectsEqual(
      aggregateBy(athletes, aggregators, 'none'),
      athletesAggregatedByNone,
    ),
  ).toBeTruthy();
});
