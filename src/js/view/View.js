import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  getUserInput(question) {
    return new Promise((resolve) => {
      rl.question(question, (input) => {
        resolve(input);
      });
    });
  }

  renderComment(comment) {
    console.log(comment);
  }

  renderError(err) {
    console.error(err);
  }
}

export default View;
