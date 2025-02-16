import readline from "readline";

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
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

export async function getPurchaseAmount() {
  const input = await readLineAsync("구입금액을 입력해 주세요: ");
  return parseInt(input, 10);
}

export async function getWinningNumbers() {
  const input = await readLineAsync(
    "당첨 번호를 입력해 주세요 (쉼표로 구분): ",
  );
  return input.split(",").map((num) => parseInt(num.trim(), 10));
}

export async function getBonusNumber() {
  const input = await readLineAsync("보너스 번호를 입력해 주세요: ");
  return parseInt(input, 10);
}
