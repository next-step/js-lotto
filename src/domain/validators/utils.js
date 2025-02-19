export const isValidIntegerInRange = ({
  value,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
}) => {
  return Number.isInteger(value) && value >= min && value <= max;
};
