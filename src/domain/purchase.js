import {
  LINE_MINIMUM_NUMBER,
  LINE_MAXIMUM_NUMBER,
  LINE_SIZE,
} from "../constants/lottoNumbers.js";

export const buyLotto = (amountPaid) => {
  const LOTTO_ITEM_PRICE = 1000;

  if (amountPaid < LOTTO_ITEM_PRICE) {
    throw new Error("로또는 1,000원 이상부터 구매 가능합니다.");
  }

  const purchasedLottoCount = Math.floor(amountPaid / LOTTO_ITEM_PRICE);

  console.log(`${purchasedLottoCount}개를 구매했습니다.`);

  return purchasedLottoCount;
};

const generateLottoLine = () => {
  const lottoLine = [];

  const numberRange = Array.from(
    { length: LINE_MAXIMUM_NUMBER },
    (v, i) => i + 1
  );

  for (let i = 0; i < LINE_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * numberRange.length);

    lottoLine.push(...numberRange.splice(randomIndex, 1));
  }

  lottoLine.sort((a, b) => a - b);
  return lottoLine;
};

export const generateLottoBundle = (purchasedLottoCount) => {
  if (purchasedLottoCount < LINE_MINIMUM_NUMBER) {
    throw new Error("구매한 로또가 존재하지 않습니다.");
  }

  const lottoBundle = [];
  for (let i = 0; i < purchasedLottoCount; i++) {
    const lottoLine = generateLottoLine();
    console.log(lottoLine);
    lottoBundle.push(lottoLine);
  }

  return lottoBundle;
};
