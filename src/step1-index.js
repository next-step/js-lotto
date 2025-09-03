import readline from "readline";

const LOTTO_PRICE = 1000;
const LOTTO_COUNT = 6;
const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);

class LottoPurchase {
  #purchaseAmount;
  #lottos;

  constructor() {
    this.#purchaseAmount = 0;
    this.#lottos = [];
  }

  // 로또가 1000원 단위인지 확인
  amountUnitCheck(money) {
    if (money % LOTTO_PRICE === 0) {
      return true;
    }

    return false;
  }

  // 새로 생성된 번호가 생성중인 로또 배열안에 포함되 있는지 확인
  isDifferentNumber(randomNumbers, randomNumber) {
    if (randomNumbers.filter((el) => el === randomNumber).length > 0) {
      return false;
    }

    return true;
  }

  // 랜덤 숫자 생성
  getRandomNumber(lastLotto) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;

    const isValidDifferentNumber = this.isDifferentNumber(
      lastLotto,
      randomNumber
    );

    if (isValidDifferentNumber) {
      return randomNumber;
    }

    return this.getRandomNumber(lastLotto);
  }

  // 로또 생성
  createLotto(lotto) {
    if (lotto.length === LOTTO_COUNT) {
      console.log(lotto);
      return;
    }

    const randomNumber = this.getRandomNumber(lotto);

    lotto.push(randomNumber);
    this.createLotto(lotto);
  }

  // 로또 구매
  buyLotto(money) {
    const isLottoBuyable = this.amountUnitCheck(money);

    if (!isLottoBuyable) {
      return;
    }

    this.#purchaseAmount = money;

    const lottoCount = this.#purchaseAmount / LOTTO_PRICE;
    console.log(`${lottoCount}개를 구입했습니다.`);

    for (let i = 0; i < lottoCount; i++) {
      const lotto = [];
      this.createLotto(lotto);
      this.#lottos.push(lotto);
      console.log(lotto);
    }

    return this.#lottos;
  }
}

class WinningNumbers {
  #winningNumber;
  #bonusWinningNumber;

  construnctor() {
    this.#winningNumber = "";
    this.#bonusWinningNumber = "";
  }
}

function buyLottoAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

const buyLottoHandler = async () => {
  const lottoPurchaseAmount = await buyLottoAsync(
    "> 구입금액을 입력해 주세요. "
  );

  const lottoPurchase = new LottoPurchase();

  console.log(lottoPurchaseAmount);

  const lottos = lottoPurchase.buyLotto(lottoPurchaseAmount);
};

buyLottoHandler();
