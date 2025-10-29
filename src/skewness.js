const mean = require('./mean');
const stddev = require('./stddev');
const { validate } = require('./utils');

function skewness(arr) {
  validate(arr, 'skewness');
  const n = arr.length;
  if (n < 3) {
    throw new Error('skewness: array must have at least 3 elements');
  }

  const avg = mean(arr);
  const sd = stddev(arr);

  const sumCubed = arr.reduce((sum, val) => {
    return sum + Math.pow((val - avg) / sd, 3);
  }, 0);

  return (n / ((n - 1) * (n - 2))) * sumCubed;
}
module.exports = skewness;
