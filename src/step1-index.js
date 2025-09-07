import { readLineAsync } from "./utils/readLineAsync.js";

const play = async () => {
  const amount = await readLineAsync("구입금액을 입력해 주세요.");
  console.log(amount);
};

play();
