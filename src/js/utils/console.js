import readLine from 'readline';

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

export const closeReadLine = () => {
  rl.close();
};
