function getLottoNumbers() {
  const lotto = [];

  while (lotto.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (lotto.indexOf(randomNumber) === -1) lotto.push(randomNumber);
  }

  const sortedLotto = [...lotto].sort((a, b) => (a - b < 0 ? -1 : 1));
  return sortedLotto;
}

export default function lottoMaker(coin) {
  const lottos = [];

  for (let i = 0; i < coin; i++) {
    lottos.push(getLottoNumbers());
  }

  return lottos;
}
