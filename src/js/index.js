// [] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// [] 로또 1장의 가격은 1,000원이다.
// [] 소비자는 자동 구매를 할 수 있어야 한다.
// [] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
