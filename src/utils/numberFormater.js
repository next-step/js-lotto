export const numberFormater = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
