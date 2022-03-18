export const pickLottoNumbers = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size !== 6) {
    const between1And45 = Math.floor(Math.random() * 45) + 1;
    lottoNumbers.add(between1And45);
  }

  return [...lottoNumbers];
};
