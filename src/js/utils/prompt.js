import readLineAsync from "./readLineAsync.js";

async function prompt({ message, validate, format }) {
  let isValid = false;
  let validatedInput;

  while (!isValid) {
    try {
      const inputtedString = await readLineAsync(message);
      const formattedInput = format ? format(inputtedString) : inputtedString;

      validatedInput = validate ? validate(formattedInput) : formattedInput;

      isValid = true;
    } catch (error) {
      console.error(error.message);
    }
  }

  return validatedInput;
}

export default prompt;
