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

[] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
[] 로또 1장의 가격은 1,000원이다.
[] 소비자는 자동 구매를 할 수 있어야 한다.
[] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
[] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

# 설계

전체적으로 Model -> View로 가는 중간에 로직을 넣어 가공하는 형태로 가져간다. = 컴포넌트

## V (컴포넌트)

DOM과 맞닿는 View에 대한 설계.

- 여러 DOM을 담는다. (객체하나가 DOM과 동일해야한다.)
- 다른 View를 자식으로 가질 수 있다.
- 기본적으로 Model을 구독한다. (어떤 Model을 구독할지는 이곳에서 정할 수 있다.)
- 로직에 따라서 동적으로 생성 및 삭제가 가능해야 한다.
- 내가 원하는 (controller)코드를 넣을 수 있어야 한다. (템플릿 메소드를 통한 라이프사이클)
- mounted, unmounted는 아마 알 수 없을 것이다.

## M

State model에 관한 Model에 관한 설명.

- observer 패턴으로 변화가 있을 시에, 구독하고 있는 것들에 알려줘야한다.
- 변화는 특정 메소드 혹은 함수를 통해서만 가능하다. -> 이번엔 Proxy 객체를 사용해서 MobX 스타일로 구현.

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
