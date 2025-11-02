const { validate } = require('./utils');

// Standard Normal Distribution Z-Table
// Values represent the cumulative probability from -∞ to z
// Table covers z-scores from -3.9 to 3.9 in increments of 0.01
const Z_TABLE_DATA = {
  // Negative z-scores
  '-3.9': 0.00005, '-3.8': 0.00007, '-3.7': 0.00011, '-3.6': 0.00016, '-3.5': 0.00023,
  '-3.4': 0.00034, '-3.3': 0.00048, '-3.2': 0.00069, '-3.1': 0.00097, '-3.0': 0.00135,
  '-2.9': 0.00187, '-2.8': 0.00256, '-2.7': 0.00347, '-2.6': 0.00466, '-2.5': 0.00621,
  '-2.4': 0.00820, '-2.3': 0.01072, '-2.2': 0.01390, '-2.1': 0.01786, '-2.0': 0.02275,
  '-1.9': 0.02872, '-1.8': 0.03593, '-1.7': 0.04457, '-1.6': 0.05480, '-1.5': 0.06681,
  '-1.4': 0.08076, '-1.3': 0.09680, '-1.2': 0.11507, '-1.1': 0.13567, '-1.0': 0.15866,
  '-0.9': 0.18406, '-0.8': 0.21186, '-0.7': 0.24196, '-0.6': 0.27425, '-0.5': 0.30854,
  '-0.4': 0.34458, '-0.3': 0.38209, '-0.2': 0.42074, '-0.1': 0.46017, '-0.0': 0.50000,
  // Positive z-scores
  '0.0': 0.50000, '0.1': 0.53983, '0.2': 0.57926, '0.3': 0.61791, '0.4': 0.65542,
  '0.5': 0.69146, '0.6': 0.72575, '0.7': 0.75804, '0.8': 0.78814, '0.9': 0.81594,
  '1.0': 0.84134, '1.1': 0.86433, '1.2': 0.88493, '1.3': 0.90320, '1.4': 0.91924,
  '1.5': 0.93319, '1.6': 0.94520, '1.7': 0.95543, '1.8': 0.96407, '1.9': 0.97128,
  '2.0': 0.97725, '2.1': 0.98214, '2.2': 0.98610, '2.3': 0.98928, '2.4': 0.99180,
  '2.5': 0.99379, '2.6': 0.99534, '2.7': 0.99653, '2.8': 0.99744, '2.9': 0.99813,
  '3.0': 0.99865, '3.1': 0.99903, '3.2': 0.99931, '3.3': 0.99952, '3.4': 0.99966,
  '3.5': 0.99977, '3.6': 0.99984, '3.7': 0.99989, '3.8': 0.99993, '3.9': 0.99995
};

// More precise calculation using the error function approximation
function normalCDF(z) {
  // Abramowitz and Stegun approximation (error < 1.5e-7)
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  
  // Constants for the approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const t = 1 / (1 + p * x);
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1 + sign * erf);
}

