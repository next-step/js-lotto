<!-- https://github.com/DanWBR/dwsim/blob/windows/CODE_GUIDE.md -->
<!-- 위와 같이 코드 가이드라인 작성 -->

- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현

- 자바스크립트 코드 컨벤션을 지키면서 프로그래밍 한다

  - Google JavaScript Style Guide

    - 2025.02.07일 기준 홈페이지에서 더 이상 업데이트 되지 않는다고 선언함

  - Airbnb JavaScript Style Guide()

    - 이것을 기준으로 채택하자
    - 널리 사용되고, Google JS 보다 더 엄격해서 선정
    - https://github.com/airbnb/javascript?tab=readme-ov-file#types

  - JavaScript Standard Style
  - NHN FE개발랩

- indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.

  - 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.

- 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메소드)를 분리하면 된다.

- 함수(또는 메소드)가 한 가지 일만 하도록 최대한 작게 만들어라. 만약 15줄이 넘어간다면 의심해보기

- 변수 선언시 var 를 사용하지 않는다. const 와 let 을 사용한다.

  - 주로 const를 사용한다 (let보다 우선순위를 높여서 사용)

- import 문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.

  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import

- 함수(또는 메소드)가 한 가지 일만 잘 하도록 구현한다.

---


