import { makeDataAttributeIdForm } from '../utils/index.js';

export const ELEMENT_DATA_ID = {
  OPEN_RESULT_MODAL_BUTTON: 'open-result-modal-button',
  LOTTO_NUMBER_INPUT: 'lotto-number-input',
  LOTTO_IMAGE_WRAPPER: 'lotto-image-wrapper',
  RESULT_TEXT: 'result-text',
  NUMBER_TOGGLE_BUTTON: 'number-toggle-button',
  LOTTO_SUBMIT_BUTTON: 'lotto-submit-button',
  MODAL_RESULT_TABLE_BODY: 'modal-result-table-body',
  INVESTMENT_RETURN: 'investment-return',
  RESTART_BUTTON: 'restart-button',
  MODAL_CLOSE_BUTTON: 'modal-close-button',
  MANUAL_SUBMIT_BUTTON: 'submit-manual-number-button',
};

export const ELEMENT_DATA_ID_FORM = makeDataAttributeIdForm(ELEMENT_DATA_ID);

export const CLICK_EVENT_MAP = new Map();
