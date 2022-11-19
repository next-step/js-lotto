const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);

// 로또 구입 금액 영역
export const $confirmButton = querySelector('.btn-confirm');
export const $purchasingAmountInput = querySelector('.input-purchasing-amount');

// 로또 구입 확인 영역
export const $resultSection = querySelector('.result-section');
export const $lottoNumbersToggleButton = querySelector('.lotto-numbers-toggle-button');
export const $winningForm = querySelector('.winning-form');
export const $winningNumbers = querySelectorAll('.winning-number');
export const $bonusNumber = querySelector('.bonus-number');
export const $resultAreas = [$resultSection, $winningForm];

// 당첨결과 확인 영역
export const $showResultButton = querySelector('.open-result-modal-button');
export const $modal = querySelector('.modal');
export const $modalClose = querySelector('.modal-close');
export const $restart = querySelector('.btn-restart');
export const $earningRate = querySelector('span.earning-rate');
