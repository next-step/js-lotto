import { LottoPurchase } from "./LottoPurchase.js";
import { LottoTickets } from "./LottoTickets.js";
//import { LottoWinning } from "./LottoWinning.js";

export default class Lotto {
    lottoTickets = null;
    lottoPurchase = null;
    $lottoPurchaseArea = null;
    $lottoAmountArea = null;
    $lottoTicketArea = null;
    //$lottiWinningArea = null;

    constructor() {
        this.$lottoPurchaseArea = document.querySelector("#lotto-purchase-area");
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        //$lottiWinningArea = document.querySelector("#lotto-winning-area");

        this.lottoPurchase = new LottoPurchase(this.$lottoPurchaseArea, {
            onLottoPurchase: (tickets) => {
                this.lottoTickets.setTickets(tickets);
                this.lottoTickets.setAmount(tickets.length);
                this.lottoTickets.render();
                this.lottoTickets.mounted();
                this.lottoTickets.setEvent();

                // this.lottoWinning.render();
                // this.lottoWinning.mounted();
                // this.lottoWinning.setEvent();
            },
        });

        this.lottoTickets = new LottoTickets(this.$lottoAmountArea, this.$lottoTicketArea);
        //this.lottoWinning = new LottoWinning(this.$lottiWinningArea);
    }
}
