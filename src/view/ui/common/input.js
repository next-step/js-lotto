import readline from "readline";

export async function promptWithValidation({
  query,
  validationFn,
  errorMessage,
  transformFn = (input) => input,
}) {
  while (true) {
    const input = await promptUser(query);
    const trimmedInput = input.trim();
    const transformedInput = transformFn(trimmedInput);

    if (validationFn(transformedInput)) {
      return transformedInput;
    }

    console.error(errorMessage || "Invalid input. Please try again");
  }
}

export function promptUser(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input.trim());
    });
  });
}
