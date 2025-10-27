npm pacage that recive arr of numbers or arr of [x,y,num] and send back mein, median, IQR, range, standart deviation, is_right_skewed, is_left_skewed, simetric, bepolar.# 📦 stat-kit

**stat-kit** — это простой npm-пакет для базовой статистики и анализа данных.

## 📐 Возможности

- `mean(arr)` — среднее значение
- `median(arr)` — медиана
- `stddev(arr)` — стандартное отклонение
- `zScores(arr)` — массив Z-оценок
- `correlation(xArr, yArr)` — коэффициент корреляции Пирсона
- `sortByX(data)` — сортировка массива объектов по `x`
- `sortByY(data)` — сортировка массива объектов по `y`
- `skewness(arr)` — анализ скошенности (асимметрии) распределения:
  - > 0 → скошенность вправо
  - < 0 → скошенность влево
  - ≈ 0 → симметрия
- `findOutliers(arr)` — возвращает массив выбросов по методу IQR:
  - Выбросы — значения, которые лежат за пределами \( Q1 - 1.5 \cdot IQR \) и \( Q3 + 1.5 \cdot IQR \)
- `basicRange(arr)` — обычный диапазон: max - min
- `iqrRange(arr)` — межквартильный размах: Q3 - Q1
- `percentileRange(arr, low, high)` — диапазон между заданными процентилями (по умолчанию 5%–95%)
- `stddevRange(arr, mean, stddev, k)` — диапазон по стандартным отклонениям: \( \mu \pm k\sigma \)


## 📦 Установка

```bash
npm install stat-kit
