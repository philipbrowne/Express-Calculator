const mean = (arr) => {
  const total = arr.reduce((a, b) => a + b);
  return total / arr.length;
};

//#Source https://bit.ly/2neWfJ2
const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//#Source https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
const mode = (numbers) => {
  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  let modes = [],
    count = [],
    i,
    number,
    maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }
  if (modes.length <= 1) {
    return parseInt(modes);
  }
  return modes;
};

module.exports = { mean: mean, median: median, mode: mode };
