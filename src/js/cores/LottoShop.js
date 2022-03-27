import { LottoTicket, LottoMoney, LottoWinningTicket } from './index.js';

import { PRICE } from '../constants/index.js';

export class LottoShop {
  lottoMoney;
  lottoWinningTicket;
  lottoTickets = [];
  isShowLottoTickets = false;

  constructor() {}

  inputMoney(money) {
    const lottoMoney = new LottoMoney(money);

    this.lottoMoney = money;
    this.lottoWinningTicket = new LottoWinningTicket();

    this.issueLottoTickets(lottoMoney);
  }

  getLottoTickets() {
    return [...this.lottoTickets];
  }

  getIsShowLottoTickets() {
    return this.isShowLottoTickets;
  }

  toggleIsShowLottoTickets() {
    this.isShowLottoTickets = !this.isShowLottoTickets;
  }

  clearLottoTickets() {
    this.lottoTickets = [];
  }

  issueLottoTickets(lottoMoney) {
    const ticketCount = lottoMoney.getMoney() / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.lottoTickets.push(new LottoTicket());
    }
  }
}
