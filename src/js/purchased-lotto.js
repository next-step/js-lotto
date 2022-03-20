import { getUniqueRandomNumbers } from './utils.js';

export default class Lotto {
  #numbers;

  constructor() {
    this.#numbers = getUniqueRandomNumbers(1, 45, 6);
  }

  render() {
    const parentEl = document.querySelector('#lotto-icons');

    parentEl.insertAdjacentHTML('beforeend', this.#generateHTML());
  }

  #generateHTML() {
    return `
      <li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail" style="display: none;">${this.#numbers.join(
          ', '
        )}</span>
      </li>
    `;
  }
}
