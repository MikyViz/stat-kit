function sortByX(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('sortByX: expected an array');
  }
  return [...data].sort((a, b) => a.x - b.x);
}

function sortByY(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('sortByY: expected an array');
  }
  return [...data].sort((a, b) => a.y - b.y);
}

module.exports = { sortByX, sortByY };
