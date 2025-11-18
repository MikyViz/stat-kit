const mean = require('./mean');
const stddev = require('./stddev');
const { validate } = require('./utils');

/**
 * Calculate z-scores for all values in an array
 * @param {number[]} arr - Array of numbers
 * @returns {number[]} Array of z-scores
 */
function zScores(arr) {
  validate(arr, 'zScores');
  const avg = mean(arr);
  const sd = stddev(arr);
  return arr.map(val => (val - avg) / sd);
}

/**
 * Calculate z-score (standard score) for a single value
 * @param {number} x - The value to transform
 * @param {number} mean - The mean of the distribution
 * @param {number} stddev - The standard deviation of the distribution
 * @returns {number} The z-score
 * 
 * @example
 * // Calculate z-score for value 85 in a distribution with mean 70 and stddev 10
 * const z = zTransform(85, 70, 10); // Returns 1.5
 */
function zTransform(x, mean, stddev) {
  if (typeof x !== 'number' || typeof mean !== 'number' || typeof stddev !== 'number') {
    throw new Error('All inputs must be numbers');
  }
  if (stddev === 0) {
    throw new Error('Standard deviation cannot be zero');
  }
  return (x - mean) / stddev;
}

module.exports = zScores;
module.exports.zTransform = zTransform;
