# Tiny-table API reference
## Introduction
Tiny-table is a small JavaScript library for performing data handling tasks on a data table. It is implemented as an ES2015 module. A *data table* (equivalently referred to as a data frame) comprises a number of *observations* (think rows of a table) and *variables* (think columns of a table). Tiny-table works with a data table constructed as an array of JavaScript objects with consistent properties (i.e. all objects in the array share exactly the same properties). Each array element is an object which represents an observation; each property of one of these objects represents a variable. 

As an example, the following array is an example of a data frame/data table that describes the average monthly rainfall for two countries over three months. 
```javascript
const rainfall = [
  {country: 'England', month: 'Jan', inches: 3.27},
  {country: 'England', month: 'Feb', inches: 2.60},
  {country: 'Scotland', month: 'Jan', inches: 7.01},
  {country: 'Scotland', month: 'Feb', inches: 5.54},
];
```
## Principles
Tiny-table implements data *transformations*, which may be *applied* to a data table. An example transformation is adding a column of data. One can *add* a column to our `rainfall` table that calculates the average rainfall in units of millimetres from the value in inches. Other examples of transformations are 
- sorting the table from least to greatest rainfall
- aggregating  the total rainfall for each country. 
Any of these transformations could be applied to the table above.

In addition to applying transformations to data in individual steps, Tiny-table allows one or more data transformations to be combined to create a *model*, which can then be applied to a data table in a single step. For example, suppose it is desired to apply two data transformations *f* and *g* to a data table in succession; rather than applying *f*, and then taking the result and applying *g*, both transformations can be combined into a single model, and applied to our data in a single step. This model may be retained for use, and applied to other data.

Tiny table uses some idea functional programming that may be familiar. For example, a model will never mutate the data that is passed to it: it will return a new copy with the necessary transformations applied.

