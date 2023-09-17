import { View } from './View';

export class ErrorView extends View {
  #error = '';

  setError(error) {
    this.#error = error;
  }

  showError() {
    alert(this.#error);
  }

  reset() {
    this.#error = '';
  }
}
