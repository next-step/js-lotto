import { LottoTicket, LottoMoney } from './index.js';

import { PRICE } from '../constants/index.js';

export class LottoShop {
  lottoMoney;
  lottoTickets = [];
  isShowLottoTickets = false;

  constructor() {}

  inputMoney(money) {
    const lottoMoney = new LottoMoney(money);

    this.setLottoMoney(lottoMoney);
    this.issueLottoTickets(lottoMoney);
  }

  getLottoTickets() {
    return [...this.lottoTickets];
  }

  getIsShowLottoTickets() {
    return this.isShowLottoTickets;
  }

  setLottoMoney(lottoMoney) {
    this.lottoMoney = lottoMoney;
  }

  toggleIsShowLottoTickets() {
    this.isShowLottoTickets = !this.isShowLottoTickets;
  }

  issueLottoTickets(lottoMoney) {
    const ticketCount = lottoMoney.getMoney() / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.lottoTickets.push(new LottoTicket());
    }

    console.log(this.lottoTickets);
  }
}
