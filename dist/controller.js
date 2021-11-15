import model from './model.js';
export default class Controller {
    constructor(app) {
        app.$purchasedInfoView.hide();
        app.$formWinningView.hide();
        app.on('submit@FormPrice', ({ detail }) => {
            const data = model.setAllLottoRandom(detail.price);
            app.$purchasedInfoView.onPurchased(data).show();
            app.$formWinningView.show();
        });
    }
}
//# sourceMappingURL=controller.js.map