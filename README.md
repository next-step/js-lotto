<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">행운의 로또 - 조기문 </h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션 </p>

# 주안점
- MV* 패턴 적용하기.
  - 이번에 공부하고 처음 적용해봐 MVC인지 MVP인지 약간 모호하다
  - 그러나 확실히 역할 분담은 되는 것 같다. 
  - 첫 온보딩 미션(계산기)에서는 한 곳에서 모든 작업이 일어났는데, 지금은 어느정도 역할분담이 된 것 같다. <br/>
    -> __step1 -> step2 -> step3 넘어가면서 기능을 계속해서 추가했는데, 역할 분담이 나름 잘 돼 큰 무리 없이 기능을 추가 할 수 있었던 것 같다.__  
- 상수 적극적으로 사용하기
  - DOM 부터 Message 등 많은 부분에서 상수를 사용했다
  - 작업 시간은 증가했지만 오타에 대한 걱정을 많이 덜을 수 있었고, 좀 더 타입 세이프한 코드가 된 것 같다. 
- 임시 변수 최소화 하기
- `innerHTML` 사용 자제하기
  - 보안상의 문제가 있을 수 있고, 성능적으로도 조금 떨어지는 `innerHTML` 대신 다른 방법들을 사용했다.  
- 커맨드 사용해서 테스트 하기
  - `Cypress.Commands` 기능을 이용해 테스트를 작성했다. 
  - 고민한 부분은 __어디까지 Commands에 들어가야하냐__ 였는데, 재남님의 리뷰를 보니 __테스트는 포함하지 않는 것이 좋다고 생각하신다고 한다__. 확실히 테스트까지 Command에 포함시켜버리면 테스트를 보기 더 어려울 것 같다.


# 데모 페이지
[바로가기](https://guymoon.github.io/js-lotto/)
# 웹 VS코드 환경
[바로가기](https://github.dev/guymoon/js-lotto/tree/guymoon-step3)

# 요구 사항

## STEP 3
1) 구입 기능
- [x] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
- [x] 수동 구매를 위한 input UI는 스스로 구현한다.
- [x] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [x ]위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.
2) 배포
- [x] 실행 가능한 페이지에 접근할 수 있도록 github page 기능을 이용하고, 해당 링크를 PR과 README에 작성한다.

# STEP3에서 반영해본 것
- 포맷터 도입.
- form 태그에 사용되는 `HTMLElement.value = ''` 대신 `.reset()` 사용.
- `DOMContentLoaded` 이벤트 별도로 사용 할 필요 없게 `defer` 속성 추가.
- `Array.from(Array(this.data.amount)).map` -> `[...Array(this.data.amount)].map` 더 간략하게 리팩토링.
- `show()`, `hide()` 최대한 유틸로 사용하게 하도록 리팩토링.

# 궁금한 것
## 프로퍼티 초기화 위치 
스텝2에서 프로퍼티 초기화에 대해서 언급해 주셨는데요! 제가 이 작업을 아래 코드같이 `init()`으로 생성자에서 `init()`을 호출해 주는 방식으로 구현했습니다. 
```js
export default class Model {
  constructor() {
    this.init();
  }

  init() {
    this.data = {
      amount: 0,
      totalPrize: 0,
      profit: 0,
      lottos: [],
    };
```
여기서 init으로 따로 뺀 이유는 나중에 특정 이벤트가 발생했을 때 초기화를 해줘야하는 작업이 필요했기 때문인데요. 이 부분은 어떻게하면 좋을까요? ㅜㅜ 이 부분은 어떻게 해결하면 좋을지 여쭙고싶습니다. 이게 최선은 아닌 걸 알겠는데 어떻게 해결해야할지 잘 모르겠네요ㅜㅜ 

## 
`model.js`
```js
 setResult(winningNumbers, bonusNumber) {
    this.data.lottos.forEach(lotto => {
      switch (countSameNumbers(lotto, winningNumbers)) {
        case 6:
          this.data.result[PRIZE_TITLE.FIRST]++;
          this.data.totalPrize += PRIZE.FIRST;
          break;
        case 5:
          if (lotto.includes(bonusNumber)) {
            this.data.result[PRIZE_TITLE.SECOND]++;
            this.data.totalPrize += PRIZE.SECOND;
            return;
          }
          this.data.result[PRIZE_TITLE.THIRD]++;
          this.data.totalPrize += PRIZE.THIRD;
          break;
        case 4:
          this.data.result[PRIZE_TITLE.FOURTH]++;
          this.data.totalPrize += PRIZE.FOURTH;
          break;
        case 3:
          this.data.result[PRIZE_TITLE.FIFTH]++;
          this.data.totalPrize += PRIZE.FIFTH;
          break;
      }
    });
  }

  setProfit() {
    this.data.profit =((this.data.totalPrize - (this.data.amount * LOTTO_PRICE)) / (this.data.amount * LOTTO_PRICE)) * 100;
  }

  setProfitMessage($profitMessage) {
    $profitMessage.innerText = `당신의 총 수익률은 ${this.data.profit}% 입니다.`;
  }
```
위 코드는 model에 위치한 코드인데요! model에서 관리하는 data에 직접적으로 영향을 주는 부분이라 생각해 model 안에 위치시켰습니다(특정 상황마다 달리 보여줘야 하는 데이터라면 model에서 관리하게끔 했습니다.). 근데 이 부분이 얼핏 보면 view의 작업을 하는 것 같아 조금 애매합니다. 이 부분에 대해 어떻게 생각하시는지 여쭙고 싶습니다! 

# STEP3에서 배운 것 
## 1. 자식 노드 삭제 할 때 innterHTML vs removeChild
`parent.innerHTML = '';` 은 자식 노드의 이벤트 핸들러는 삭제하지 않아 memory leak을 야기 할 수 있다. 그러므로 `parent.removeChild` 를 권장한다. 

(자식노드 전체 삭제)
```js
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
```

## 2. `.style.display = ''`
- 기존 display 속성 (원래 해당 박스 모델의 속성 + CSS 속성)으로 돌아가게 된다.

## 3. cypress에서 자식 노드 순회
```js
Cypress.Commands.add('typeSelfLottoNumber', (numbers) => {
  cy.get(DOM_ID.SELF_LOTTO_LIST).children().each(($el, index, $list) => {
    $el.children().each((index, $input) => {
      cy.wrap($input).type(numbers[index]);
    });
  });
});
위와 같은 방법으로 자식 노드를 순회 가능하다.
```
- cy.wrap() : Yield the object passed into .wrap(). If the object is a promise, yield its resolved value.
- each(): 순회를 가능하게 한다. 

감사합니다 :) 


## 📝 License

This project is [MIT](https://github.com/next-step/js-lotto/blob/main/LICENSE) licensed.
  
