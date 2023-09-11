import { LOTTO_MAX_NUM, LOTTO_MIN_NUM, LOTTO_TICKET_PRICE } from "../../constants.js";
import LottoTicket from "../../models/LottoTicket.js";
import ConsoleInput from "../../views/step1/ConsoleInput.js";
import ConsoleOutput from "../../views/step1/ConsoleOutput.js";

class LottoController {
  #readline;
  #consoleInput;
  #consoleOutput;
  #money;
  #winningCriteria = [
    {
      winningCount: 3,
      hasToWinBonus: false,
      winningAmount: 5_000,
      numOfWinTicket: 0,
    },
    {
      winningCount: 4,
      hasToWinBonus: false,
      winningAmount: 50_000,
      numOfWinTicket: 0,
    },
    {
      winningCount: 5,
      hasToWinBonus: false,
      winningAmount: 1_500_000,
      numOfWinTicket: 0,
    },
    {
      winningCount: 5,
      hasToWinBonus: true,
      winningAmount: 30_000_000,
      numOfWinTicket: 0,
    },
    {
      winningCount: 6,
      hasToWinBonus: false,
      winningAmount: 2_000_000_000,
      numOfWinTicket: 0,
    },
  ];

  constructor(readline) {
    this.#readline = readline;
    this.#consoleInput = new ConsoleInput(readline);
    this.#consoleOutput = new ConsoleOutput();
    this.#startLotto();
  }

  validateMoney(money) {
    if (isNaN(money)) {
      throw new Error("금액은 숫자 타입이어야 합니다.");
    }

    if (money < 1000) {
      throw new Error(`금액은 ${LOTTO_TICKET_PRICE}원 이상이어야 합니다.`);
    }

    if (money % 1000 > 0) {
      throw new Error(`금액은 ${LOTTO_TICKET_PRICE}원 단위여야 합니다.`);
    }
  }

  validateNumber(number) {
    if (isNaN(number)) throw new Error("번호는 숫자 타입이어야 합니다.");

    if (number < LOTTO_MIN_NUM || number > LOTTO_MAX_NUM)
      throw new Error(`번호는 ${LOTTO_MIN_NUM} 이상 ${LOTTO_MAX_NUM} 이하 숫자여야 합니다.`);
  }

  validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach(this.validateNumber);

    if (winningNumbers.length !== 6) {
      throw new Error("당첨 번호는 6개의 숫자여야 합니다.");
    }

    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new Error("당첨 번호는 중복되면 안됩니다.");
    }
  }

  validateBonusNumber(winningNumbers, bonusNumber) {
    this.validateNumber(bonusNumber);

    if (winningNumbers.indexOf(bonusNumber) !== -1)
      throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }

  async #startLotto() {
    const money = await this.#readMoney();
    this.#money = money;
    await this.#makeLotto(money);
    const earns = this.#calculateEarns();

    this.#consoleOutput.printWinningStatistics({
      earns,
      winningCriteria: this.#winningCriteria,
    });

    this.#readline.close();
  }

  async #makeLotto(money) {
    const lottoTickets = this.#issueLottoTickets(money);
    this.#consoleOutput.printLottoTickets(lottoTickets);

    const { winningNumbers, bonusNumber } = await this.#readNumbers();

    this.#produceStatistics({ lottoTickets, winningNumbers, bonusNumber });
  }

  #produceStatistics({ lottoTickets, winningNumbers, bonusNumber }) {
    lottoTickets.forEach((lottoTicket) => {
      const lottoNumbers = lottoTicket.getLottoNumbers();

      this.#exportStatistics({ lottoNumbers, winningNumbers, bonusNumber });
    });
  }

  async #readMoney() {
    const money = await this.#consoleInput.readline("구입금액을 입력해 주세요.");
    this.validateMoney(money);

    return Number(money);
  }

  async #readNumbers() {
    const winningNumbersStr = await this.#consoleInput.readline("당첨 번호를 입력해주세요.");

    const winningNumbers = winningNumbersStr.split(",").map(Number);
    this.validateWinningNumbers(winningNumbers);

    const bonusNumber = Number(await this.#consoleInput.readline("보너스 번호를 입력해 주세요."));
    this.validateBonusNumber(winningNumbers, bonusNumber);

    return { winningNumbers, bonusNumber };
  }

  #issueLottoTickets(money) {
    const NumberOfLotto = Math.floor(money / LottoTicket.price);

    return Array.from({ length: NumberOfLotto }, () => new LottoTicket(this.#drawLottoNumbers()));
  }

  #drawLottoNumbers() {
    const numbers = [];

    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * LOTTO_MAX_NUM) + 1;
      if (numbers.indexOf(randomNumber) === -1) numbers.push(randomNumber);
    }

    return numbers.sort((a, b) => a - b);
  }

  #exportStatistics({ lottoNumbers, winningNumbers, bonusNumber }) {
    const count = this.#countMatchNumbers({ lottoNumbers, winningNumbers, bonusNumber });

    this.#winningCriteria.forEach((criteria) => {
      this.#checkWin(criteria, count);
    });
  }

  #checkWin(criteria, count) {
    if (
      criteria.winningCount === count.winningCount &&
      (count.winBonus || !criteria.hasToWinBonus)
    ) {
      criteria.numOfWinTicket++;
      this.#processDuplicateWin(criteria, count);
    }
  }

  #processDuplicateWin(criteria, count) {
    if (!criteria.hasToWinBonus && criteria.winningCount === 5 && count.winBonus) {
      criteria.numOfWinTicket--;
    }
  }

  #countMatchNumbers({ lottoNumbers, winningNumbers, bonusNumber }) {
    const count = {
      winningCount: 0,
      winBonus: false,
    };

    count.winningCount = this.#countWinningNumbers(lottoNumbers, winningNumbers);

    if (lottoNumbers.includes(bonusNumber)) count.winBonus = true;

    return count;
  }

  #countWinningNumbers(lottoNumbers, winningNumbers) {
    const winningCount = lottoNumbers.filter((number) => winningNumbers.includes(number)).length;

    return winningCount;
  }

  #calculateEarns() {
    const amounts = this.#winningCriteria.reduce((sum, criteria) => {
      return sum + criteria.numOfWinTicket * criteria.winningAmount;
    }, 0);

    return (amounts / this.#money) * 100;
  }
}

export default LottoController;
