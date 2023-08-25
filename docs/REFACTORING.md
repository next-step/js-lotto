# 🔧 기능별 리팩토링 고려 지점

💡 프로덕션 코드와 테스트 코드의 리팩토링 방향성 우선순위를 다르게 가져가자.

- 프로덕션 코드: (1) 재사용성 (2) 가독성 (3) 성능
- 테스트 코드: (1) 가독성 (2) 재사용성 (3) 성능
  💡 가독성을 위해 함수/변수명 네이밍에 의도를 드러내자.
  💡 리팩토링은 기능 단위로 하자. 너무 뚱뚱하면, 힘들다.

[all] 추가 반영 사항.
[X] Test layer와 product layer 분리.
[X] MVC 패턴 -> Domain, View, LotteryPlatform 분리.
[X] Runtime Error - Custom Error 상속 구조.
[X] View에서 string으로 반등 데이터 변환 로직을 Controller단에 구현.

### Models

[feature1] 로또 한 장 발행.
[X] 전략 패턴 사용해, IssueStrategy로 예측 불가능한 부분 분리.

[feature2] 로또 당첨 여부 확인.
[X] 로또 - 당첨 로또 상속 구조 도입.

[feature3] 누적 수익률과 당첨 통계 반환.
[X] ResultChecker 객체에서 수익률 계산하는 로직 RevenueCalculator로 분리.

### View

[createView] View 생성
[x] 이벤트 핸들러 비동기 처리.

### Controller

[LotteryPlatform] Models와 View 중개자
[X] View readLine 인터페이스에서 string으로 받은 데이터 적절한 타입 변환 수행.

## ❓ 기능별 질문 사항

[feature1] 로또 한 장 발행.
[V] 단위 테스트의 범위

[feature2] 로또 당첨 여부 확인.
[V] 예측 불가능한 부분 분리의 순기능 <-> 배보다 배꼽이 큰가?
[V] test code에서 식별자 유효 범위.
[V] issueStrategy, Lotto의 중복 체크. -> Lotto 객체에서도 유효성 검증. issue에서도 유효성 검증 필요하다고 생각.

[Controller] LotteryPlatform.
[X] View readLine 인터페이스에서 string으로 받은 데이터 변환 위치 적절한지.

## 🤔 개선하고 싶은 부분

[ ] while문 없애기
