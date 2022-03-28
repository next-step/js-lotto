import { MatchingLotto } from "../domain/MatchingLotto.js";
import { WinningLotto } from "../domain/WinningLotto.js";
import { LottoModal } from "./LottoModal.js";
import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
import { LottoTicketsForm } from "./LottoTicketsForm.js";
import { WinningLottoForm } from "./WinningLottoForm.js";

export default class Lotto {
    lottoTicketsForm = null;
    lottoModal = null;
    matchingLotto = null;
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
        let resultValue = this.winningLotto.checkWinningNumber();

        if (resultValue.isComplete) {
            this.matchingLotto.setTickets(this.lottoTicketsForm.getTickets());
            this.matchingLotto.setWinningNumbers(this.winningLottoForm.getWinningNumbers());
            this.matchingLotto.setBonusNumber(this.winningLottoForm.getBonusNumber());
            this.matchingLotto.initRating();
            this.matchingLotto.computeWinning();
            console.log(this.matchingLotto.getRating());
            this.lottoModal.setTickets(this.matchingLotto.setTickets());
            this.lottoModal.setRating(this.matchingLotto.getRating());
            this.lottoModal.setRate(this.matchingLotto.getRate());
            return;
        }

        alert(resultValue.message);
    }

    init() {}
}
