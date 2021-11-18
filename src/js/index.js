import MainController from './controller/MainController.js';
import { $ } from './utils/utils.js';

new MainController({
  purchaseFormSection: $('#purchaseFormSection'),
  purchasedLottoSection: $('#purchasedLottoSection'),
  winningNumberFormSection: $('#winningNumberFormSection'),
  resultModalSection: $('#resultModalSection')
});
