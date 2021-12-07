export const createRandomLotto = (min, max) => {
  const lotto = new Set();
  while (lotto.size <= 5) {
    lotto.add(Math.floor(Math.random() * (max - min) + min));
  }
  return [...lotto];
};

export const isDuplicateNumsExist = (manualNums) => {
  const lottoNumsGroup = [];
  let temp = [];
  let isDuplicateExist = false;

  manualNums.forEach((num, i) => {
    if ((i + 1) % 6 === 0) {
      temp.push(num);
      lottoNumsGroup.push([...temp]);
      temp.length = 0;
    }
    if ((i + 1) % 6 !== 0) {
      temp.push(num);
    }
  });

  lottoNumsGroup.forEach((lottoNums) => {
    const set = new Set(lottoNums);
    if (lottoNums.length !== set.size) {
      isDuplicateExist = true;
    }
  });

  return isDuplicateExist;
};

export const isNumsIn1to45Range = (nums) => {
  let isNumsIn1to45 = true;
  nums.forEach((num) => {
    if (num <= 0 || num > 45) {
      isNumsNotIn1to45 = false;
    }
  });
  return isNumsIn1to45;
};

export const cloneDeep = (target) => {
  return JSON.parse(JSON.stringify(target));
};
