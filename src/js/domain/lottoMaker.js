export default function LottoMaker(lottoRecipe = "") {
  const numbers = Array.from({ length: LOTTO_UPPER_BOUND }, (_, i) => i + 1);
  if (lottoRecipe) lottoRecipe(numbers);

  this.makeLotto = () => numbers.slice(0, LOTTO_SIZE);
}

const LOTTO_SIZE = 6;
const LOTTO_UPPER_BOUND = 45;
