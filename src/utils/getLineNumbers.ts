function getLineNumbers(lineRangeString: string) {
  const lineNumbers: number[] = [];

  // lineRangeString can be 1,2,3 or 1-4,5
  // Dash supports the range, commas are specfic line numbers
  lineRangeString.split(',').forEach((line: string) => {
    const range = line.split('-');
    // If this is a range, push the numbers inclusive in that range
    if (range.length === 2) {
      for (let i = parseInt(range[0], 10); i <= parseInt(range[1], 10); i++) {
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
