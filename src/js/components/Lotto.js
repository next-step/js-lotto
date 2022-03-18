import { SELECTOR } from "../constant/index.js";
import { $ } from "../utils/selector.js";
import { LottoPurchase } from "./LottoPurchase.js";
import { LottoTickets } from "./LottoTickets.js";
import { LottoWinning } from "./LottoWinning.js";

export default class Lotto {
    constructor() {
        this.lottoAmount = 0;
        this.lottoTicketList = [];
        this.lottoTickets = null;

        this.$app = $(SELECTOR.ID.APP);
        this.$lottoPurchaseArea = $(SELECTOR.ID.LOTTO_PURCHASE_AREA);
        this.$lottoAmountArea = $(SELECTOR.ID.LOTTO_AMOUNT_AREA);
        this.$lottoTicketArea = $(SELECTOR.ID.LOTTO_TICKET_AREA);
        this.$lottiWinningArea = $(SELECTOR.ID.LOTTO_WINNING_AREA);

        this.lottoPurchase = new LottoPurchase(this.$lottoPurchaseArea, {
            onLottoPurchase: (lottoTickets) => {
                this.lottoTickets.setTickets(lottoTickets);
                this.lottoTickets.setAmount(lottoTickets.length);
                this.lottoTickets.render();
                this.lottoTickets.mounted();
                this.lottoTickets.setEvent();

                this.lottoWinning.render();
            },
        });
        this.lottoTickets = new LottoTickets(this.$lottoAmountArea, this.$lottoTicketArea);
        this.lottoWinning = new LottoWinning(this.$lottiWinningArea);
    }

    setLotto() {
        this.lottoPurchase = new LottoPurchase(this.$lottoPurchaseArea, {
            onLottoPurchase: this.onLottoPurchase,
        });
    }
}
