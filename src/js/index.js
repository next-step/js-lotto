import { LottoComponent } from "./controllers/lotto.component.js";
import { StateModel } from "./models/state.model.js";
import { LottoView } from "./views/lotto.view.js";

window.onload = () => {
    const view = new LottoView();
    const stateModel = new StateModel({});
    const lottoComponent = new LottoComponent(view, stateModel);
