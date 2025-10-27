function sortByX(data) {
  return [...data].sort((a, b) => a.x - b.x);
}
function sortByY(data) {
  return [...data].sort((a, b) => a.y - b.y);
}
module.exports = { sortByX, sortByY };
