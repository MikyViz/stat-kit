const mean = require('./mean');
const { validate } = require('./utils');

function stddev(arr) {
  validate(arr, 'stddev');
  if (arr.length < 2) {
    throw new Error('stddev: array must have at least 2 elements');
  }
  const avg = mean(arr);
  const variance = arr.reduce((sum, val) => sum + (val - avg) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}
module.exports = stddev;
