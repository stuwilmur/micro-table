export function mergeTables(table1, table2) {
  return table1.slice(0, table2.length).map((x, i) => {
    return {
      ...x,
      ...table2[i],
    };
  });
}
