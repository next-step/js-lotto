export const getSortedArray = (
  array,
  { isAscending } = {
    isAscending: true,
  }
) => {
  return [...array].sort((a, b) => (isAscending ? a - b : b - a));
};
