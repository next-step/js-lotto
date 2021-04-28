const { freeze } = Object;

export default freeze({
  ID: freeze({
    APP: 'app',
    PRICE_FORM: 'price-form',
    PURCHASE_DETAILS: 'purchase-details',
    WINNING_FORM: 'winning-form',
    WINNING_RESULT: 'winning-result',
  }),
  KLASS: freeze({
    MODAL: 'modal',
    MODAL_OPEN: 'open',
    MODAL_CLOSE: 'modal-close',
    OPEN_MODAL_BUTTON: 'open-result-modal-button',
  }),
  EVENT: freeze({
    CLICK: 'click',
  }),
});
