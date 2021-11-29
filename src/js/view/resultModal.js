import lottoManager from '../model/lotto.js';

const $modal = document.querySelector('.modal');
const $first = document.querySelector('.js-result-first');
const $second = document.querySelector('.js-result-second');
const $third = document.querySelector('.js-result-third');
const $fourth = document.querySelector('.js-result-fourth');
const $fifth = document.querySelector('.js-result-fifth');
const $profitPercentage = document.querySelector('.js-result-profit-percentage');

export const openModal = () => {
  $modal.classList.add('open');
};

export const closeModal = () => {
  $modal.classList.remove('open');
};

export const updateResultView = () => {
  $first.textContent = lottoManager.result[6];
  $second.textContent = lottoManager.result[5.5];
  $third.textContent = lottoManager.result[5];
  $fourth.textContent = lottoManager.result[4];
  $fifth.textContent = lottoManager.result[3];
  $profitPercentage.textContent = lottoManager.getProfitPercentage();
};
