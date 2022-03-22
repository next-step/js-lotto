import { $eventBindedComponent } from '../../helper/dom.js';
import LottoCheckTemplate from './LottoCheckTemplate.js';

const LottoCheck = $eventBindedComponent(() => {
  const $template = LottoCheckTemplate();
  return [$template];
});

export default LottoCheck;
