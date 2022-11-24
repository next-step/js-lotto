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

## 피드백 요청 사항

✔ LottoInput, LottoResult, LottoGame의 컴포넌트로 분리하려고 했습니다.
✔ Lotto 번호를 생성하는 부분은 LottoGenerator에서 담당하게 두었습니다.
✔ 상태는 각각 LottoInput과 LottoResult이 들고있되, 전달할 상태값은 LottoGame 안에서 prop처럼 전달합니다.

? 상태값을 누가 들고 있는 것이 좋은지 헷갈렸습니다. LottoGame이 전부 들고 있으면서 관리하는 게 좋은지, 각각이 갖고 있는 게 좋을지요
? 테스트 코드를 작성할 때 LottoGenerator에 대한 테스트 코드를 짜거나 컴포넌트를 생성해서 테스트해봐야하는지, 혹은 화면에서 보이는 정보들로만 테스트를 해야할지 헷갈렸습니다. 테스트 종류에 대한 이해가 부족한 탓일까요?

😵 로또 번호에 대한 중복이나 범위값은 테스트해보았지만 "랜덤" 자체에 대한 테스트는 하지 못했습니다
😵 로또 결과에 대한 동적으로 붙히면서 번호보기 체크박스의 css가 안 먹네요

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
