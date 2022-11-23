import { LottoComponent } from "./controllers/lotto.component.js";
import { StateModel } from "./models/state.model.js";
import { LottoView } from "./views/lotto.view.js";


window.onload = () => {
    const lottoComponent = new LottoComponent(new LottoView(), new StateModel({}));
}