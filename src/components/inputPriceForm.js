import { $, SELECTOR } from '../utils/selector.js';
import lottoMaker from '../libs/lottoMaker.js';
import { PRICE_UNIT } from '../common/constants.js';

export default function InputPriceForm({ onSubmit }) {
  this.$inputPriceForm = $(SELECTOR.CLASS.INPUT_PRICE_FORM);
  this.$inputPrice = $(SELECTOR.CLASS.INPUT_PRICE);
  this.$inputPrice.focus();

  this.setState = () => {};
  this.render = () => {};

  this.purchaseLottos = (event) => {
    event.preventDefault();

    const price = Number(this.$inputPrice.value);
    const coin = Math.floor(price / PRICE_UNIT);
    const newLottos = lottoMaker(coin);

    onSubmit(price, newLottos);
  };

  this.$inputPriceForm.addEventListener('submit', this.purchaseLottos);
}
