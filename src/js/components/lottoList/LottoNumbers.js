const LottoNumbers = () => {
  const purchasesLotto = number => {
    return Array.from({ length: number }).map(() => oneLottoNumbers());
  };

  const oneLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.trunc(Math.random() * 45) + 1);
    }

    return Array.from(numbers);
  };

  return {
    purchasesLotto,
    oneLottoNumbers,
  };
};

export default LottoNumbers;
