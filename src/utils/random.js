function findUniqueNumbers(initialArray, inputs) {
  const finalArray = [...initialArray];
  const repeatedNumbers = [];
  const inputArray = inputs.split(",");
  inputArray.forEach(input => {
    const num = input.trim();
    if (num.indexOf("-") === 0) {
      const numberInput = parseInt(num, 10);
      if (initialArray.indexOf(numberInput) > -1) {
        repeatedNumbers.push(numberInput);
      } else {
        finalArray.push(numberInput);
      }
    } else {
      const [low, up] = input.split("-");
      const lower = parseInt(low.trim(), 10);
      const upper = parseInt(up.trim(), 10);
      for (let i = lower; i <= upper; i++) {
        const numberInput = parseInt(i, 10);
        if (initialArray.indexOf(numberInput) > -1) {
          repeatedNumbers.push(numberInput);
        } else {
          finalArray.push(numberInput);
        }
      }
    }
  });
  return [
    finalArray.sort((a, b) => a - b),
    repeatedNumbers.sort((a, b) => a - b)
  ];
}
