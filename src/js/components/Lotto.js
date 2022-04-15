import LottoReward from "../domain/LottoReward.js";
import LottoShop from "../domain/LottoShop.js";
import LottoTickets from "../domain/LottoTickets.js";
import LottoModal from "./LottoModal.js";
import LottoPurchaseForm from "./LottoPurchaseForm.js";
import LottoTicketsForm from "./LottoTicketsForm.js";
import WinningLottoForm from "./WinningLottoForm.js";

export default class Lotto {
    price;
    lottos;
    winningNumbers;
    bonusNumber;
    rating;
    rate;

    constructor() {
        this.lottoPurchaseForm = new LottoPurchaseForm({
            onPurchase: (price) => this.onPurchase(price),
        });
        this.lottoTicketsForm = new LottoTicketsForm();
        this.lottoTickets = new LottoTickets();
        this.winningLottoForm = new WinningLottoForm({
            onReward: (winningNumber, bonusNumber) => this.onReward(winningNumber, bonusNumber),
        });
        this.lottoModal = new LottoModal({
            onReset: () => this.onReset(),
        });
        this.lottoReward = new LottoReward();
    }

    onPurchase(price) {
        try {
            this.price = price;
            this.lottoTickets.tickets = LottoShop.buy(this.price);

            this.onLoadLottoTicketForm();
            this.onLoadWinningForm();
        } catch (error) {
            alert(error.message);
        }
    }

    onLoadLottoTicketForm() {
        this.lottoTicketsForm.lottos = this.lottoTickets.tickets;
        this.lottoTicketsForm.render();
        this.lottoTicketsForm.mounted();
    }

    onLoadWinningForm() {
        this.winningLottoForm.render();
        this.winningLottoForm.mounted();
    }

    onReward(winningNuber, bonusNumber) {
        this.winningNumbers = winningNuber;
        this.bonusNumber = bonusNumber;

        try {
            this.lottoReward.compute({
                lottos: this.lottoTickets.tickets,
                winningNumbers: this.winningNumbers,
                bonusNumber: this.bonusNumber,
            });
            this.lottoModal.rate = this.lottoReward.rate;
            this.lottoModal.winnings = this.lottoReward.winnings;
            this.lottoModal.render();
            this.lottoModal.mounted();
            this.lottoModal.onClickOpenResultModalButton();
        } catch (error) {
            alert(error.message);
        }
    }

    onReset() {
        this.lottoTickets = [];
        this.lottoPurchaseForm.onReset();
        this.lottoTicketsForm.onReset();
        this.winningLottoForm.onReset();
        this.lottoModal.onReset();
    }
}
