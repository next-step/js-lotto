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
  const MINIMUM_NUMBER = 1;
  const MAXIMUM_NUMBER = 45;
  const NUMBER_COUNT = 6;

  const lottoLine = [];

  const numberRange = Array.from({ length: MAXIMUM_NUMBER }, (v, i) => i + 1);

  for (let i = 0; i < NUMBER_COUNT; i++) {
    const randomIndex = Math.floor(Math.random() * numberRange.length);

    lottoLine.push(...numberRange.splice(randomIndex, 1));
  }

  lottoLine.sort((a, b) => a - b);
  return lottoLine;
};

export const generateLottoBundle = (purchasedLottoCount) => {
  if (purchasedLottoCount <= 0) {
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
