import model from './model.js';
export default class Controller {
    constructor(app) {
        app.$purchasedInfoView.hide();
        app.$formWinningView.hide();
        app
            .on('submit@FormPrice', ({ detail: { price } }) => {
            const data = model.setAllLottoRandom(price);
            app.$purchasedInfoView.onPurchased(data).show();
            app.$formWinningView.show().focus();
        })
            .on('submit@formWinning', ({ detail: { winningNumbers } }) => {
            const winList = model.getWinList(winningNumbers);
            if (!winList)
                return;
            app.$modalStatsView.buildResult(winList);
            app.$modalStatsView.show();
        })
            .on('reset@modalStats', () => {
            app.$formWinningView.reset();
            app.$modalStatsView.hide();
            app.$purchasedInfoView.hide();
            app.$formWinningView.hide();
            app.$formPriceView.focus();
        });
    }
}
//# sourceMappingURL=controller.js.map