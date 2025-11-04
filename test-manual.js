// Тестирование всех функций stat-kit
const {
  mean,
  median,
  stddev,
  zScores,
  correlation,
  detectOutliersIQR,
  detectOutliersSigma,
  empiricalRule,
  basicRange,
  iqrRange,
  percentileRange,
  stddevRange,
  skewness,
  sortByX,
  sortByY,
  quantile,
  zToPercentile,
  percentileToZ
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
  console.log('detectOutliersIQR([10,12,14,16,18,100]):', detectOutliersIQR(data2)); // [100]
  console.log('detectOutliersSigma([10,12,14,16,18,100]):', detectOutliersSigma(data2)); // [100]
  console.log('detectOutliersSigma([10,12,14,16,18,100], 2):', detectOutliersSigma(data2, 2)); // более чувствительный
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

  // Эмпирическое правило
  console.log('📐 Эмпирическое правило (68-95-99.7):');
  const testData = [10, 12, 14, 16, 18, 20];
  const m = mean(testData);
  const s = stddev(testData);
  const intervals = empiricalRule(m, s);
  console.log(`Среднее: ${m.toFixed(2)}, Стд. откл.: ${s.toFixed(2)}`);
  console.log('1σ (68%):', `[${intervals.oneSigma.lower.toFixed(2)}, ${intervals.oneSigma.upper.toFixed(2)}]`);
  console.log('2σ (95%):', `[${intervals.twoSigma.lower.toFixed(2)}, ${intervals.twoSigma.upper.toFixed(2)}]`);
  console.log('3σ (99.7%):', `[${intervals.threeSigma.lower.toFixed(2)}, ${intervals.threeSigma.upper.toFixed(2)}]`);
  console.log('');

  // Квантили
  console.log('📊 Квантили:');
  const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log('quantile(sorted, 0.25):', quantile(sorted, 0.25)); // Q1
  console.log('quantile(sorted, 0.5):', quantile(sorted, 0.5));   // медиана
  console.log('quantile(sorted, 0.75):', quantile(sorted, 0.75)); // Q3
  console.log('');

  // Z-table функции
  console.log('📈 Z-table функции:');
  console.log('zToPercentile(1.96):', zToPercentile(1.96).toFixed(4)); // 0.975
  console.log('percentileToZ(0.975):', percentileToZ(0.975).toFixed(4)); // ~1.96
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

  try {
    detectOutliersIQR([1, 2, 3]);
  } catch (e) {
    console.log('✓ detectOutliersIQR с < 4 элементами выбросил ошибку:', e.message);
  }

  try {
    detectOutliersSigma([1]);
  } catch (e) {
    console.log('✓ detectOutliersSigma с < 2 элементами выбросил ошибку:', e.message);
  }

  console.log('\n✅ Все тесты пройдены успешно!');

} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