## Some simple examples
### One transformation: sorting by one column
Suppose it is desired to sort the data by rainfall, from least to greatest. A model may be created which implements a single [sort](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#sort) transformation like so:
```javascript
const m = tt.model().sort().inc('inches').end(); // Creates a model, m, sorting on 'inches'
```
This model is applied to the data by calling its method, [data](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#data), passing in our data to be transformed as an argument:
```javascript
const result1 = m.data(rainfall);

/* 
result1 = [
  { country: 'England', month: 'Feb', inches: 2.6 },
  { country: 'England', month: 'Jan', inches: 3.27 },
  { country: 'Scotland', month: 'Feb', inches: 5.54 },
  { country: 'Scotland', month: 'Jan', inches: 7.01 }
]
*/
```
The newly-sorted data is returned: the data supplied to the model is always left analtered. This model `m` may now be applied to other data:
```javascript
const rainfall2 = [
  {country: 'Wales', month: 'Jan', inches: 6.11},
  {country: 'Wales', month: 'Feb', inches: 4.74},
  {country: 'Wales', month: 'Mar', inches: 4.07},
];
const result2 = m.data(rainfall2);

/*
result2 = [
  { country: 'Wales', month: 'Mar', inches: 4.07 },
  { country: 'Wales', month: 'Feb', inches: 4.74 },
  { country: 'Wales', month: 'Jan', inches: 6.11 }
]
*/
```
If the model is not needed again, then the construction and processing of data may be combined into a single statement:
```javascript
const result3 = tt.model().sort().inc('inches').end().data(rainfall); // gives same as result1
```
### One transformation: adding one calculated column
In this example a column will be added giving rainfall in millimetres, calculated for each row from the value of rainfall in inches. To do this the [calc](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc) transformation method is called:
```javascript
const result4 = tt.model()
  .calc()
  .called('millimetres')
  .does((r) => r.inches * 25.4)
  .end()
  .data(rainfall);
  
  /* 
  result4 = [
  {
    country: 'England',
    month: 'Jan',
    inches: 3.27,
    millimetres: 83.05799999999999
  },
  {
    country: 'England',
    month: 'Feb',
    inches: 2.6,
    millimetres: 66.03999999999999
  },
  {
    country: 'Scotland',
    month: 'Jan',
    inches: 7.01,
    millimetres: 178.05399999999997
  },
  {
    country: 'Scotland',
    month: 'Feb',
    inches: 5.54,
    millimetres: 140.71599999999998
  }
]
*/
```

### Two transformations: adding one calculated column and sorting by one column
This example applies two data transformations already seen:
1. add a column for rainfall calculated in millimetres;
2. sort the data by the new value of rainfall in millimetres.

Construction of models that apply multiple transformations is done by *chaining* transformations when defining a model:
```javascript
const result5 = tt.model()
  .calc()
  .called('millimetres')
  .does((r) => r.inches * 25.4)
  .end()
  .sort()
  .inc('millimetres')
  .end()
  .data(rainfall);

  /*
  result5 = [
  {
    country: 'England',
    month: 'Feb',
    inches: 2.6,
    millimetres: 66.03999999999999
  },
  {
    country: 'England',
    month: 'Jan',
    inches: 3.27,
    millimetres: 83.05799999999999
  },
  {
    country: 'Scotland',
    month: 'Feb',
    inches: 5.54,
    millimetres: 140.71599999999998
  },
  {
    country: 'Scotland',
    month: 'Jan',
    inches: 7.01,
    millimetres: 178.05399999999997
  }
]*/
```
Transformations are applied in the order that they are specified when defining a model: in this case, the new column is added first, and then the resulting table is sorted by this new column. In this example, reversing the order would not work, as the `millimetres` column must exist before it can be used to sort the data. Remember, the input data is left unchanged by any model transformations.

Note: it is permissible to define a model without *any* transformations: such a model will apply the identity transformation, which returns the input data unchanged.

## Model building syntax
As discussed, a model is created with [model](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#model) and applied using [data](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#data):
```javascript
const dataIn = [{x: 1, y = 4, z = 1}, {x: 2, y = 3, z = 0}, {x: 3, y = 2, z = 1}, {x: 4, y = 1, z = 0}]; // Some simple data
const model = tt.model(); // Constructed without transformations: will do nothing
const dataOut = model.data(rainfall); // returns copy of dataIn
```
This model simply returns a copy of the input data left unchanged.

Adding a transformation to the model is done by calling the transformation method of the model object:
```javascript
const model = tt.model().drop('x') // will delete the 'x' column
```
Combining transformations is done by *chaining* method calls:
```javascript
const model = tt.model().drop('x').group('z') // delete 'x' column, group by 'z' value
const mode2 = model.drop('z') // adds a further transformation to delete 'z'
```

Some transformation methods such as [drop](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#drop), [group](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#group), [select](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#select) and [transform](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#transform) take one or more arguments to specify how they work. For example, `select()` takes the name of each column to be selected:
```javascript
const result = tt.model().select('x', 'y',).data(dataIn); // Selects columns 'x' and 'y'
```
Other transformations such as [calc](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc), [interp](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#interp), [lump](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#lump), [set](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#set) and [sort](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#sort) do not take arguments; instead, their definition is built up in stages, where at each stage one piece of information is added to their specification. As an example, the [set](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#set) transformation will create a new column with a single fixed value in each row. The transformation requires:
- the column name
- the value
These are specified using two sub-methods of `calc()`: `calc().called()` and `calc().value()`, respectively:
```javascript
const model = tt.model()
                .set()
                .called('w')
                .value(-1)
                .end();
```
The statement above defines a model which adds a new column `w` with the value -1 in every row. There are two things to note:
1. When transformations are built up in stages like this, the end of the information supplied is marked with a call to `end()`. 
2. The order of the stages is always unimportant. For example:
```javascript
const model = tt.model()
                .set()
                .value(-1)
                .called('w')
                .end(); // defines exactly the same model as the previous example
```

## Data transformations
* [calc](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc)
* [drop](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#drop)
* [group](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#group)
* [interp](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#interp)
* [lump](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#lump)
* [select](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#select)
* [set](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#set)
* [sort](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#sort)
* [transform](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#transform)

## API
<a name="model" href = "#model"># </a>tt.*model*()
Returns a new model object, which implements the identity transformation (i.e., when applied to some data, returns a copy of the data unchanged).
<a name="data" href = "#data"># </a>tt.model().*data*(table)
Returns the result of applying a model created using `tt.model()` to some data, `table`. The input data in `table` is not mutated.
<a name="calc" href="#calc"># </a>tt.model().*calc*()
Starts the definition of the calc transformation, whose behaviour is further defined by [calc().called()](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc.called) and [calc().does()](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc.does).

The calc transformation adds a column to the data table (i.e. to each object in the list, it adds a given property) which is calculated from data in the table. A calculated columnn may depend on data in the original table, or values of the newly-calculated column in previous rows.
<a name="calc.called" href="#calc.called"># </a>tt.model().calc().*called*()
<a name="calc.does" href="#calc.does"># </a>tt.model().calc().*does*()
<a name="drop" href="#drop"># </a>tt.model().*drop*()
<a name="group" href="#group"># </a>tt.model().*group*()
<a name="interp" href="#interp"># </a>tt.model().*interp*()
<a name="lump" href="#lump"># </a>tt.model().*lump*()
<a name="select" href="#select"># </a>tt.model().*select*()
<a name="set" href="#set"># </a>tt.model().*set*()
<a name="sort" href="#sort"># </a>tt.model().*calc*()
<a name="transform" href="#transform"># </a>tt.model().*transform*()



