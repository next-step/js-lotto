import FormAmount from './controller/FormAmount.js';
import LottoAmount from './controller/Lotto/Amount.js';
import LottoList from './controller/Lotto/List.js';
import LottoNumbersToggleButton from './controller/Lotto/NumbersToggleButton.js';
import ResultFrom from './controller/Result/Form.js';
import { reactiveRender } from './core/reactive/reactiveRender.js';
import Modal from './controller/Modal/index.js';
import InputValidate from './controller/InputValidate.js';

function main() {
  Modal();
  InputValidate();
  FormAmount();
  LottoNumbersToggleButton();
  LottoList();
  LottoAmount();
  ResultFrom();

  reactiveRender();
}

main();
