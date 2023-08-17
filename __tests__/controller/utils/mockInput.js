import { LottoInputView } from '../../../src/js/view/Lotto';

const mockInput = ({ purchase, winningNumbers, bonus, retry }) => {
  purchase.forEach(LottoInputView.prototype.purchase.mockResolvedValueOnce);
  winningNumbers.forEach(LottoInputView.prototype.winningNumbers.mockResolvedValueOnce);
  bonus.forEach(LottoInputView.prototype.bonus.mockResolvedValueOnce);
  retry.forEach(LottoInputView.prototype.retry.mockResolvedValueOnce);
};

export default mockInput;
