import { MODAL } from "./constants/selectors.js"
import { $ } from "./util.js"
import { closeModal, showModal } from "./view.js"

export const onClickOpenResultModalBtn = function () {
  showModal($(MODAL));
}

export const onClickCloseResultModalBtn = function () {
  closeModal($(MODAL));
}

export const onClickLottoNumbersToggleBtn = function () {
  console.log('lotto toggle!')
}