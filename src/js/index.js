import {LottoController} from './LottoController/LottoController.js';
import {ModalController} from './ModalController/ModalController.js';

export const todoApp = () => {
    LottoController();
    ModalController();
};

window.onload = () => {
    todoApp();
};
