const querySelector = (selector) => document.querySelector(selector);
export const querySelectorAll = (selector) => document.querySelectorAll(selector);

// 로또 구입 금액 영역
export const $startButton = querySelector('.btn-start');
export const $purchasingAmountInput = querySelector('.input-purchasing-amount');
export const $checkPurchasingManually = querySelector('.check-purchasing-manually');

// 로또 수동 구매 영역
export const $manualAddButton = querySelector('.btn-manual-add');
export const $manualNumberList = querySelector('.manual-number-list');
export const $confirmButton = querySelector('.btn-confirm');
export const $autoPurchasingInformationPhrase = querySelector('.auto-purchasing-information-phrase');

// 로또 구입 확인 영역
export const $resultSection = querySelector('.result-section');
export const $lottoNumbersToggleButton = querySelector('.lotto-numbers-toggle-button');
export const $purchasingManuallyForm = querySelector('.purchasing-manually-form');
export const $winningForm = querySelector('.winning-form');
export const $winningNumbers = querySelectorAll('.winning-number');
export const $bonusNumber = querySelector('.bonus-number');
export const $resultAreas = [$resultSection, $purchasingManuallyForm, $winningForm];

// 당첨결과 확인 영역
export const $showResultButton = querySelector('.open-result-modal-button');
export const $modal = querySelector('.modal');
export const $modalClose = querySelector('.modal-close');
export const $restart = querySelector('.btn-restart');
export const $earningRate = querySelector('span.earning-rate');
