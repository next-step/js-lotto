import { getRandomNumber } from "./Random";

export const drawItem = (list) => {
  if (!list || list.length <= 0) {
    throw new Error();
  }

  const index = getRandomNumber(0, list.length);
  const item = list.at(index);
  return item;
};

export const drawRandomItems = (list, amount) => {
  const items = [];

  while (items.length < amount) {
    const item = drawItem(list);
    items.push(item);

    const drawnIndex = list.indexOf(item);
    list = list.toSpliced(drawnIndex, 1);
  }

  return items;
};
