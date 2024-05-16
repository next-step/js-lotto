import readLineAsync from "./readLineAsync.js";

async function prompt({ message, validate, format }) {
  let isValid = false;
  let ret;

  while (!isValid) {
    try {
      const inputtedString = await readLineAsync(message);
      const formattedInput = format ? format(inputtedString) : inputtedString;
      validate && validate(formattedInput);

      ret = formattedInput;
      isValid = true;
    } catch (error) {
      console.error(error.message);
    }
  }

  return ret;
}

export default prompt;
