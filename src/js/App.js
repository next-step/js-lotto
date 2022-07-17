import { AwardController } from "./Controllers/AwardController.js";
import { LottoController } from "./Controllers/LottoController.js";

import { LottoModel } from "./Models/LottoModel.js";
import { AwardModel } from "./Models/AwardModel.js";

import { LottoView } from "./Views/LottoView.js";
import { AwardView } from "./Views/AwardView.js";

export class App {
  $app;
  controllers = {};

  constructor($app) {
    this.$app = $app;
    this.controllers.lotto = new LottoController(
      new LottoView(this.$app),
      new LottoModel({
        lottos: [],
        numOfLottos: 0,
        isVisualizeLottoNumbers: false,
      })
    );

    this.controllers.award = new AwardController(
      new AwardView(this.$app),
      new AwardModel({
        isShowAward: false,
        reward: {},
        revenue: 0,
      }),
      {
        reset: this.resetApp.bind(this),
        getLottos: this.getLottos.bind(this),
      }
    );
  }

  getLottos() {
    return this.controllers.lotto.state.lottos;
  }

  resetApp() {
    Object.values(this.controllers).forEach((controller) => controller.reset());
  }
}
