import { LottoComponent } from "./controllers/lotto.component.js";
import { StateModel } from "./models/state.model.js";
import { LottoView } from "./views/lotto.view.js";
import { Validator } from "./views/validator";

window.onload = () => {
    const container = {
        view: new LottoView(),
        state: new StateModel({}),
        validator: new Validator()
    }
    const lottoComponent = new LottoComponent(container);
}

