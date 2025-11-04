const { validate } = require('./utils');
const quantile = require('./quantile');

// ✅ Метод 1: межквартильный размах (IQR)
function detectOutliersIQR(arr) {
  validate(arr, 'detectOutliersIQR');
  
  if (arr.length < 4) {
    throw new Error('detectOutliersIQR: requires at least 4 data points');
  }
  
  const sorted = [...arr].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;

  return arr.filter(x => x < lower || x > upper);
}

// ✅ Метод 2: эмпирическое правило (±kσ)
function detectOutliersSigma(arr, threshold = 3) {
  validate(arr, 'detectOutliersSigma');
  
  if (arr.length < 2) {
    throw new Error('detectOutliersSigma: requires at least 2 data points');
  }
  
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((acc, x) => acc + (x - mean) ** 2, 0) / arr.length;
  const stddev = Math.sqrt(variance);
  const lower = mean - threshold * stddev;
  const upper = mean + threshold * stddev;

  return arr.filter(x => x < lower || x > upper);
}

module.exports = {
  detectOutliersIQR,
  detectOutliersSigma
};
