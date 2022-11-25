# Tiny-table API reference
## Introduction
Tiny-table is a small JavaScript library for performing data handling tasks on a dataframe/datatable. It is implemented as a module. A dataframe/datatable comprises a number of observations (think rows of a table) and a number of variables (columns of a table). Tiny-table works with a dataframe constructed as an array of JavaScript objects with consistent properties. For example, the following array is an example of a dataframe 
```
const rainfall = [
  {country: 'England', month: 'Jan', inches: 3.27},
  {country: 'England', month: 'Feb', inches: 2.60},
  {country: 'Scotland', month: 'Jan', inches: 7.01},
  {country: 'Scotland', month: 'Fan', inches: 5.54},
];
```


