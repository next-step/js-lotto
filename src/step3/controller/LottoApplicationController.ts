import { LottoGame } from '@step1/model';

export default class LottoApplicationController {
  protected lottoGame: LottoGame;

  constructor() {
    this.lottoGame = new LottoGame();
  }

  protected initEvent() {}
}
