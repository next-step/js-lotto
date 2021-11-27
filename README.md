<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

<p align="middle">
  <a href="#">🖥️ 데모 링크</a>
</p>

## 🔥 Projects!

### 🎯 1단계 구입기능

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
- [x] 🧪 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

#### `나의 구입기능 정의`

- 로또 1장의 가격은 1000원이다.
- 숫자만 입력 가능하다.
- [x] 로또는 100,000원까지만 구입가능하다.
- [x] 로또 구입 금액을 입력하고 확인 버튼을 누르면 로또가 발급된다.
- [x] 로또 구입 금액을 입력하고 엔터키를 누르면 로또가 발급된다.
- [x] 구매한 만큼의 로또가 화면에 표시된다.
- [x] 로또의 총 개수가 업데이트된다.
- [x] 번호보기를 클릭하면 티켓당 6개의 번호를 볼 수 있다. 번호는 1부터 99까지의 수로 랜덤발급한다.

<br>

### 🎯 2단계 당첨 결과 기능

- [x] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [x] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

#### `나의 기능 정의`

- [x] 당첨번호와 보너스 번호를 입력해야 결과를 확인할 수 있다. (1~99 사이 숫자)
- [x] 내가 구매한 로또와 당첨번호를 비교해 수익률을 계산하여 보여준다.
- [x] 다시 시작하기를 누르면 새로 로또 구입을 시작한다.

<br>

### 🎯 3단계 수동 구입 기능

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - [ ] 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 🧪 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.
- [ ] 배포 : 실행 가능한 페이지에 접근할 수 있도록 github page 기능을 이용하고, 해당 링크를 PR과 README에 작성한다.

#### `나의 기능 정의`

- [ ] 자동으로 구매할 티켓의 개수를 받는 입력창이 있다.
  - 금액에 비해 더 많은 티켓 수를 입력하면 에러 처리
  - 숫자가 아닌 것을 입력하면 에러 처리
- [ ] 개수에 맞게 수동으로 티켓 번호를 입력할 수 있다.
  - 아래에 개수에 맞게 숫자 입력창을 띄운다.
  - 중복 번호, 범위를 벗어난 번호를 입력하면 에러가 발생한다.
- [ ] 남는 금액이 있으면 자동으로 로또를 발급한다.

<br>

## 📝 License

This project is [MIT](https://github.com/next-step/js-lotto/blob/main/LICENSE) licensed.
