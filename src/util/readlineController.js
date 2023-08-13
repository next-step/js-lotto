import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { isMaxAttempt } from '../domain/validator.js';

export const readlineController = {
  rl: readline.createInterface({
    input,
    output,
  }),

  questionReadline(prompt, validator) {
    let attempt = 0;
    return new Promise((resolve) => {
      const question = () => {
        this.rl.question(`${prompt}\n`, (answer) => {
          try {
            validator(answer);
            resolve(answer);
          } catch (ERRORS) {
            attempt += 1;
            if (isMaxAttempt(attempt)) {
              console.log(ERRORS.MAX_ATTEMPT_EXCEEDED);
              this.closeReadline();
            } else {
              console.log(ERRORS.message);
              question();
            }
          }
        });
      };
      question();
    });
  },

  closeReadline() {
    this.rl.close();
  },
};
