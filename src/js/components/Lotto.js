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

    constructor() {
        new LottoPurchaseForm({
            onPurchase: (price) => this.onPurchase(price),
        });
        this.lottoTicketsForm = new LottoTicketsForm();
        this.lottoTickets = new LottoTickets();
    }

    onPurchase(price) {
        try {
            this.price = price;
            this.lottoTickets.tickets = LottoShop.buy(this.price);
    
            this.onLoadLottoTicketForm();
            this.onLoadWinningForm();
        } catch(error) {
            alert(error.message);
        }        
    }

    onLoadLottoTicketForm() {
        this.lottoTicketsForm.lottos = this.lottoTickets.tickets;
        this.lottoTicketsForm.render();
        this.lottoTicketsForm.mounted();
    }

    onLoadWinningForm() {
        new WinningLottoForm({
            onReward: (winningNumber, bonusNumber) => this.onReward(winningNumber, bonusNumber),
        });
    }

    onReward(winningNuber, bonusNumber) {
        this.winningNumbers = winningNuber;
        this.bonusNumber = bonusNumber;

        try {
            new LottoReward({
                lottos: this.lottoTickets,
                winningNumbers: this.winningNumbers,
                bonusNumber: this.bonusNumber,
            });
            new LottoModal({});
        } catch (error) {
            alert(error.message);
        }
    }
}
