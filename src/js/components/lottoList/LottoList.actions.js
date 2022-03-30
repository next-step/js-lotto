import { $, $all, $elementToggleClass } from '../../helper/index.js';

export const toggleShowLottoNumber = ({ target: _toggleButton }) => {
  if (!_toggleButton.matches('[data-props="toggle-button"]')) return;
  $all('.lotto-numbers').forEach(item => $elementToggleClass(item, 'd-none'));
  $elementToggleClass($('.lotto-list'), 'flex-col');
};
