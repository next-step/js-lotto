export default class StatisticsModal {
  #modal;

  constructor() {
    this.#modal = document.querySelector('.modal');
  }

  openModal = (winningNumbers) => {
    this.#modal.classList.add('open');
    // TODO: 당첨 통계를 보여준다.
    // TODO: 수익률을 보여준다.
  }
  closeModal = () => {
    this.#modal.classList.remove('open');
  }
}
