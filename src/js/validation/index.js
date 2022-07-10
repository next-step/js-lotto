const PRICE_UNIT = 1000;

export const isPriceUnitCheck = (input) => {
  const price = input.value;
  return price % PRICE_UNIT === 0;
};
