const { validate } = require('./utils');

function mean(arr) {
  validate(arr, 'mean');
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}
module.exports = mean;
