# 📊 stat-kit

[![npm version](https://img.shields.io/npm/v/stat-kit.svg)](https://www.npmjs.com/package/stat-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**stat-kit** — это легковесный npm-пакет для базовой статистики и анализа данных. Никаких зависимостей, просто математика.

## 📦 Установка

```bash
npm install stat-kit
```

## 🚀 Быстрый старт

```javascript
const { mean, median, stddev, correlation, findOutliers } = require('stat-kit');

const data = [12, 15, 14, 10, 8, 12, 100];

console.log(mean(data));         // 24.43
console.log(median(data));       // 12
console.log(stddev(data));       // 32.77
console.log(findOutliers(data)); // [100]
```

## 📐 API

### Основные статистики

#### `mean(arr)`
Возвращает среднее значение массива.

```javascript
mean([1, 2, 3, 4, 5]); // 3
```

#### `median(arr)`
Возвращает медиану (центральное значение).

```javascript
median([1, 2, 3, 4, 5]); // 3
median([1, 2, 3, 4]);    // 2.5
```

#### `stddev(arr)`
Возвращает стандартное отклонение (меру разброса данных).

```javascript
stddev([2, 4, 4, 4, 5, 5, 7, 9]); // ~2.14
```

---

### Z-оценки и корреляция

#### `zScores(arr)`
Возвращает массив стандартизированных значений (z-scores).

```javascript
zScores([1, 2, 3]); // [-1.22, 0, 1.22]
```

#### `correlation(xArr, yArr)`
Вычисляет коэффициент корреляции Пирсона между двумя массивами (от -1 до 1).

```javascript
const height = [150, 160, 165, 170, 180];
const weight = [50, 60, 65, 70, 80];
correlation(height, weight); // ~0.99 (сильная положительная связь)
```

---

### Выбросы (Outliers)

#### `findOutliers(arr)`
Возвращает массив выбросов по методу IQR (межквартильного размаха):
- Выброс — значение за пределами $ Q1 - 1.5 \cdot IQR $ или $ Q3 + 1.5 \cdot IQR $

```javascript
findOutliers([1, 2, 3, 4, 5, 100]); // [100]
```

---

### Диапазоны (Range)

#### `basicRange(arr)`
Обычный диапазон: максимум минус минимум.

```javascript
basicRange([10, 20, 30]); // 20
```

#### `iqrRange(arr)`
Межквартильный размах (IQR): $ Q3 - Q1 $

```javascript
iqrRange([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 4
```

#### `percentileRange(arr, low = 5, high = 95)`
Диапазон между заданными процентилями (по умолчанию 5%–95%).

```javascript
percentileRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // ~[1.45, 9.55]
```

#### `stddevRange(arr, mean, stddev, k = 1)`
Диапазон по стандартным отклонениям: $ \mu \pm k\sigma $

```javascript
const data = [10, 12, 14, 16, 18];
stddevRange(data, mean(data), stddev(data), 2); // [6.34, 21.66]
```

---

### Асимметрия (Skewness)

#### `skewness(arr)`
Анализирует скошенность распределения:
- **> 0** → скошенность вправо (длинный правый хвост)
- **< 0** → скошенность влево (длинный левый хвост)
- **≈ 0** → симметричное распределение

```javascript
skewness([1, 2, 3, 4, 5]);        // ~0 (симметрия)
skewness([1, 1, 1, 2, 3, 10]);    // >0 (вправо)
```

---

### Сортировка

#### `sortByX(data)` / `sortByY(data)`
Сортирует массив объектов по полю `x` или `y`.

```javascript
const points = [{x: 3, y: 1}, {x: 1, y: 5}, {x: 2, y: 3}];
sortByX(points); // [{x:1, y:5}, {x:2, y:3}, {x:3, y:1}]
```

---

## 💡 Примеры использования

### Анализ оценок студентов

```javascript
const { mean, median, stddev, findOutliers } = require('stat-kit');

const grades = [85, 90, 78, 92, 88, 76, 95, 30, 89];

console.log(`Среднее: ${mean(grades).toFixed(1)}`);           // 80.3
console.log(`Медиана: ${median(grades)}`);                     // 88
console.log(`Стандартное отклонение: ${stddev(grades).toFixed(1)}`); // 19.3
console.log(`Выбросы: ${findOutliers(grades)}`);              // [30]
```

### Корреляция между переменными

```javascript
const { correlation } = require('stat-kit');

const studyHours = [2, 3, 5, 7, 8];
const examScores = [55, 60, 75, 85, 90];

const corr = correlation(studyHours, examScores);
console.log(`Корреляция: ${corr.toFixed(2)}`); // ~0.99
```

---

## 📄 Лицензия

MIT © Michael & Copilot

## 🔗 Ссылки

- [GitHub Repository](https://github.com/MikyViz/stat-kit)
- [npm Package](https://www.npmjs.com/package/stat-kit)
- [Report Issues](https://github.com/MikyViz/stat-kit/issues)
