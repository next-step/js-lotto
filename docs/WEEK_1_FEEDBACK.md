## 1주차 과제 복기

- 역할과 책임의 경계에 대한 고민

  - 하나의 클래스는 해당 도메인만 관리해야 한다

  - 하나의 함수는 하나의 일만 해야한다

- 요구 사항을 실현하기 위해 어떤 도메인 & 어떤 객체가 필요할지 고민

- 객체의 불변성을 보장할 수 있도록 습관을 들여보는 것

- parameter가 여러개일 때는 가독성과 사용성을 위해 객체로 parameter를 받는 방법도 고려해보자

- FSD (https://feature-sliced.design/)

  - FSD의 원리를 이해해서, 폴더 및 파일 구조에 적용해보면 어떨까

- 테스트 코드

  - 해당 조건을 기준으로 성공/실패 케이스를 나누어 볼 것

  - 단언적으로 작성하는 습관을 들인다.

  - 경계값 - 1, 경계값 + 1을 활용해서 변수 설정 시 테스트를 해본다.

```js
if (!validateFn()) throw Error(errorMessage);

setWinningNumber(winningNumber);
```

- winningNumber 로직과 predicate, errorMessage가 분리되어서 더 좋아보임

  - 현재는 constructor에 해당 validation check 작성하였습니다.
