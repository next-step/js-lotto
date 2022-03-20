const useLottoService = () => {
  const getLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.trunc(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
  };

  const purchasesLotto = number => {
    return Array.from({ length: number }).map(() => getLottoNumbers());
  };

  return { purchasesLotto };
};

export default useLottoService;
