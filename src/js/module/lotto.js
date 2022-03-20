export const drawLots = () => {
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5).slice(0, 6);
};

export const calculateLotto = (receivedMoney) => {
  const PRICE = 1000;
  if (receivedMoney < 0) {
    return 0;
  }
  return Math.floor(receivedMoney / PRICE);
};

export const getLottos = (count) =>
  Array.from({ length: count }, () => drawLots());
