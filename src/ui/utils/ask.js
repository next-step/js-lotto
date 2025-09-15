import { readLineAsync } from "./readLineAsync.js";

export async function ask(question, validate) {
  while (true) {
    let answer = await readLineAsync(question);

    if (!validate) {
      return answer;
    }

    const { isValid, errorMessage } = validate(answer);
    if (isValid) {
      return answer;
    }

    console.log(errorMessage);
  }
}
