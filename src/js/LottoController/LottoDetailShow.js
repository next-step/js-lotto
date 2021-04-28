import {onToggle, offToggle} from './ToggleController.js';
import {$lottoIcons} from '../utils/doms.js';

export const onLottoDetailShow = () => {
    if ($lottoIcons.classList.contains('flex-col')) {
        return offToggle();
    }
    onToggle();
};
