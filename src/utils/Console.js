import readline from 'readline';

export const Console = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),

  readLine(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (input) => {
        resolve(input);
      });
    });
  },

  close() {
    this.rl.close();
  },

  print(...message) {
    console.log(...message);
  },
};
