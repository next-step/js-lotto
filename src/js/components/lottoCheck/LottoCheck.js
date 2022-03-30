import { $eventBindedComponent } from '../../helper/dom.js';
import LottoCheckTemplate from './LottoCheck.template.js';
import { toggleLottoResultModal } from './LottoCheck.actions.js';

const LottoCheck = $eventBindedComponent(() => {
  const $template = LottoCheckTemplate();
  const $events = [{ type: 'click', callback: toggleLottoResultModal }];
  return [$template, $events];
});

export default LottoCheck;
