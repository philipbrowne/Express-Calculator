const { mean, median, mode } = require('./helpers');

describe('mean', () => {
  test('should return the mean from an array', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });
  test('should return the mean from an array of negative numbers', () => {
    expect(mean([-1, -2, -3, -4, -5])).toBe(-3);
  });
});
describe('median', () => {
  test('should return the median from an array', () => {
    expect(median([2, 4, 6, 8, 10])).toBe(6);
  });
  test('should return the median from an array of negative numbers', () => {
    expect(median([-1, -2, -3, -4, -5])).toBe(-3);
  });
});
describe('mode', () => {
  test('should return a single mode from an array', () => {
    expect(mode([1, 2, 3, 3, 4, 5])).toBe(3);
  });
  test('should return an array of numbers if there are two numbers with the same quantity in array', () => {
    //   Using Equal instead of Be because Different Reference in Array
    expect(mode([1, 2, 3, 3, 4, 4, 5])).toEqual([3, 4]);
  });
});
