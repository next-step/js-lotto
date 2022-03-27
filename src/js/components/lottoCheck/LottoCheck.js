import { $eventBindedComponent } from '../../helper/dom.js';
import LottoCheckTemplate from './LottoCheck.template.js';

const LottoCheck = $eventBindedComponent(() => {
  const $template = LottoCheckTemplate();
  return [$template];
});

export default LottoCheck;
