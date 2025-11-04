/**
 * Вычисляет квантиль для отсортированного массива
 * @param {number[]} sortedArr - Отсортированный массив чисел
 * @param {number} q - Квантиль (от 0 до 1), например 0.25 для Q1, 0.5 для медианы, 0.75 для Q3
 * @returns {number} Значение квантиля
 */
function quantile(sortedArr, q) {
  const pos = (sortedArr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  
  if (sortedArr[base + 1] !== undefined) {
    return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
  } else {
    return sortedArr[base];
  }
}

module.exports = quantile;
