import {LottoController} from './LottoController/LottoController.js';
import {ModalController} from './ModalController/ModalController.js';

export const lottoApp = () => {
    LottoController();
    ModalController();
};

window.onload = () => {
    lottoApp();
};
