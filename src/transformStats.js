/**
 * Transform statistics (mean, standard deviation, variance) by applying
 * linear transformation: Y = scale * X + shift
 * 
 * @param {Object} stats - Object containing original statistics
 * @param {number} stats.mean - Original mean
 * @param {number} stats.stddev - Original standard deviation
 * @param {number} stats.variance - Original variance
 * @param {Object} transform - Transformation parameters
 * @param {number} [transform.shift=0] - Amount to shift the data
 * @param {number} [transform.scale=1] - Amount to scale the data
 * @returns {Object} Object with transformedMean, transformedStddev, transformedVariance
 * 
 * @example
 * // Convert from Celsius to Fahrenheit (F = 1.8 * C + 32)
 * const celsiusStats = { mean: 20, stddev: 5, variance: 25 };
 * const fahrenheitStats = transformStats(celsiusStats, { scale: 1.8, shift: 32 });
 * // Result: { transformedMean: 68, transformedStddev: 9, transformedVariance: 81 }
 */
function transformStats({ mean, stddev, variance }, { shift = 0, scale = 1 } = {}) {
  if (typeof mean !== 'number' || typeof stddev !== 'number' || typeof variance !== 'number') {
    throw new Error('mean, stddev, and variance must be numbers');
  }

  if (typeof shift !== 'number' || typeof scale !== 'number') {
    throw new Error('shift and scale must be numbers');
  }

  const transformedMean = scale * mean + shift;
  const transformedStddev = Math.abs(scale) * stddev;
  const transformedVariance = scale ** 2 * variance;

  return {
    transformedMean,
    transformedStddev,
    transformedVariance
  };
}

module.exports = transformStats;
