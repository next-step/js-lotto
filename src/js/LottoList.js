import { PRICE_UNIT, LOTTO_MAX_NUMBER } from './constants/index.js';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const settingLotto = (lottoArray, count, numberArray) => {
  if (count === 0) return;

  const tempLottoArray = [];
  const tempLottoNumberArray = [...numberArray];

  for (let i = 0; i < 6; i++) {
    const randomNumber = getRandomInt(LOTTO_MAX_NUMBER - i);
    const lottoNumber = tempLottoNumberArray.splice(randomNumber, 1);
    tempLottoArray.push(lottoNumber[0]);
  }

  lottoArray.push(tempLottoArray);
  settingLotto(lottoArray, count - 1, numberArray);
};

const getLotto = (count, numberArray) => {
  const lottoArray = [];

  settingLotto(lottoArray, count, numberArray);

  return lottoArray;
};

const render = (target, result) => {
  let renderText = '';

  for (let i = 0; i < result.length; i++) {
    renderText =
      renderText +
      `<div>🎟️ ${result[i][0]} ${result[i][1]} ${result[i][2]} ${result[i][3]} ${result[i][4]} ${result[i][5]}</div>`;
  }

  target.innerHTML = renderText;
};

const LottoList = ({ target, input }) => {
  const lottoBoughtCount = input.value / PRICE_UNIT;
  const lottoNumberArray = Array.from(
    { length: LOTTO_MAX_NUMBER },
    (_, index) => index + 1
  );

  const result = getLotto(lottoBoughtCount, lottoNumberArray);

  render(target, result);
};

export default LottoList;
