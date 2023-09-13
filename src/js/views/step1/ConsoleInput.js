class ConsoleInput {
  #readline;

  constructor(readline) {
    this.#readline = readline;
  }

  readline(query) {
    return this.#readline.question(`${query}\n`);
  }
}

export default ConsoleInput;
