import { MAX_PURCHASE_COUNT, MIN_PURCHASE_COUNT, LABEL_TEXT_CONTENTS } from '../../constants/index.js';
import { createElement, clearElement, addClassNames, getQuerySelector } from '../../../view/DOMHandler.js';
import { addEvent } from '../../../view/eventHandler.js';

class LottoAmountForm {
  #inputBuilder = null;
  #lottoPrice = 0;
  #submitEvent = null;

  constructor(inputBuilder, lottoPrice, submitEvent) {
    this.#inputBuilder = inputBuilder;
    this.#lottoPrice = lottoPrice;
    this.#submitEvent = submitEvent;
  }

  #addSubmitEvent($form) {
    const submitAmountForm = (event, callback) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const amount = Number(formData.get('lotto-amount')); // 'inputName'은 input의 name 속성
      callback(amount);
    };

    addEvent($form, 'submit', (event) => submitAmountForm(event, this.#submitEvent));
  }

  #setMinAmount($input, min) {
    $input.setAttribute('min', min);
  }

  #setMaxAmount($input, max) {
    $input.setAttribute('max', max);
  }

  #createInputContainer() {
    const $container = createElement('div');
    addClassNames($container, ['d-flex']);
    return $container;
  }

  #createSubmitButton() {
    const $button = createElement('button');
    $button.setAttribute('type', 'submit');
    $button.textContent = '확인';
    addClassNames($button, ['btn', 'btn-cyan']);
    return $button;
  }

  createForm() {
    const $form = createElement('form');
    const $inputContainer = this.#createInputContainer();
    const $submitButton = this.#createSubmitButton();
    const $amountInputWrapper = this.#inputBuilder.createInputWithContainer({
      withLabel: true,
      labelText: LABEL_TEXT_CONTENTS.INPUT_AMOUNT,
      $container: $inputContainer
    });
    const $amountInput = this.#inputBuilder.$input;
    const $amountLabel = getQuerySelector('label', $amountInputWrapper);

    addClassNames($form, ['mt-5']);
    addClassNames($amountInput, ['w-100', 'mr-2', 'pl-2']);
    addClassNames($amountLabel, ['mb-2', 'd-inline-block']);

    this.#setMinAmount($amountInput, MIN_PURCHASE_COUNT * this.#lottoPrice);
    this.#setMaxAmount(this.#inputBuilder.$input, MAX_PURCHASE_COUNT * this.#lottoPrice);

    $inputContainer.appendChild($submitButton);
    $form.appendChild($amountInputWrapper);

    if (this.#submitEvent) {
      this.#addSubmitEvent($form);
    }

    return $form;
  }

  render($parentElement) {
    clearElement($parentElement);
    const $form = this.createForm();
    $parentElement.appendChild($form);
  }
}

export default LottoAmountForm;
