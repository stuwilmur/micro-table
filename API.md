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
Tiny-table allows you to select data *transformations*, which will be *applied* to a *data table*. An example of a transformation might be adding a column of data; we could *add* a column to our `rainfall` table that gives the average rainfall in millimetres instead of inches. Other example transformations might be be sorting the table from least to greatest rainfall, or aggregating  the total rainfall for each country. Any of these transformations could be applied to the table above, or indeed any other table with the same columns.

In addition to applying transformations to data in individual steps, Tiny-table allows one or more data transformations to be combined to create a more sophisticated transformation, called a *model*, which can then be applied to a data table in a single step. For example, suppose we wished to apply two data transformations: 
1. add a column for rainfall calculated in millimetres;
2. aggregate the data by calculating the total rainfall for each country, in both inches and millimetres
These two transformations can be combined into a single model, and applied to our data (or retained and applied to other similar data).

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
<a name="model" href = "#model"># </a>*model*()

<a name="data" href = "#data"># </a>model.*data*()

<a name="calc" href="#calc"># </a>model.*calc*()

<a name="drop" href="#calc"># </a>model.*drop*()

<a name="group" href="#calc"># </a>model.*group*()

<a name="interp" href="#calc"># </a>model.*interp*()

<a name="lump" href="#calc"># </a>model.*lump*()

<a name="select" href="#calc"># </a>model.*select*()

<a name="set" href="#calc"># </a>model.*sec*()

<a name="sort" href="#calc"># </a>model.*calc*()

<a name="transform" href="#calc"># </a>model.*transform*()



