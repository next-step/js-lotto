import * as rl from 'readline';

export const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
