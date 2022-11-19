// 여기서 구입할 금액 입력 담당

const lottoPurchaseContainer = document.getElementById('lotto-purchase');
const costInputElement = lottoPurchaseContainer.getElementsByTagName('input')[0];
const submitButton = lottoPurchaseContainer.getElementsByTagName('button')[0];

costInputElement.setAttribute('required', true);
costInputElement.setAttribute('min', 1000);
costInputElement.setAttribute('max', 100000);

lottoPurchaseContainer.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = costInputElement.value;
  if (!inputVal.match(/[\d]0{3,5}/)) {
    alert('맞지 않습니다!');
    costInputElement.value = null;
    return;
  }

  // 전역 state를 갱신해야 함.
  debugger;
})
