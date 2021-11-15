import el from './dom.js';
import Controller from './controller.js';
import View from './view/index.js';
import FormPriceClass from './view/formPrice.js';
import PurchasedInfoClass from './view/purchasedInfo.js';
import FormWinningClass from './view/formWinning.js';
import ModalStatsClass from './view/modalStats.js';
customElements.define('form-price', FormPriceClass);
customElements.define('purchased-info', PurchasedInfoClass);
customElements.define('form-winning', FormWinningClass);
customElements.define('modal-stats', ModalStatsClass);
export default class App extends View {
    tag = '[View - App]';
    $formPriceView;
    $purchasedInfoView;
    $formWinningView;
    $modalStatsView;
    constructor() {
        super();
        const [FormPrice, PurchasedInfo, FormWinning, ModalStats] = [
            customElements.get('form-price'),
            customElements.get('purchased-info'),
            customElements.get('form-winning'),
            customElements.get('modal-stats'),
        ];
        this.$formPriceView = new FormPrice();
        this.$purchasedInfoView = new PurchasedInfo();
        this.$formWinningView = new FormWinning();
        this.$modalStatsView = new ModalStats();
        el(this, [
            el('<div id="app" class="p-3">', [
                el('<div class="d-flex justify-center mt-5">', [
                    el('<div class="w-100">', [
                        '<h1 class="text-center">🎱 행운의 로또</h1>',
                        this.$formPriceView,
                        this.$purchasedInfoView,
                        this.$formWinningView,
                    ]),
                ]),
                this.$modalStatsView,
            ]),
        ]);
        new Controller(this);
    }
}
customElements.define('lotto-app', App);
//# sourceMappingURL=index.js.map