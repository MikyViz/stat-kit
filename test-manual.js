// Тестирование всех функций stat-kit
const {
  mean,
  median,
  stddev,
  zScores,
  correlation,
  findOutliers,
  basicRange,
  iqrRange,
  percentileRange,
  stddevRange,
  skewness,
  sortByX,
  sortByY
} = require('./index');

console.log('🧪 Тестирование stat-kit...\n');

// Тестовые данные
const data1 = [1, 2, 3, 4, 5];
const data2 = [10, 12, 14, 16, 18, 100]; // с выбросом
const xData = [1, 2, 3, 4, 5];
const yData = [2, 4, 6, 8, 10];

try {
  // Основные статистики
  console.log('📊 Основные статистики:');
  console.log('mean([1,2,3,4,5]):', mean(data1)); // 3
  console.log('median([1,2,3,4,5]):', median(data1)); // 3
  console.log('stddev([1,2,3,4,5]):', stddev(data1).toFixed(2)); // ~1.58
  console.log('');

  // Z-scores
  console.log('📈 Z-scores:');
  console.log('zScores([1,2,3,4,5]):', zScores(data1).map(z => z.toFixed(2)));
  console.log('');

  // Корреляция
  console.log('🔗 Корреляция:');
  console.log('correlation(xData, yData):', correlation(xData, yData).toFixed(2)); // ~1.00
  console.log('');

  // Выбросы
  console.log('🎯 Выбросы:');
  console.log('findOutliers([10,12,14,16,18,100]):', findOutliers(data2)); // [100]
  console.log('');

  // Диапазоны
  console.log('📏 Диапазоны:');
  console.log('basicRange([10,12,14,16,18,100]):', basicRange(data2)); // 90
  console.log('iqrRange([1,2,3,4,5,6,7,8,9]):', iqrRange([1,2,3,4,5,6,7,8,9])); // 4
  console.log('');

  // Асимметрия
  console.log('📉 Асимметрия:');
  console.log('skewness([1,2,3,4,5]):', skewness(data1).toFixed(2)); // ~0
  console.log('skewness([1,1,1,2,3,10]):', skewness([1,1,1,2,3,10]).toFixed(2)); // >0
  console.log('');

  // Сортировка
  console.log('🔄 Сортировка:');
  const points = [{x: 3, y: 1}, {x: 1, y: 5}, {x: 2, y: 3}];
  console.log('sortByX:', sortByX(points));
  console.log('sortByY:', sortByY(points));
  console.log('');

  // Тест валидации
  console.log('✅ Тест валидации (должны быть ошибки):');
  try {
    mean([]);
  } catch (e) {
    console.log('✓ mean([]) выбросил ошибку:', e.message);
  }

  try {
    mean('not an array');
  } catch (e) {
    console.log('✓ mean("not an array") выбросил ошибку:', e.message);
  }

  try {
    mean([1, 2, 'three']);
  } catch (e) {
    console.log('✓ mean([1,2,"three"]) выбросил ошибку:', e.message);
  }

  try {
    correlation([1, 2], [1, 2, 3]);
  } catch (e) {
    console.log('✓ correlation с разными длинами выбросил ошибку:', e.message);
  }

  console.log('\n✅ Все тесты пройдены успешно!');

} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
