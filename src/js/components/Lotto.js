import { LottoShop } from "../domain/LottoShop.js";
import { LottoReward } from "../domain/LottoReward.js";
import { WinningNumbers } from "../domain/WinningNumbers.js";
import { LottoModal } from "./LottoModal.js";
import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
import { LottoTicketsForm } from "./LottoTicketsForm.js";
import { WinningLottoForm } from "./WinningLottoForm.js";
import { LottoNumber } from "../domain/LottoNumber.js";
import { LottoPurchase } from "../domain/LottoPurchase.js";

export default class Lotto {
    lottoTicketsForm;
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
        this.$element = document.querySelector("#lotto-area");
        this.$lottoPurchaseArea = document.querySelector("#lotto-purchase-area");
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        this.$winningLottoArea = document.querySelector("#lotto-winning-area");
        this.$resultModalArea = document.querySelector("#result_modal_area");

        new LottoNumber();
        new LottoPurchase();
        new LottoPurchaseForm(this.$lottoPurchaseArea, {
            onLottoPurchase: () => {
                LottoShop.buy(LottoPurchase.purchasePrice);
                //this.lottoTicketsForm.pickTickets();
                this.lottoTicketsForm.render();
                this.lottoTicketsForm.mounted();
                this.lottoTicketsForm.setEvent();

                this.winningLottoForm.render();
                this.winningLottoForm.mounted();
                this.winningLottoForm.setEvent();
            },
        });
        this.matchingLotto = new LottoReward();
       // this.winningLotto = new WinningNumbers();
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

    renderer() {
        this.$element.innerHTML = this.getTemaplate();
    }
    onMatchingwinningNumber() {
        const resultValue = this.winningLotto.checkWinningNumber();

        if (resultValue.isComplete) {
            this.matchingLotto.initRating();
            this.matchingLotto.computeWinning();
            this.matchingLotto.computeRate();
            this.lottoModal.tickets = this.matchingLotto.tickets;
            this.lottoModal.rating = this.matchingLotto.rating;
            this.lottoModal.rate = this.matchingLotto.rate;
            return;
        }

        alert(resultValue.message);
    }

    init() {}
}
