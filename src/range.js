const { validate } = require('./utils');
const quantile = require('./quantile');

function basicRange(arr) {
  validate(arr, 'basicRange');
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return max - min;
}

function percentileRange(arr, lower = 0.05, upper = 0.95) {
  validate(arr, 'percentileRange');
  if (arr.length < 2) {
    throw new Error('percentileRange: array must have at least 2 elements');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  const qLow = quantile(sorted, lower);
  const qHigh = quantile(sorted, upper);
  return qHigh - qLow;
}

function iqrRange(arr) {
  return percentileRange(arr, 0.25, 0.75);
}

function stddevRange(arr, mean, stddev, k = 2) {
  if (typeof mean !== 'number' || typeof stddev !== 'number' || typeof k !== 'number') {
    throw new TypeError('stddevRange: mean, stddev, and k must be numbers');
  }
  return {
    lower: mean - k * stddev,
    upper: mean + k * stddev
  };
}

module.exports = {
  basicRange,
  iqrRange,
  percentileRange,
  stddevRange
};
