import readline from "readline";

const readLineAsync = (query) => {
  return new Promise((resolve, reject) => {
    if (query === undefined) {
      return reject(new Error("arguments must provide"));
    }

    if (typeof query !== "string") {
      return reject(new Error("Query must be a string"));
    }

    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(query, (input) => {
      readLine.close();
      resolve(input);
    });
  });
};

export default readLineAsync;
