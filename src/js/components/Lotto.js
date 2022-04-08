import { LottoReward } from "../domain/LottoReward.js";
import { LottoShop } from "../domain/LottoShop.js";
import { LottoModal } from "./LottoModal.js";
import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
import { LottoTicketsForm } from "./LottoTicketsForm.js";
import { WinningLottoForm } from "./WinningLottoForm.js";

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
    }

    onPurchase(price) {
        this.price = price;
        this.lottos = LottoShop.buy(this.price);

        this.onLoadLottoTicketForm();
        this.onLoadWinningForm();
    }

    onLoadLottoTicketForm() {
        this.lottoTicketsForm.lottos = this.lottos;
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
        LottoReward.computeWinning({
            lottos: this.lottos,
            winningNumbers: this.winningNumbers,
            bonusNumber: this.bonusNumber,
        });
        new LottoModal({});
    }
}
// import { LottoShop } from "../domain/LottoShop.js";
// import { LottoReward } from "../domain/LottoReward.js";
// import { WinningNumbers } from "../domain/WinningNumbers.js";
// import { LottoModal } from "./LottoModal.js";
// import { LottoPurchaseForm } from "./LottoPurchaseForm.js";
// import { LottoTicketsForm } from "./LottoTicketsForm.js";
// import { WinningLottoForm } from "./WinningLottoForm.js";
// import { LottoNumber } from "../domain/LottoNumber.js";
// import { LottoPurchase } from "../domain/LottoPurchase.js";
// import { LottoTickets } from "../domain/LottoTickets.js";

// export default class Lotto {
//     lottoTicketsForm;
//     lottoModal;
//     matchingLotto;
//     winningLotto;
//     lottoPurchase;
//     winningLottoForm;
//     $lottoPurchaseArea;
//     $lottoAmountArea;
//     $lottoTicketArea;
//     $winningLottoArea;
//     $resultModalArea;

//     price;

//     constructor() {
//         this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
//         this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
//         this.$winningLottoArea = document.querySelector("#lotto-winning-area");
//         this.$resultModalArea = document.querySelector("#result_modal_area");

//         //new LottoNumber();
//         this.lottoPurchase = new LottoPurchase();
//         new LottoPurchaseForm(this.lottoPurchase, {
//             //buyLottos: (price) => this.buyLottos(price),
//             onLottoPurchase: () => {
//                 LottoTickets.tickets = LottoShop.buy(this.lottoPurchase.purchasePrice);
//                 //this.lottoTicketsForm.pickTickets();
//                 this.lottoTicketsForm.render();
//                 this.lottoTicketsForm.mounted();
//                 this.lottoTicketsForm.setEvent();

//                 this.winningLottoForm.render();
//                 this.winningLottoForm.mounted();
//                 this.winningLottoForm.setEvent();
//             },
//         });
//         this.matchingLotto = new LottoReward();
//         // this.winningLotto = new WinningNumbers();
//         this.lottoTicketsForm = new LottoTicketsForm(this.$lottoAmountArea, this.$lottoTicketArea);
//         this.winningLottoForm = new WinningLottoForm(this.$winningLottoArea, this.winningLotto, {
//             onWinngingCheck: () => {
//                 this.onMatchingwinningNumber();
//                 this.lottoModal.render();
//                 this.lottoModal.mounted();
//                 this.lottoModal.setEvent();

//                 this.lottoModal.onClickOpenResultModalButton();
//             },
//         });

//         this.lottoModal = new LottoModal(this.$resultModalArea, {
//             onReset: () => {
//                 this.init();
//             },
//         });
//     }
//     onMatchingwinningNumber() {
//         const resultValue = this.winningLotto.checkWinningNumber();

//         if (resultValue.isComplete) {
//             this.matchingLotto.initRating();
//             this.matchingLotto.computeWinning();
//             this.matchingLotto.computeRate();
//             this.lottoModal.tickets = this.matchingLotto.tickets;
//             this.lottoModal.rating = this.matchingLotto.rating;
//             this.lottoModal.rate = this.matchingLotto.rate;

//             return;
//         }

//         alert(resultValue.message);
//     }
// }
