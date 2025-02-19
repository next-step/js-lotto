function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}
export default hasDuplicate;
