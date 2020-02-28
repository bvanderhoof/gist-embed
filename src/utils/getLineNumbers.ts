function getLineNumbers(
  lineRangeString: string,
  totalLines?: number,
): Array<number> {
  const lineNumbers: number[] = [];
  // lineRangeString can be 1,2,3 or 1-4,5
  // Dash supports the range, commas are specfic line numbers
  lineRangeString.split(',').forEach((line: string) => {
    const range = line.split('-');
    const start = parseInt(range[0], 10);
    let end = parseInt(range[1], 10);
    // If this is a range, push the numbers inclusive in that range
    if (range.length === 2) {
      // If this is of the format "7-" with no end range, we set our end range to the totalLines param. totalLines defines how many lines
      // are in the gist
      if (line[line.length - 1] === '-' && totalLines != null) {
        end = totalLines;
      }
      for (let i = start; i <= end; i++) {
        lineNumbers.push(i);
      }
    }
    // If it's just a single line number, push it
    else if (range.length === 1) {
      lineNumbers.push(parseInt(range[0], 10));
    }
  });
  return lineNumbers;
}

export default getLineNumbers;
