import LottoInput from './components/LottoInput.js';
import LottoArea from './components/LottoArea.js';
import LottoResult from './components/LottoResult.js';

export default function App(container) {
  this.container = container;
  this.lottoCount = 0;
  this.lotto = [];

  new LottoInput(this);
  const lottoArea = new LottoArea(this);
  const lottoResult = new LottoResult(this);

  this.setLottoArea = lottoCount => {
    this.lottoCount = lottoCount;
    lottoArea.setLottoCount(lottoCount);
    lottoArea.setLotto(lottoCount);
  };

  this.setLottoResultArea = () => {
    lottoResult.setLottoResult();
  };
}
