import { LottoView } from "../view/LottoView.js";

export class LottoMachine {
  lottos = [];
  results
  view;


  constructor(count) {
    this.view = LottoView
    this.results = Array.from({ length: 5 }).fill(0);
    this.#insertMoney(count);
  }

  #insertMoney (count) {
    this.lottos = Array.from({length: count}).map((_) => this.#issueLotto());
  }

  #issueLotto () {
    let lottoNumbers = [];
    while (lottoNumbers.length < 6) {
    let number = Math.floor(Math.random() * 45) + 1;
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }
    this.view.LOTTO_NUMBERS(lottoNumbers)
    return lottoNumbers;
  }

  recordResult (count) {
    switch (count) {
      case 3:
        this.machine.results[0]++;
        break;
      case 4:
        this.machine.results[1]++;
        break;
      case 5:
        this.machine.results[2]++;
        break;
      case 6:
        this.machine.results[3]++;
        break;
      case 7:
        this.machine.results[4]++;
        break;
      default:
        break;
    }
  }

  get lottos () {
    return this.lottos;
  }
}