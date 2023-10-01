import { clearElement, createHeading } from '../../../view/DOMHandler.js';

class LottoContentRenderer {
  #heading = '';
  #parentElement = null;
  #lottoAmountForm = null;
  #lottoTicketList = null;
  #resultModal = null;
  #lottoWinningNumberForm = null;

  constructor(heading, lottoAmountForm, lottoTicketList, lottoWinningNumberForm, resultModal, parentElement) {
    this.#heading = heading;
    this.#lottoAmountForm = lottoAmountForm;
    this.#lottoTicketList = lottoTicketList;
    this.#parentElement = parentElement;
    this.#resultModal = resultModal;
    this.#lottoWinningNumberForm = lottoWinningNumberForm;
  }

  #createHeading() {
    const $heading = createHeading('h2', this.#heading);
    $heading.className = 'text-center';
    return $heading;
  }

  render() {
    clearElement(this.#parentElement);
    const $heading = this.#createHeading();
    const $amountForm = this.#lottoAmountForm.createForm();
    const $lottoTicketList = this.#lottoTicketList.createLottoTicketList();
    const $lottoWinningNumberForm = this.#lottoWinningNumberForm.createForm();
    const $resultModal = this.#resultModal.createModal();

    this.#parentElement.append($heading, $amountForm, $lottoTicketList, $lottoWinningNumberForm, $resultModal);
  }
}

export default LottoContentRenderer;
