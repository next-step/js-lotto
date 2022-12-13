import { StateModel } from "./models/state.model.js";
import { LottoView } from "./views/lotto.view.js";
import { Validator } from "./controllers/validator.js";
import { purchaseComponent } from "./controllers/purchase.component.js";

window.onload = () => {
    const container = {
        view: new LottoView(),
        state: new StateModel(),
        validator: new Validator()
    }
    const purchase = new purchaseComponent(container);
}

