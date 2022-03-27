import { WinningLotto } from "../domain/WinningLotto.js";
import { LottoModal } from "./LottoModal.js";
import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
import { LottoTicketsForm } from "./LottoTicketsForm.js";
import { WinningLottoForm } from "./WinningLottoForm.js";

export default class Lotto {
    lottoTicketsForm = null;
    lottoModal = null;
    winningLotto = null;
    winningLottoForm = null;
    $lottoPurchaseArea = null;
    $lottoAmountArea = null;
    $lottoTicketArea = null;
    $winningLottoArea = null;
    $resultModalArea = null;

    constructor() {
        this.$lottoPurchaseArea = document.querySelector("#lotto-purchase-area");
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        this.$winningLottoArea = document.querySelector("#lotto-winning-area");
        this.$resultModalArea = document.querySelector("#result_modal_area");

        new LottoPurchaseForm(this.$lottoPurchaseArea, {
            onLottoPurchase: (amount) => {
                this.lottoTicketsForm.setAmount(amount);
                this.lottoTicketsForm.pickTickets();
                this.lottoTicketsForm.render();
                this.lottoTicketsForm.mounted();
                this.lottoTicketsForm.setEvent();

                this.winningLottoForm.render();
                this.winningLottoForm.mounted();
                this.winningLottoForm.setEvent();

                this.lottoModal.render();
                this.lottoModal.mounted();
                this.lottoModal.setEvent();
            },
        });
        this.winningLotto = new WinningLotto();
        this.lottoTicketsForm = new LottoTicketsForm(this.$lottoAmountArea, this.$lottoTicketArea);
        this.winningLottoForm = new WinningLottoForm(this.$winningLottoArea, this.winningLotto, {
            onWinngingCheck: () => this.onCheckwinningNumber(),
            onLottoModal: () => {
                this.lottoModal.onClickOpenResultModalButton();
            },
        });

        
        this.lottoModal = new LottoModal(this.$resultModalArea, {
            onReset: () => {
                this.init();
            }
        });
    }

    onCheckwinningNumber() {
        let resultValue = this.winningLotto.checkWinningNumber();

        if(resultValue.isComplete) {
            this.lottoModal.onClickOpenResultModalButton();
            return;
        }

        alert(resultValue.message);
    }

    init() {
        
    }
}
