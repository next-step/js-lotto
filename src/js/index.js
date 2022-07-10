import FormAmount from './components/FormAmount.js';
import LottoAmount from './components/LottoAmount.js';
import LottoList from './components/LottoList.js';
import LottoNumbersToggleButton from './components/LottoNumbersToggleButton.js';
import { reactiveRender } from './utils/reactiveRender.js';

function App() {
  FormAmount();
  LottoNumbersToggleButton();
  LottoList();
  LottoAmount();

  reactiveRender();
}

App();
