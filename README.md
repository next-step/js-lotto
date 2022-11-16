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

<p align="middle">
  <a href="https://next-step.github.io/js-lotto">🖥️ 데모 링크</a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-lotto/issues)에 등록해주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/next-step/js-lotto/blob/main/LICENSE) licensed.

## 🎯 step1 요구사항
1. 구입 금액 입력 기능
- [x] 구입 금액 칸에 로또 구입 금액을 입력하고 엔터키 입력으로 금액에 해당하는 로또를 발급해야 한다.
- [x] 구입 금액 칸에 로또 구입 금액을 입력하고 확인 버튼으로 금액에 해당하는 로또를 발급해야 한다.
  - [x] 로또 구입 금액의 단위는 1000원이다.
  - [x] 로또 구입 금액은 숫자만 입력해야 한다.
2. 구입하고 나서 화면 표시 기능
- [] 총 로또 구입 갯수를 화면에 표시한다.
- [] 구입 갯수만큼 로또 그림을 화면에 표시한다.
3. 번호 보기 기능
- [] 번호보기 토글 버튼을 클릭하면 로또 그림 옆에 랜덤한 6개의 숫자를 화면에 표시한다.
4. 테스트
- [] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.