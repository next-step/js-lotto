<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">행운의 로또</h2>
<p align="middle">자바스크립트로 구현하는 로또 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# TODO

[x] 처음엔 로또 구입 가격 입력창만 보여야 한다.
[x] 로또 리스트와 내 로또 입력창이 보이지 않아야한다.
[x] 구입 로또, 구입 가격, 내 로또 번호, 결과 값이 모두 초기화 되어 있어야한다.

[x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
[x] 로또 1장의 가격은 1,000원이다.
[x] 구입 가격은 1000원 단위로만 입력할 수 있어야한다.
[x] 소비자는 자동 구매를 할 수 있어야 한다. (6자리 번호를 자동으로 뽑아준다.)
[x] 구입하면 로또 리스트와 내 로또 입력창이 나와야 한다.

[x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

[x] 내 복권 번호를 모두 입력해야 한다.
[x] 내 복권 번호는 중복해선 안된다.
[x] 내 복권 번호를 2자리 입력하면 다음 입력창으로 자동으로 focus되야 한다.
[x] 결과 보기를 하면, 결과 모달을 띄워 보여준다.

[x] 결과 모달에선 3, 4, 5, 5+보너스, 6 갯수를 보여주고, 구입 금액에 다른 수익률을 보여줘야한다.
[x] 결과 모달의 x 버튼이나 바탕을 클릭하면 모달은 사라진다.
[x] 결과 모달의 다시하기 버튼을 누르면, 구입한 로또, 입력한 로또, 구입 금액, 결과가 모두 초기화 되고 로또 리스트와 내 로또 창이 사라지고 다시 게임이 시작된다.

[x] 가독성을 위해 naming과 file structure를 통일한다.

[x] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

# 실행

아래 스크립트로 live-server와 cypress test까지 모두 실행됩니다.

```
$ npm i

$ npm run test
```
