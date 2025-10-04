import readline from "node:readline/promises";

const inputStringWithPlaceholder = async (placeholder) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const inputString = await readlineInterface.question(placeholder);

  readlineInterface.close();

  return inputString;
};

export { inputStringWithPlaceholder };
