<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
<img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
<img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
<a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
  <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

### 데모 페이지 : [행운의 로또](https://devhyun637.github.io/javascript-lotto/)

### 🎯🎯 step2 당첨 결과 기능

- [x] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [x] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### ✅ 2단계 미션 TODO

**기능 구현 목록**

- [x] 지난 주 당첨 숫자를 입력한다.
  - [x] 두개의 숫자를 입력하면, 자동으로 다음 숫자 칸으로 focus가 이동한다.
  - [x] 1에서 45 사이의 숫자만 입력할 수 있다.
  - [x] 중복된 숫자는 입력할 수 없다.
- ~~[x] 모든 숫자의 입력을 완료하면, 결과 확인 버튼이 활성화된다.~~
- [x] 결과 확인 버튼을 누르거나, 마지막 보너스 숫자에서 enter key를 눌러 당첨 숫자를 입력받는다.
  - [x] 구매한 로또와 당첨 번호를 비교한다.
  - [x] 당첨 개수를 계산한다.
  - [x] 수익률을 계산한다.
  - [x] 당첨 개수와 수익률을 modal을 통해 화면에 띄운다.
    - [x] modal X를 누르면 modal이 닫힌다.
    - [x] modal 영역 밖을 click하면 modal이 닫힌다.
- [x] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.
  - [x] 로또 금액 입력 칸과 당첨 숫자 입력 칸이 초기화 된다.

**Cypress 테스트**

- 정상 로직
  - [x] 모든 숫자의 입력을 완료하면, 결과 확인 버튼이 활성화된다.
  - [x] 두개의 숫자를 입력하면, 자동으로 다음 숫자 칸으로 focus가 이동한다.
  - [x] 결과 확인 버튼을 누르면 modal 창이 보인다.
  - [x] modal의 X 버튼을 누르면 modal 창이 닫힌다.
  - [x] modal 영역 밖을 click 하면 modal 창이 닫힌다.
  - ~~[ ] modal은 당첨 개수와 수익률을 보여준다.~~
  - [x] 임의의 로또 번호에 대하여 당첨 개수를 올바르게 계산하여 보여준다.
  - [x] 임의의 로또 번호에 대하여 수익률을 올바르게 계산하여 보여준다.
  - [x] 다시 시작하기 버튼을 누르면 프로그램 input이 모두 초기화된다.
- 예외상황
  - 금액 입력 예외상황
    - ~~[ ] 입력할 수 있는 당첨 숫자의 범위는 1 ~ 45 사이이다.~~
    - [x] 중복된 숫자는 입력할 수 없다.

### 🎯 step1 구입 기능

- [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [x] 로또 1장의 가격은 1,000원이다.
- [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
- [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### ✅ 1단계 미션 TODO

**🎰 로또 🎰**

1번부터 45번까지의 공 중에서 6개를 추첨하고, 이어서 보너스 번호로 공 1개를 추가로 추첨한다. 즉 1번부터 45번까지 중에서 6개를 추첨한 후 또 다시 1개를 추첨하는 것이다. 물론 이 번호들은 **중복된 번호**가 없다.

**기능 구현 목록**

- [x] 프로그램을 시작하면 구입금액 입력폼이 보인다.
  - [x] 프로그램을 시작 시 입력칸에 autofocus가 된다.
  - [x] 사용자가 라벨을 선택해도 입력칸에 autofocus를 해준다.
- [x] 사용자는 로또 구입 금액을 입력한다.
  - [x] Enter로 금액을 입력할 수 있다.
  - [x] 확인 버튼으로 금액을 입력할 수 있다.
  - [x] 로또 구입 금액은 1,000원 단위여야 한다.
  - [x] 로또 구입 금액은 최소 1,000원, 최대 100,000원으로 제한한다.
  - [x] 로또 구입 금액을 잘못 입력했을 경우, alert로 사용자에게 알린다.
- [x] 사용자가 구매한 로또의 개수를 보여주고, 개수만큼 티켓 이모지를 가로로 보여준다.
  - [x] 구매한 번호는 가려져 있는 모습을 default로 한다.
- [x] '번호 보기'를 눌렀을 때, 각 로또의 번호를 보여준다.
  - [x] 로또의 각 번호는 중복이 존재하지 않는다.
- [x] 지난주 당첨 번호 입력 폼을 보여준다. (기능 구현 X)

**Cypress 테스트**

- 정상 로직

  - [x] 프로그램을 시작하면 구입금액 입력폼이 보인다.
  - [x] 사용자는 로또 구입 금액을 입력한다.
  - [x] 사용자가 구매한 로또의 개수를 보여주고, 개수만큼 티켓 이모지를 가로로 보여준다. 지난주 당첨 번호 입력 폼을 보여준다.
  - [x] '번호 보기'를 눌렀을 때, 로또 아이콘을 세로로 정렬한다.
  - [x] '번호 보기'를 눌렀을 때, 각 로또의 번호를 보여준다. (로또의 번호는 중복이 없어야 한다)

- 예외상황
  - 금액 입력 예외상황
    - [x] 사용자가 금액을 1,000원 단위로 입력하지 않은 경우, alert로 알린다.
    - [x] 구매 가능 금액은 최소 1,000원, 최대 100,000원으로 제한한다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
