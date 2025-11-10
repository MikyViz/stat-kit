const { validateTwoArrays } = require('./utils');

/**
 * Вычисляет коэффициенты линейной регрессии (только slope и intercept)
 * @param {number[]} x - Массив независимых переменных
 * @param {number[]} y - Массив зависимых переменных
 * @returns {Object} Объект с коэффициентами
 * @returns {number} slope - Наклон линии регрессии
 * @returns {number} intercept - Точка пересечения с осью Y
 */
function getLinearCoefficients(x, y) {
  validateTwoArrays(x, y, 'getLinearCoefficients');
  
  if (x.length < 2) {
    throw new Error('getLinearCoefficients: requires at least 2 data points');
  }

  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
  const denominator = x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0);

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  return { slope, intercept };
}

/**
 * Выполняет линейную регрессию методом наименьших квадратов
 * @param {number[]} x - Массив независимых переменных
 * @param {number[]} y - Массив зависимых переменных
 * @returns {Object} Объект с параметрами регрессии
 * @returns {number} slope - Наклон (коэффициент b)
 * @returns {number} intercept - Точка пересечения (коэффициент a)
 * @returns {Function} predict - Функция предсказания: predict(x) => y
 * @returns {number} r2 - Коэффициент детерминации (R²)
 */
function linearRegression(x, y) {
  validateTwoArrays(x, y, 'linearRegression');
  
  if (x.length < 2) {
    throw new Error('linearRegression: requires at least 2 data points');
  }

  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  const covXY = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
  const varX = x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0);

  const slope = covXY / varX;
  const intercept = meanY - slope * meanX;

  // R² — коэффициент детерминации
  const yHat = x.map(xi => intercept + slope * xi);
  const ssTot = y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0);
  const ssRes = y.reduce((sum, yi, i) => sum + (yi - yHat[i]) ** 2, 0);
  const r2 = 1 - ssRes / ssTot;

  return {
    slope,
    intercept,
    predict: xVal => intercept + slope * xVal,
    r2
  };
}

/**
 * Вычисляет наклон линии регрессии из корреляции и стандартных отклонений
 * @param {number} r - Коэффициент корреляции Пирсона
 * @param {number} sx - Стандартное отклонение X
 * @param {number} sy - Стандартное отклонение Y
 * @returns {number} Наклон (slope) линии регрессии
 */
function getSlopeFromCorrelation(r, sx, sy) {
  if (typeof r !== 'number' || typeof sx !== 'number' || typeof sy !== 'number') {
    throw new Error('getSlopeFromCorrelation: all inputs must be numbers');
  }
  
  if (isNaN(r) || isNaN(sx) || isNaN(sy)) {
    throw new Error('getSlopeFromCorrelation: all inputs must be valid numbers');
  }
  
  if (sx === 0) {
    throw new Error('getSlopeFromCorrelation: standard deviation of X cannot be zero');
  }
  
  return r * (sy / sx);
}

module.exports = {
  linearRegression,
  getLinearCoefficients,
  getSlopeFromCorrelation
};
