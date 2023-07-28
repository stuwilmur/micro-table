# micro-table API reference
## Contents
- [Introduction](#introduction)
- [Principles](#principles)
- [Some simple examples](#some-simple-examples)
- [Model building syntax](#model-building-syntax)
- [API](#api)

## <a name="introduction" href = "#introduction"></a>Introduction
micro-table is a small JavaScript library for data handling using a data table. It is implemented as an ES2015 module. A *data table* (or data frame) comprises a number of *rows* correspondings to *observations*, and *columns* corresponding to variables. micro-table works with a data table constructed as an array of objects with consistent properties: all objects in the array must share exactly the same properties. Each object represents an observation; each property of one of these objects represents a variable.

The following array is an example of a data frame/data table that describes the average monthly rainfall for two countries over two months. 
```javascript
const rainfall = [
  {country: 'England', month: 'Jan', inches: 3.27},
  {country: 'England', month: 'Feb', inches: 2.60},
  {country: 'Scotland', month: 'Jan', inches: 7.01},
  {country: 'Scotland', month: 'Feb', inches: 5.54},
];
```
## <a name="principles" href = "#principles"></a>Principles
micro-table implements data *transformations*, which may be *applied* to a data table. An example transformation is adding a column of data: it is possible to *add* a column to our `rainfall` table that lists the average rainfall in units of millimetres, calculated from the value in inches. Other examples of transformations are 
- sorting the table from least to greatest rainfall;
- aggregating  the total rainfall for each country. 

Any of these transformations could be applied to the table above.

The module exports a single function, *model()*, which is used to create a model.

In addition to applying transformations to data in individual steps, micro-table allows one or more data transformations to be *combined* to create a *model*, which can then be applied to a data table in a single step. For example, suppose it is desired to apply two data transformations *f* and *g* to a data table in succession; rather than applying *f*, and then taking the result and applying *g*, both transformations can be combined into a single model, and applied to our data in a single step. This model may be retained for use, and applied to other data. This is analogous to the way in which two mathematical functions $f(x)$ and $g(x)$ may be *composed* to give a single function $h(x) = g(f(x))$.

micro table uses some ideas from *functional programming* (such as this idea of composing functions) which may be familiar. Another is the guarantee that a model will never mutate the data that is passed to it: it will return a new copy with the necessary transformations applied.

## <a name="some-simple-examples" href = "#some-simple-examples"></a>Some simple examples
### One transformation: sorting by one column
In this example the data is to be sorted by the values in the inches column, from least to greatest. A model may be created which implements a single [sort()](#sort) transformation like so:
```javascript
const m = model().sort().inc('inches').end(); // Creates a model, m, sorting on 'inches'
```
This model is applied to the data by calling one of its methods, [data()](#data), which accepts the data to be transformed as an argument:
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
const result3 = model().sort().inc('inches').end().data(rainfall); // gives same as result1
```
### One transformation: adding one calculated column
In this example a column will be added which lists rainfall in millimetres, calculated from the value of rainfall in inches. To do this the [calc()](#calc) transformation may be used:
```javascript
const result4 = model()
  .calc()
  .called('millimetres')
  .does((r) => r.inches * 25.4) // 1 inch = 25.4 mm
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
This example applies two data transformations already demonstrated:
1. add a column for rainfall calculated in millimetres;
2. sort the data by the new value of rainfall in millimetres.

Such a model that applies multiple transformations may be defined by *chaining* methods:
```javascript
const result5 = model()
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
Transformations are applied in the order that they are specified when defining a model: in this case, the new column is added first, and then the resulting table is sorted by this new column. In this example, reversing the order in which the transformations are added to construct the model would not work, as the `millimetres` column must exist before it can be used to sort the data. Remember, the input data is left unchanged by any model transformations.

Note: it is permissible to define a model without *any* transformations: such a model will apply the identity transformation, which returns the input data unchanged.

## <a name="model-building-syntax" href = "#model-building-syntax"></a>Model building syntax
As discussed, a model is created with [model()](#model) and applied using [data()](#data):
```javascript
const dataIn = [
  {x: 1, y: 4, z: 1}, // Some simple data
  {x: 2, y: 3, z: 0},
  {x: 3, y: 2, z: 1},
  {x: 4, y: 1, z: 0},
  ]; 
const model = model(); // Constructed without transformations: will do nothing
const dataOut = model.data(rainfall); // returns copy of dataIn
```
This model simply returns a copy of the input data unchanged.

A transformation is added to the model by calling the relevant transformation method of the model object:
```javascript
const model = model().drop('x') // will drop (delete) the 'x' column
```
Combining transformations is done by *chaining* method calls:
```javascript
const model1 = model().drop('x').group('z') // delete 'x' column, group by 'z' value
const model2 = model.drop('z') // adds a further transformation to delete 'z'
```
Transfromation methods do not mutate the model; they return a new model with the updated model. This means that in the previous example, `model1` is left unchanged by the call to *drop()* in the definition of `model2`.

Some transformation methods such as [drop()](#drop), [filter()](#filter), [group()](#group), [merge()](#merge), [select()](#select) and [transform()](#transform) take one or more arguments to specify how they work. For example, *select()* takes the name of each column to be selected:
```javascript
const result = model().select('x', 'y',).data(dataIn); // Selects columns 'x' and 'y'
```
Other transformations such as [calc()](#calc), [interp()](#interp), [const()](#const), [knit()](#knit), [reduce()](#reduce) and [sort()](#sort) do not take arguments; instead, their definition is built up in stages, where at each stage one piece of information is added to their definition. As an example, the [const()](#const) transformation will create a new column with a single fixed value in each row. The transformation requires:
- the column name
- the constant value

These are specified using two sub-methods [const.called()](#const.called) and [const.value()](#const.value):
```javascript
const model = model()
                .const()
                .called('w')
                .value(-1)
                .end();
```

The statement above defines a model which adds a new column `w` with the value -1 in every row. There are two things to note:
1. When transformations are built up in stages like this, the end of the stage is marked with a call to *end()*. 
2. The order of the stages is always unimportant. For example:
```javascript
const model = model()
                .const()
                .value(-1)
                .called('w')
                .end(); // defines exactly the same model as the previous example
/* result6 = 
[
  { x: 1, y: 4, z: 1, w: -1 },
  { x: 2, y: 3, z: 0, w: -1 },
  { x: 3, y: 2, z: 1, w: -1 },
  { x: 4, y: 1, z: 0, w: -1 }
]
*/
```

As well as chaining transformations within a model, we can chain whole models to create a new model which will apply each model in turn. This is done using the [add()](#add) method. For example, consider the following simple models: modelA which adds a constant column, and modelB which calculates a new column based on the new column:
```javascript
const modelA = model().const().called('b').value(1).end();
const modelB = model()
  .calc()
  .called('c')
  .does((r) => r.b * 2)
  .end();
```
The result of applying modelA followed by modelB may be calculated directly:
```javascript
const x = [{a:1}, {a:2}]
const result1 = modelB.data(modelA.data());
/*
result1 = 
[ { a: 1, b: 1, c: 2 }, { a: 3, b: 1, c: 2 } ]
*/
```
or instead by using [add()](#add) method as follows:
```javascript
const modelC = modelA.add(modelB);
const result2 = modelC.data(x);
/*
result2 = [ { a: 1, b: 1, c: 2 }, { a: 3, b: 1, c: 2 } ]
*/
``` 
## <a name="api" href = "#api"></a>API
### Creating models and applying data
<a name="model" href = "#model"># </a>**model**()

Returns a new model object, which implements the identity transformation (i.e., when applied to some data, returns a copy of the data unchanged).

<a name="data" href = "#data"># </a>*model*.**data**(table)

Returns the result of applying a model created using [model()](#model) to a data array, *table*. The input data in *table* is not mutated.

### Data transformations
* [calc()](#calc)
* [const()](#const)
* [drop()](#drop)
* [filter()](#filter)
* [group()](#group)
* [interp()](#interp)
* [knit()](#knit)
* [merge()](#merge)
* [reduce()](#reduce)
* [select()](#select)
* [sort()](#sort)
* [tidy()](#tidy)
* [transform()](#transform)

### Model transformations
* [add()](#add)

<a name="calc" href="#calc"># </a>*model*.**calc**()

Adds a calc transformation, whose behaviour is further defined by [calc.called()](#calc.called) and [calc.does()](#calc.does).

The calc transformation adds a variable (column) to the data table (i.e. to each object in the list, it adds a given property) which is calculated from data in the table. A calculated columnn may depend on data in the original table, or values of the newly-calculated column in previous rows.

<a name="calc.called" href="#calc.called"># </a>*model.calc*.**called**(*name*)

Takes a string *name* used to specify the name of the variable (column) being added.

<a name="calc.does" href="#calc.does"># </a>*model.calc*.**does**(*func*)

Defines the callback function *func*, used to calculate the value of the new variable. This callback is applied to each row consecutively, starting from the beginning of the table. The callback is of the form

**func**(*r, [getRow]*)

and should return a value. 
- The parameter *r* is the current row object;
- The parameter  *getRow* is a function object, which may be used to return a row object other than the current row. This function itself may be described as follows:

**getRow**(*n*)

The parameter *n* specifies the row to return by its position: a postive\[negative\] value of *n* specifies a row *n* places above\[below\] the current row. For example
- a value of n=1 returns the row immediately above the current row;
- a value of n=0 returns the current row;
- a value of n=-1 returns the row immediately below the current row.

No checking is performed on the value of *n*: if the corresponding row does not exist, then the function returns *undefined*.

<a name="calc.end" href="#calc.end"># </a>*model.calc*.**end**()

Ends the definition of the calc transformation.

<a name="const" href="#const"># </a>*model*.**const**()

Adds a const transformation, whose behaviour is further defined by [const.called()](#const.called) and [const.value()](#const.value).

The const transformation adds a variable (column) to the data table (i.e. to each object in the list, it adds a given property) with a single constant value.

<a name="const.called" href="#const.called"># </a>*model.const*.**called**(*name*)

Takes a string *name* used to specify the name of the variable (column) being added.

<a name="const.value" href="#const.value"># </a>*model.const*.**value**(*value*)

Takes a parameter *value* used to specify the constant value.

<a name="const.end" href="#const.end"># </a>*model.const*.**end**()

Ends the definition of the const transformation.

<a name="drop" href="#drop"># </a>*model*.**drop**(*property1, ... , propertyN*)

Drops columns (i.e. deletes variables) specified by the parameters *property1, ..., propertyN*.

<a name="filter" href="#filter"># </a>*model*.**filter**(*func*)

Adds a filter transformation, which filters rows using the callback filtering function *func*. Essentially, this simply applies the standard Array.func() method to the underlying data array.

<a name="group" href="#group"># </a>*model*.**group**(*property1, ..., propertyN*)

Reorders rows of the table such that they are grouped by *property1*, these groups being futher subgrouped by *property2* and so on. Note that groups are arranged in the order that order that each unique property value appears in the table.

<a name="knit" href="#knit"># </a>*model*.**knit**()

Adds a knit transformation, whose behaviour is further defined by [knit.with()](#knit.with) and [knit.match()](#knit.match).

Like the [merge](#merge) transformation, knit is used to combine incoming data (specified as a data table) with an existing table. However, rather than simply performing an operation like merge where additional columns are simply added to the existing table and row order is unchanged, knit allows individual rows of two tables to be spliced together, by matching rows that have a matching property value.

For example, suppose we have the following two tables, containing different data for the same three people:

```javascript
const forenames = [
  {id : 0, forename : 'Alice'},
  {id : 1, forename : 'Alice'},
  {id : 2, forename : 'Bob'}
]

const surnames = [
  {id : 2, surname : 'Singh'},
  {id : 0, surname : 'Zonn'},
  {id : 1, surname : 'Jones'}
]
```

We can use the knit transormation to combine these two tables by joining together rows which have a matching `id` property:

```javascript
const combinted = model().knit().with(surnames).match('id').end().data(forenames);
/*
combined = [
  { id: 0, forename: 'Alice', surname: 'Zonn' },
  { id: 1, forename: 'Alice', surname: 'Jones' },
  { id: 2, forename: 'Bob', surname: 'Singh' }
];
*/
```

There is a simple process for determining how the knit transformation is applied. For each row in the existing (left) table, the *first* matching row is sought in the incoming (right) table, i.e. the first row with a matching specified property value. If no matching row is found, the current left row is ignored entirely and the knit process moves to the next row in the existing table.

When a pair of matching rows is found, they are merged. If the incoming (right) table has properties that share names with those of the existing (left) table, then the values in the incoming rows 'win', i.e. they replace those in the existing table. 

<a name="knit.with" href="#knit.with"># </a>*model.knit*.**with**(*newColumns*)

Specifies the incoming data table.

<a name="knit.match" href="#knit.match"># </a>*model.knit*.**match**(*property*)

Specifies the property to use to perform the row matching.

<a name="merge" href="#merge"># </a>*model*.**merge**(*newColumns*)

Adds a merge transformation, which will merge the incoming data specified by *newColumns* (itself a data table) into the existing table. This is equivalent to adding the columns of *newColumns* into the current table. 

Merging is done row by row: if either table has more rows than the other, then these additional rows are ignored. For example, consider the following merge, where the exisiting and incoming tables have three and two rows, respectively:
```javascript
const existing = [
  {a: 1}, 
  {a: 2}, 
  {a: 3}
  ];
const incoming = [
  {b: 1}, 
  {b: 2}
  ];
const result = model().merge(incoming).data(existing);
/*
result = [ 
  { a: 1, b: 1 }, 
  { a: 2, b: 2 } ];
*/
```
If the incoming table has columns that share names with those the existing table, then the values in the incoming columns 'win', i.e. they replace those in the existing table. Consider the following merge, where both tables share the column *b*:
```javascript
const existing = [
  {a: 1, b:2}, 
  {a: 1, b:2}, 
  {a: 1, b:2}
  ];
const incoming = [
  {c: 3, b:4}, 
  {c: 3, b:4}, 
  {c: 3, b:4}
  ];
const result = model().merge(incoming).data(existing);
/*
result = [ 
  { a: 1, b: 4, c: 3 }, 
  { a: 1, b: 4, c: 3 }, 
  { a: 1, b: 4, c: 3 } ];
*/
```

<a name="interp" href="#interp"># </a>*model*.**interp**()

Adds an interp transformation, whose behaviour is further defined by [interp.x()](#interp.x), [interp.y()](#interp.y), [interp.groupBy()](#interp.groupby) and [interp.noExtrap()](#interp.noExtrap).

The interp transformation interpolates missing values, being entries that are `NaN` or `null`. Simple linear interpolation is used between two extant data points, whereas linear extrapolation is used beyond the range of available data by default.

<a name="interp.x" href="#interp.x"># </a>*model.interp*.**x**(*property*)

Specificies the index property (i.e. the *x*-value) on which to interpolate, using the parameter *property*. For example, consider some simple time series data:
```javascript
const series = [
  {year:2000, population: 100000},
  {year:2010, population: null},
  {year:2020, population: 200000}
]
```
To interpolate population for the missing year 2010, the index property specified as a parameter would be `'year'`.

<a name="interp.y" href="#interp.y"># </a>*model.interp*.**y**(*property1, ..., propertyN*)

Specificies the result properties (i.e. the *y*-values) to interpolate, using the parameters *property1, ..., propertyN*. For example, consider some simple time series data:
```javascript
const series = [
  {year:2000, population: 100000},
  {year:2010, population: null},
  {year:2020, population: 200000}
]
```
To interpolate population for the missing year 2010, the property specified as a parameter would be `'population'`.

<a name="interp.groupby" href="#interp.groupby"># </a>*model.interp*.**groupBy**(*property1, ..., propertyN*)

Specifies grouping properties, *property1, ..., propertyN* by which the data will be grouped ready for interpolation. This is useful for flat data which otherwise describes nested series. As an example, consider the following time series data, typical of the flat data structure often encountered:
```javascript
const series = [
  {year:2000, country : 'Brazil', gdp: 655.4},
  {year:2000, country : 'China',  gdp: 1211},
  {year:2001, country : 'Brazil', gdp: NaN},
  {year:2001, country : 'China',  gdp: 1339},
  {year:2002, country : 'Brazil', gdp: 509.8},
  {year:2002, country : 'China',  gdp: 1471},
]
```
The data defines a time series for each country. To interpolate correctly within each time series, interp.*groupBy()* must be called with the parameter `'country'`.

<a name="interp.noExtrap" href="#interp.noExtrap"># </a>*model.interp*.**noExtrap**()

Specifies that extrapolation should *not* be used beyond the range of the available data.

<a name="interp.end" href="#interp.end"># </a>*model.interp*.**end**()

Ends the definition of the interp transformation.

<a name="reduce" href="#reduce"># </a>*model*.**reduce**()

Adds a reduce transformation, whose behaviour is further defined by [reduce.add()](#reduce.add), [reduce.add.called()](#reduce.add.called), [reduce.add.does()](#reduce.add.does) and [reduce.add.groupBy()](#reduce.add.groupBy).

A reduce transformation is used to reduce the data to a set of aggregate properties. Examples of aggregate properties would be a sum or an average of a column. Aggregate properties may be calculated across all rows of the table, or alternatively, the data may be grouped and individual aggregates calculated for each group.

The transformation returns an array comprising an object for each group; each object has a property for each aggregator defined, as well as properties for each key that was used to group the data.

<a name="reduce.add" href="#reduce.add"># </a>*model.reduce*.**add**()

Adds a new aggregate property, which is further specified by [reduce.add.called()](#reduce.add.called) and [reduce.add.does()](#reduce.add.does).

Multiple aggregate properties may be defined: the result of the reduce transformation will be an array of objects, whose properties are the aggregate properties.

<a name="reduce.add.called" href="#reduce.add.called"># </a>*model.reduce.add*.**called**(*name*)

Takes a string *name* used to specify the property name of the aggregate property.

<a name="reduce.add.does" href="#reduce.add.does"># </a>*model.reduce.add*.**does**(*func*)

Takes a function *func* to be used to reduce the data to the aggregate value. The function takes the form

**func**(*group*)

where *group*. is an array comprising the current group being aggregated. If no grouping is being performed, *group* will be the entire table.

<a name="reduce.add.end" href="#reduce.add.end"># </a>*model.reduce.add*.**end**()

Ends specification of the aggregator.

<a name="reduce.groupby" href="#reduce.groupby"># </a>*model.reduce*.**groupBy**(*property1, ..., propertyN*)

Specifies grouping properties, *property1, ..., propertyN* by which the data will be grouped prior to reduction. This is useful for flat data which otherwise describes nested series. An aggregate object will be created for each group.

<a name="reduce.end" href="#reduce.end"># </a>*model.reduce*.**end**()

End specification of the reduce transformation.

<a name="select" href="#select"># </a>*model*.**select**(*property1, ... propertyN*)

Selects columns specified by the parameters *property1, ..., propertyN* from the table. The resulting table will feature the selected columns in the order that they are specified, rather than their order in the input table.

<a name="sort" href="#sort"># </a>*model*.**sort**()

Adds a sort transformation, whose behaviour is further defined by [sort.inc()](#sort.inc) and [sort.dec()](#sort.dec). 

- Sorts are built up in stages, at each stage specifying the property (column) on which to sort and whether the sort is *increasing* or *decreasing*. As many stages may be added as there are properties. Subsequent sort stages will apply a sort **within each group that the previous sort considered equal***. As an example, consider the following data:
```javascript
const unsorted = [
    {n: 1, a: 2, b: 2},
    {n: 2, a: 3, b: 2},
    {n: 3, a: 1, b: 2},
    {n: 4, a: 2, b: 3},
    {n: 5, a: 3, b: 3},
    {n: 6, a: 1, b: 3},
    {n: 7, a: 2, b: 1},
    {n: 8, a: 3, b: 1},
    {n: 9, a: 1, b: 1},
  ];
```
Sorting by `a` then `b` will sort by column a, then sort *within each of these groups* by `b`:
```javascript
const sorted = model().sort().inc('a').inc('b').end().data(data);
/*
sorted = [
  { n: 9, a: 1, b: 1 },
  { n: 3, a: 1, b: 2 },
  { n: 6, a: 1, b: 3 },
  { n: 7, a: 2, b: 1 },
  { n: 1, a: 2, b: 2 },
  { n: 4, a: 2, b: 3 },
  { n: 8, a: 3, b: 1 },
  { n: 2, a: 3, b: 2 },
  { n: 5, a: 3, b: 3 }
];
*/
```


<a name="sort.inc" href="#sort.inc"># </a>*model.sort*.**inc**(*property*)

Adds a sort, sorting by *increasing* value of the specified *property*.

<a name="sort.dec" href="#sort.dec"># </a>*model.sort*.**dec**(*property*)

Adds a sort, sorting by *decreasing* value of the specified *property*.

<a name="sort.end" href="#sort.end"># </a>*model.sort*.**end**()

Ends the definition of the sort transformation.

<a name="tidy" href="#tidy"># </a>*model*.**tidy**()

Adds a tidy transformation, whose behaviour is further defined by [tidy.collapse()](#tidy.collapse), [tidy.to()](#tidy.to) and [tidy.quantity()](#tidy.quantity).

The tidy transformation is used to transform data that includes more than one observation per row, into *tidy* data featuring a single observation row. For example, consider the following data describing the GDP of two countries across several years:
```javascript
const untidy = [
  {year:2000, 'Brazil' : 655.4, 'China': 1211},
  {year:2001, 'Brazil' : NaN, 'China' : 1339},
  {year:2002, 'Brazil' : 509.8, 'China' : 1471},
];
```
This data is untidy since each row includes two observations. The tidy transformation may be used as follows with this data:
```javascript
const tidy = model()
             .tidy()
             .collapse('Brazil', 'China')
             .to('country')
             .quantity('gdp')
             .end()
             .data(untidy)
/*
tidy = [
  {year:2000, country : 'Brazil', gdp: 655.4},
  {year:2000, country : 'China',  gdp: 1211},
  {year:2001, country : 'Brazil', gdp: NaN},
  {year:2001, country : 'China',  gdp: 1339},
  {year:2002, country : 'Brazil', gdp: 509.8},
  {year:2002, country : 'China',  gdp: 1471},
]
*/
```
<a name="tidy.collapse" href="#tidy.collapse"># </a>*model.tidy*.**collapse**(*property1, ..., propertyN*)

Collapses a column or columns, specified by *property1*, ..., *propertyN*.

<a name="tidy.to" href="#tidy.to"># </a>*model.tidy*.**to**(*name*)

Specifies the new column name used to identify the collapsed columns.

<a name="tidy.quantity" href="#tidy.quantity"># </a>*model.tidy*.**quantity**(*name*)

Specifies the column name for the quantity that is described by the observations.

<a name="transform" href="#transform"># </a>*model*.**transform**(*func*)

Adds a user-defined transformation which will be applied to the table, specified by the function *func*, which has the form

**func**(*table*)

where *table* is the table object (a JavaScript array of simple objects).

<a name="add" href="#add"># </a>*modelA*.**add**(*modelB*)

Returns a new model, whose data transformation is the composition of the transformation of *modelB* with that of *modelA*. The result of `modelB.data(modelA.data(x))` will be equivalent to `modelA.add(modelB).data(x)`.


