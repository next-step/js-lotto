import { $renderWithEventBind } from '../../helper/dom.js';
import LottoCheckTemplate from './LottoCheckTemplate.js';

const LottoCheck = $renderWithEventBind(() => {
  const $template = LottoCheckTemplate();
  return [$template];
});

export default LottoCheck;
