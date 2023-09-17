export class Input {
  #target;

  #html = `
    <input></input>
  `;

  constructor(target) {
    this.#target = target;
    this.#render();
  }

  get value() {
    return this.#target.value;
  }

  #render() {
    this.#target.innerHTML = this.#html;
  }

  focus() {
    this.#target.focus();
  }
}
