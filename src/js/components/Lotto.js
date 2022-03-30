import { MatchingLotto } from "../domain/MatchingLotto.js";
import { WinningLotto } from "../domain/WinningLotto.js";
import { LottoModal } from "./LottoModal.js";
import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
import { LottoTicketsForm } from "./LottoTicketsForm.js";
import { WinningLottoForm } from "./WinningLottoForm.js";

export default class Lotto {
    LottoTicketsForm;
    lottoModal;
    matchingLotto;
    winningLotto;
    winningLottoForm;
    $lottoPurchaseArea;
    $lottoAmountArea;
    $lottoTicketArea;
    $winningLottoArea;
    $resultModalArea;

    constructor() {
        this.$lottoPurchaseArea = document.querySelector("#lotto-purchase-area");
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        this.$winningLottoArea = document.querySelector("#lotto-winning-area");
        this.$resultModalArea = document.querySelector("#result_modal_area");

        new LottoPurchaseForm(this.$lottoPurchaseArea, {
            onLottoPurchase: (amount) => {
                this.lottoTicketsForm.amount = amount;
                this.lottoTicketsForm.pickTickets();
                this.lottoTicketsForm.render();
                this.lottoTicketsForm.mounted();
                this.lottoTicketsForm.setEvent();

                this.winningLottoForm.render();
                this.winningLottoForm.mounted();
                this.winningLottoForm.setEvent();
            },
        });
        this.matchingLotto = new MatchingLotto();
        this.winningLotto = new WinningLotto();
        this.lottoTicketsForm = new LottoTicketsForm(this.$lottoAmountArea, this.$lottoTicketArea);
        this.winningLottoForm = new WinningLottoForm(this.$winningLottoArea, this.winningLotto, {
            onWinngingCheck: () => {
                this.onMatchingwinningNumber();
                this.lottoModal.render();
                this.lottoModal.mounted();
                this.lottoModal.setEvent();

                this.lottoModal.onClickOpenResultModalButton();
            },
        });

        this.lottoModal = new LottoModal(this.$resultModalArea, {
            onReset: () => {
                this.init();
            },
        });
    }

    onMatchingwinningNumber() {
        const resultValue = this.winningLotto.checkWinningNumber();

        if (resultValue.isComplete) {
            this.matchingLotto.tickets = this.lottoTicketsForm.tickets;
            this.matchingLotto.winningNumbers = this.winningLottoForm.getWinningNumbers();
            this.matchingLotto.bonusNumber = this.winningLottoForm.getBonusNumber();
            this.matchingLotto.initRating();
            this.matchingLotto.computeWinning();
            this.lottoModal.setTickets(this.matchingLotto.tickets);
            this.lottoModal.setRating(this.matchingLotto.rating);
            this.lottoModal.setRate(this.matchingLotto.rate);
            return;
        }

        alert(resultValue.message);
    }

    init() {}
}
