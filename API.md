# Tiny-table API reference
## Introduction
Tiny-table is a small JavaScript library for performing data handling tasks on a data frame/data table. It is implemented as a module. A *data frame*/*data table* comprises a number of *observations* (think rows of a table) and *variables* (think columns of a table). Tiny-table works with a data frame / data table constructed as an array of JavaScript objects with consistent properties. For example, the following array is an example of a data frame/data table that describes the average monthly rainfall for two countries over three months. 
```javascript
const rainfall = [
  {country: 'England', month: 'Jan', inches: 3.27},
  {country: 'England', month: 'Feb', inches: 2.60},
  {country: 'Scotland', month: 'Jan', inches: 7.01},
  {country: 'Scotland', month: 'Fan', inches: 5.54},
];
```
## Principles
Tiny-table implements data *transformations*, which may be *applied* to a data table. An example of a transformation might be adding a column of data: we could *add* a column to our `rainfall` table that gives the average rainfall in millimetres instead of inches. Other example transformations might be be sorting the table from least to greatest rainfall, or aggregating  the total rainfall for each country. Any of these transformations could be applied to the table above, or indeed any other table with the same columns.

In addition to applying transformations to data in individual steps, Tiny-table allows one or more data transformations to be combined to create a more sophisticated transformation, called a *model*, which can then be applied to a data table in a single step. For example, suppose we wished to apply two data transformations *f* and *g* to a data table in succession; rather than applying *f*, and then taking the result and applying *g*, both transformations can be combined into a single model, and applied to our data in a single step. We can also keep this model, and apply it to other data.

## Some simple examples
### One transformation: sorting
Suppose we want to sort the data by rainfall, from least to greatest. We can create a model which implements a single [sort](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#sort) transformation like so:
```javascript
const m = tt.model().sort('inches'); // Creates a model, m
```
Now we can apply this model to our data by calling its method, [data](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#data), passing in our data to be transformed as an argument:
```javascript
const result = m.data(rainfall);

/* result = [
  { country: 'England', month: 'Feb', inches: 2.6 },
  { country: 'England', month: 'Jan', inches: 3.27 },
  { country: 'Scotland', month: 'Fan', inches: 5.54 },
  { country: 'Scotland', month: 'Jan', inches: 7.01 }
]*/
```
The newly-sorted data is returned; the data supplied to the model is always left analtered. We can now go on and apply the same model `m` to other data.

If the model is not needed again, then the construction and processing of data may be combined into a single statement:
```javascript
const result = tt.model().sort('inches').data(rainfall); // same result as earlier
```
### One transformation: adding a calculated column
In this example we will add a column for rainfall in millimetres, calculated for each row from the value of rainfall in inches. To do this we will call the [calc](https://github.com/stuwilmur/Tiny-table/blob/main/API.md#calc) transformation method:
```javascript
const m = tt.model()
  .calc()
  .called('millimetres')
  .formula((r) => r.inches * 25.4)
  .end()
  .data(rainfall);
```

### Two transformations
In this example we will apply two data transformations already seen:
1. add a column for rainfall calculated in millimetres;
2. sort the data by the new value of rainfall in millimetres.
Construction of models that apply multiple transformations is done by *chaining* methods:
```javascript
const result = model()
  .calc()
  .called('millimetres')
  .formula((r) => r.inches * 25.4)
  .end()
  .sort('millimetres')
  .data(rainfall);

  /* result = [
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
    month: 'Fan',
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

<a name="data" href = "#data"># </a>tt.model.*data*()

<a name="calc" href="#calc"># </a>tt.model.*calc*()

<a name="drop" href="#calc"># </a>tt.model.*drop*()

<a name="group" href="#calc"># </a>tt.model.*group*()

<a name="interp" href="#calc"># </a>tt.model.*interp*()

<a name="lump" href="#calc"># </a>tt.model.*lump*()

<a name="select" href="#calc"># </a>tt.model.*select*()

<a name="set" href="#calc"># </a>tt.model.*set*()

<a name="sort" href="#calc"># </a>tt.model.*calc*()

<a name="transform" href="#calc"># </a>tt.model.*transform*()



