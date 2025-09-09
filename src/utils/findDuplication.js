const findDuplication = (firstArray, secondArray) => {
  const duplicatedItems = [];

  firstArray.forEach((first) => {
    const findDuplicatedItem = secondArray.find((second) => {
      return first === second;
    });

    if (findDuplicatedItem) {
      duplicatedItems.push(findDuplicatedItem);
    }
  });

  return duplicatedItems;
};

export default findDuplication;
