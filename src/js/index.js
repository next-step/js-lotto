import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/lotto.js';
import { handleClickNumberToggle, handleSubmit } from './eventHandlers/lotto.js';

$(SELECTOR.PAYMENT_FORM).addEventListener('submit', handleSubmit);
$(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener('click', handleClickNumberToggle);
