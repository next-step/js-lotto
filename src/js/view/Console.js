import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class Console {
  #rl;

  constructor() {
    this.#rl = readline.createInterface({ input, output });
  }

  async #prompt(text) {
    console.log("\n");
    return await this.#rl.question(text);
  }

  print(message) {
    console.log(message);
  }

  async getUserInput(message, { parser }) {
    if (!parser) {
      return await this.#prompt(message);
    }

    while (true) {
      const userInputStr = await this.#prompt(message);
      try {
        const userInput = parser(userInputStr);
        return userInput;
      } catch (error) {
        this.print(`잘못된 입력입니다: ${error.message}`);
      }
    }
  }

  close() {
    this.#rl?.close();
  }
}