// Inverse normal CDF using rational approximation
function inverseNormalCDF(p) {
  if (p <= 0 || p >= 1) {
    throw new Error('Probability must be between 0 and 1 (exclusive)');
  }
  
  // Beasley-Springer-Moro algorithm
  const a = [
    -3.969683028665376e+01, 2.209460984245205e+02,
    -2.759285104469687e+02, 1.383577518672690e+02,
    -3.066479806614716e+01, 2.506628277459239e+00
  ];
  
  const b = [
    -5.447609879822406e+01, 1.615858368580409e+02,
    -1.556989798598866e+02, 6.680131188771972e+01,
    -1.328068155288572e+01
  ];
  
  const c = [
    -7.784894002430226e-03, -3.223964580411365e-01,
    -2.400758277161838e+00, -2.549732539343734e+00,
    4.374664141464968e+00, 2.938163982698783e+00
  ];
  
  const d = [
    7.784695709041462e-03, 3.224671290700398e-01,
    2.445134137142996e+00, 3.754408661907416e+00
  ];
  
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  
  let q, r, z;
  
  if (p < pLow) {
    // Rational approximation for lower region
    q = Math.sqrt(-2 * Math.log(p));
    z = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= pHigh) {
    // Rational approximation for central region
    q = p - 0.5;
    r = q * q;
    z = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    // Rational approximation for upper region
    q = Math.sqrt(-2 * Math.log(1 - p));
    z = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
         ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  
  return z;
}

/**
 * Convert z-score to cumulative probability (percentile)
 * @param {number} z - Z-score value
 * @param {boolean} usePrecise - Use precise calculation (default: true)
 * @returns {number} Cumulative probability from -∞ to z
 * 
 * @example
 * zToPercentile(0)      // 0.5 (50th percentile)
 * zToPercentile(1.96)   // ~0.975 (97.5th percentile)
 * zToPercentile(-1.96)  // ~0.025 (2.5th percentile)
 */
function zToPercentile(z, usePrecise = true) {
  if (typeof z !== 'number' || isNaN(z)) {
    throw new Error('Z-score must be a valid number');
  }
  
  if (usePrecise) {
    return normalCDF(z);
  }
  
  // Use lookup table with linear interpolation for non-precise mode
  const rounded = Math.round(z * 10) / 10;
  const key = rounded.toFixed(1);
  
  if (Z_TABLE_DATA[key] !== undefined) {
    return Z_TABLE_DATA[key];
  }
  
  // Out of range handling
  if (z < -3.9) return 0.00005;
  if (z > 3.9) return 0.99995;
  
  // Linear interpolation between nearest values
  const lower = Math.floor(z * 10) / 10;
  const upper = Math.ceil(z * 10) / 10;
  const lowerKey = lower.toFixed(1);
  const upperKey = upper.toFixed(1);
  
  if (Z_TABLE_DATA[lowerKey] !== undefined && Z_TABLE_DATA[upperKey] !== undefined) {
    const ratio = (z - lower) / (upper - lower);
    return Z_TABLE_DATA[lowerKey] + ratio * (Z_TABLE_DATA[upperKey] - Z_TABLE_DATA[lowerKey]);
  }
  
  // Fallback to precise calculation
  return normalCDF(z);
}

/**
 * Convert cumulative probability (percentile) to z-score
 * @param {number} p - Cumulative probability (0 < p < 1)
 * @returns {number} Z-score corresponding to the probability
 * 
 * @example
 * percentileToZ(0.5)    // 0 (median)
 * percentileToZ(0.975)  // ~1.96 (97.5th percentile)
 * percentileToZ(0.025)  // ~-1.96 (2.5th percentile)
 */
function percentileToZ(p) {
  if (typeof p !== 'number' || isNaN(p) || p <= 0 || p >= 1) {
    throw new Error('Probability must be a number between 0 and 1 (exclusive)');
  }
  
  return inverseNormalCDF(p);
}

/**
 * Get the probability that a value falls between two z-scores
 * @param {number} z1 - Lower z-score
 * @param {number} z2 - Upper z-score
 * @returns {number} Probability between z1 and z2
 * 
 * @example
 * probabilityBetween(-1.96, 1.96)  // ~0.95 (95% confidence interval)
 * probabilityBetween(-1, 1)        // ~0.68 (68% of data within 1 SD)
 */
function probabilityBetween(z1, z2) {
  if (typeof z1 !== 'number' || typeof z2 !== 'number' || isNaN(z1) || isNaN(z2)) {
    throw new Error('Both z-scores must be valid numbers');
  }
  
  if (z1 > z2) {
    [z1, z2] = [z2, z1]; // Swap if in wrong order
  }
  
  return zToPercentile(z2) - zToPercentile(z1);
}

/**
 * Calculate z-score for a given percentile in a confidence interval
 * Common confidence levels: 90% (1.645), 95% (1.96), 99% (2.576)
 * @param {number} confidenceLevel - Confidence level as decimal (e.g., 0.95 for 95%)
 * @returns {number} Z-score for two-tailed confidence interval
 * 
 * @example
 * confidenceIntervalZ(0.95)  // ~1.96
 * confidenceIntervalZ(0.99)  // ~2.576
 */
function confidenceIntervalZ(confidenceLevel) {
  if (typeof confidenceLevel !== 'number' || confidenceLevel <= 0 || confidenceLevel >= 1) {
    throw new Error('Confidence level must be between 0 and 1 (exclusive)');
  }
  
  // For two-tailed test: (1 - α/2)
  const alpha = 1 - confidenceLevel;
  const p = 1 - (alpha / 2);
  
  return percentileToZ(p);
}

// Export the z-table data for advanced users
const zTable = Z_TABLE_DATA;

module.exports = {
  zToPercentile,
  percentileToZ,
  probabilityBetween,
  confidenceIntervalZ,
  zTable
};
