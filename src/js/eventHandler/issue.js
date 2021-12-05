import ERROR_MESSAGE from '../constant/errorMessage.js';
import lottoManager from '../model/lotto.js';
import { isValidLottoInput } from '../service/lotto.js';
import {
  hideManualNumberingForm,
  resetManualNumberingForm,
  updateLottoTicketView,
} from '../view/main.js';

const getManualLotto = ({ first, second, third, fourth, fifth, sixth }) => [
  first.value,
  second.value,
  third.value,
  fourth.value,
  fifth.value,
  sixth.value,
];

export const handleManualIssue = (event) => {
  event.preventDefault();

  const lottoInput = getManualLotto(event.target.elements);

  if (!isValidLottoInput(lottoInput)) {
    alert(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_INPUT);
    return;
  }

  lottoManager.issue(lottoInput);
  updateLottoTicketView(lottoManager.lottos);
  resetManualNumberingForm();

  if (!lottoManager.hasLeft()) {
    hideManualNumberingForm();
  }
};

export const handleIssueRest = () => {
  lottoManager.issueAll();
  updateLottoTicketView(lottoManager.lottos);
  hideManualNumberingForm();
};
