import FormAmount from './controller/FormAmount.js';
import LottoAmount from './controller/LottoAmount.js';
import LottoList from './controller/LottoList.js';
import LottoNumbersToggleButton from './controller/LottoNumbersToggleButton.js';
import FromResult from './controller/FormResult.js';
import { reactiveRender } from './core/reactive/reactiveRender.js';

function main() {
  FormAmount();
  LottoNumbersToggleButton();
  LottoList();
  LottoAmount();
  FromResult();

  reactiveRender();
}

main();
