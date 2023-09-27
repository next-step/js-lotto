import {
  HEADING_TEXT_CONTENTS,
  LABEL_TEXT_CONTENTS,
  LOTTO_NUMBER_LENGTH,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER
} from '../../constants/index.js';

import {
  createHeading,
  createElement,
  createFragment,
  clearElement,
  addClassNames,
  showElement,
  hideElement
} from '../../../view/DOMHandler.js';

import { addEvent } from '../../../view/eventHandler.js';

class LottoWinningNumberForm {
  #InputBuilder = null;
  #submitEvent = null;
  #form = null;

  constructor(InputBuilder, submitEvent) {
    this.#InputBuilder = InputBuilder;
    this.#submitEvent = submitEvent;
  }

  #createForm() {
    const $form = createElement('form');
    addClassNames($form, ['mt-9']);
    return $form;
  }

  #createFormLabel() {
    const $formLabel = createElement('label');
    $formLabel.textContent = LABEL_TEXT_CONTENTS.WINNING_NUMBER_FORM;
    return $formLabel;
  }

  #createInputContainer() {
    const $container = createElement('div');
    addClassNames($container, ['d-flex']);
    return $container;
  }

  #createWinningNumberInput() {
    const $inputContainer = createElement('div');
    const $heading = createHeading('h4', HEADING_TEXT_CONTENTS.WINNING_LOTTO_NUMBER_INPUT);
    const $inputWrapper = createElement('div');
    const $inputFragment = createFragment();

    const winningNumberInputClassNames = ['winning-number', 'mx-1', 'text-center'];
    const headingClassNames = ['text-center', 'mt-0', 'mb-3'];

    for (let index = 0; index < LOTTO_NUMBER_LENGTH; index += 1) {
      const inputName = 'winning-number';
      const inputBuilder = new this.#InputBuilder('number', null, inputName, null);
      const $winningNumberInput = inputBuilder.createInput(false);
      this.#setLottoNumberAttributes($winningNumberInput);
      addClassNames($winningNumberInput, winningNumberInputClassNames);
      $inputFragment.appendChild($winningNumberInput);
    }

    addClassNames($heading, headingClassNames);
    $inputWrapper.appendChild($inputFragment);
    $inputContainer.append($heading, $inputWrapper);
    return $inputContainer;
  }

  #createBonusNumberInput() {
    const inputBuilder = new this.#InputBuilder('number', null, 'bonus-number', null);
    const inputContainerClassNames = ['bonus-number-container', 'flex-grow'];
    const bonusNumberInputWrapperClassNames = ['d-flex', 'justify-center'];
    const bonusNumberInputClassNames = ['bonus-number', 'text-center'];
    const headingClassNames = ['text-center', 'mt-0', 'mb-3'];

    const $inputContainer = createElement('div');
    const $inputWrapper = createElement('div');
    const $heading = createHeading('h4', HEADING_TEXT_CONTENTS.BONUS_NUMBER_INPUT);
    const $bonusNumberInput = inputBuilder.createInput(false);

    this.#setLottoNumberAttributes($bonusNumberInput);
    addClassNames($heading, headingClassNames);
    addClassNames($inputContainer, inputContainerClassNames);
    addClassNames($inputWrapper, bonusNumberInputWrapperClassNames);
    addClassNames($bonusNumberInput, bonusNumberInputClassNames);

    $inputWrapper.appendChild($bonusNumberInput);

    $inputContainer.append($heading, $inputWrapper);
    return $inputContainer;
  }

  #createSubmitButton() {
    const $button = createElement('button');
    $button.setAttribute('type', 'submit');
    $button.textContent = '결과 확인하기';
    addClassNames($button, ['btn', 'btn-cyan', 'open-result-modal-button', 'w-100', 'mt-5']);
    return $button;
  }

  #setLottoNumberAttributes($input) {
    $input.setAttribute('min', LOTTO_MIN_NUMBER);
    $input.setAttribute('max', LOTTO_MAX_NUMBER);
    $input.setAttribute('required', true);
  }

  #attachSubmitEvent($form) {
    const submitForm = (event, callback) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const winningNumbers = formData.getAll('winning-number').map((winningNumber) => Number(winningNumber));
      const bonusNumber = Number(formData.get('bonus-number'));
      callback([...winningNumbers, bonusNumber]);
    };

    addEvent($form, 'submit', (event) => submitForm(event, this.#submitEvent));
  }

  show() {
    showElement(this.#form);
  }

  createForm() {
    const $form = this.#createForm();
    const $formLabel = this.#createFormLabel();
    const $inputContainer = this.#createInputContainer();
    const $winningNumberInput = this.#createWinningNumberInput();
    const $bonusNumberInput = this.#createBonusNumberInput();
    const $submitButton = this.#createSubmitButton();

    $inputContainer.append($winningNumberInput, $bonusNumberInput);
    $form.append($formLabel, $inputContainer, $submitButton);
    hideElement($form);
    this.#form = $form;

    if (this.#submitEvent) {
      this.#attachSubmitEvent($form);
    }
    return $form;
  }
}

export default LottoWinningNumberForm;
