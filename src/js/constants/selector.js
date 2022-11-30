import {$, $$} from "../utils/index.js";

export const selector = {
  purchaseSection: $(".purchase-section"),

  lottoContainer: $(".lotto-container"),
  lottoCounter: $(".lotto-amount"),

  paymentForm: $(".payment-form"),
  paymentInput: $(".payment-input"),

  toggleBtn: $(".lotto-toggle-button"),

  winningForm: $(".winning-number-form"),
  winningInput: $$(".winning-number"),
  bonusInput: $(".bonus-number"),

  modalOpen: $(".modal"),
  modalClose: $(".modal-close"),

  allReset: $(".reset"),
};

export const winningSelector = {
  earningRation: $(".profit"),
};
