import model from './model.js';
export default class Controller {
    constructor(app) {
        app.$formDetailsView.hide();
        app.$formWinningView.hide();
        app
            .on('submit@formPrice', ({ detail: { price } }) => {
            const amount = model.setPrice(price);
            app.$formDetailsView.onPurchased(amount).show().focus();
        })
            .on('submit@formWinning', ({ detail: { winningNumbers } }) => {
            const winList = model.getWinList(winningNumbers);
            if (!winList)
                return;
            app.$modalStatsView.buildResult(winList);
            app.$modalStatsView.show();
        })
            .on('reset@modalStats', () => {
            model.reset();
            app.$formWinningView.reset();
            app.$modalStatsView.hide();
            app.$formDetailsView.reset().hide();
            app.$formWinningView.hide();
            app.$formPriceView.focus();
        })
            .on('submit@formDetails', () => {
            const $entries = app.$formDetailsView.$entries;
            if (!$entries)
                return;
            $entries.forEach(entryView => {
                const values = this.submitEntry(entryView);
                if (values) {
                    entryView.$toggle.disabled = true;
                    entryView.$inputs.forEach(($input, i) => {
                        $input.value = String(values[i]);
                        $input.disabled = true;
                    });
                }
            });
            app.$formDetailsView.setAvailability(false);
            app.$formWinningView.show().focus();
        })
            .on('toggleAll@formDetails', ({ detail: { checked } }) => {
            const $entries = app.$formDetailsView.$entries;
            model.toggleRandomEntries(checked);
            if (!$entries)
                return;
            $entries.forEach(entryView => {
                entryView.setToggle(checked);
            });
        })
            .on('toggleEntry@formDetailEntry', ({ detail: { index, checked } }) => {
            model.toggleRandomEntry(index, checked);
            app.$formDetailsView.$entries[index].setToggle(checked);
            app.$formDetailsView.$toggleAll.checked = model.isEntriesAllRandom;
        });
    }
    submitEntry(entryView) {
        const index = Number(entryView.getAttribute('index'));
        const isRandom = entryView.$toggle.checked;
        const values = entryView.$inputs.map(el => +el.value);
        return model.setEntry(index, values, isRandom);
    }
}
//# sourceMappingURL=controller.js.map