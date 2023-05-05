export function intersectTables(left, right, matchProperty) {
  const result = [];
  left.forEach((leftRow) => {
    const firstMatchingRightRow = right.find(
      (rightRow) => rightRow[matchProperty] == leftRow[matchProperty],
    );
    if (firstMatchingRightRow != undefined) {
      result.push({...leftRow, ...firstMatchingRightRow});
    }
  });
  return result;
}
