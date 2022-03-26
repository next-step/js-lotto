import { LottoModal } from "./LottoModal.js";
import { LottoPurchase } from "./LottoPurchase.js";
import { LottoTickets } from "./LottoTickets.js";
import { LottoWinning } from "./LottoWinning.js";

export default class Lotto {
    lottoTickets = null;
    lottoPurchase = null;
    lottoModal = null;
    $lottoPurchaseArea = null;
    $lottoAmountArea = null;
    $lottoTicketArea = null;
    $lottiWinningArea = null;
    $resultModalArea = null;

    constructor() {
        this.$lottoPurchaseArea = document.querySelector("#lotto-purchase-area");
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        this.$lottiWinningArea = document.querySelector("#lotto-winning-area");
        this.$resultModalArea = document.querySelector("#result_modal_area");

        this.lottoPurchase = new LottoPurchase(this.$lottoPurchaseArea, {
            onLottoPurchase: (tickets) => {
                this.lottoTickets.setTickets(tickets);
                this.lottoTickets.setAmount(tickets.length);
                this.lottoTickets.render();
                this.lottoTickets.mounted();
                this.lottoTickets.setEvent();

                this.lottoWinning.render();
                this.lottoWinning.mounted();
                this.lottoWinning.setEvent();

                this.lottoModal.render();
                this.lottoModal.mounted();
                this.lottoModal.setEvent();
            },
        });

        this.lottoTickets = new LottoTickets(this.$lottoAmountArea, this.$lottoTicketArea);
        this.lottoWinning = new LottoWinning(this.$lottiWinningArea, {
            onLottoModal: () => {
                this.lottoModal.onClickOpenResultModalButton();
            },
            setLottoNumbers: (numbers) => {
                this.lottoModal.setLottoNumbers(numbers);
            },
            setBonusNumber: (number) => {
                this.lottoModal.setBonusNumber(number);
            }
        });
        this.lottoModal = new LottoModal(this.$resultModalArea, {
            onReset: () => {
                this.init();
            }
        });
    }

    init() {
        
    }
}
