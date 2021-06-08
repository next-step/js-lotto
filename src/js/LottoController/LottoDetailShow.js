import {onToggle, offToggle} from './ToggleController.js';
import {$lottoIcons} from '../utils/doms.js';
import {FLEX_COL} from '../utils/constants.js';

export const onLottoDetailShow = () => {
    if ($lottoIcons.classList.contains(FLEX_COL)) {
        return offToggle();
    }
    onToggle();
};
