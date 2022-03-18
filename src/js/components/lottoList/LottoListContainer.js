import LottoList from './LottoList.js';
import LottoNumbers from './LottoNumbers.js';

const LottoListContainer = count => {
  const lottoNumbers = LottoNumbers();

  return LottoList({ numbers: lottoNumbers.purchasesLotto(count) });
};

export default LottoListContainer;
