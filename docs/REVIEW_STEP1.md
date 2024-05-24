# 1차 리뷰 240518

- [x] `View`위치 `domain`에서 분리
- [x] `WinningLotto`객체 활용
  - [x] 로또 랭킹 생성
- [x] private state을 가져올 때는 getter 사용 -> private state 값이 외부의 영향을 받을 가능성 존재
- [x] 각 객체의 책임을 부여하라
  - [x] `View`에서 input을 받을 때 `Rule` 검증, domain에서 인스턴스가 생성될 때 `validation` 검증
- [x] 변수명은 혼동의 여지를 주지 않게 부여하라
  - [x] `isBonustMatched`
  - [x] `getLottoReturn`
  - [x] `getTheNumberOfLottos`
- [x] `View`에서 input, ouput을 동시에 해주고 있어 코드 양이 많아졌다.
- [x] `View`에서 domain에 대한 의존이 높다.
- [x] 로또 생성 시, 동일한 로또의 값이 나올 가능성 존재
- [x] `LottoRank`에서 반환하는 과정이 어색하다.
  - [x] Object.values 정의

# 2차 리뷰 240520

- [x] `LottoResult` 값 반환에 대한 수정
- [x] 도메인 최대한 많이 만들어보기
  - [x] 로또 랭크에 대한 도메인
  - [x] 중복되지 않는 로또 숫자 생성기 (Fisher-Yates Shuffle)
- [ ] 객체애 대한 다형성
  - [ ] `Lotto`에 대한 다형성
- [ ] 테스트케이스 보완
  - [ ] `Lotto`
    - [x] 로또 정렬
    - [ ] 로또 검증 --> Output?
  - [x] `LottoMachine`
    - [x] `test.each` 사용
    - [x] `toBe()` 사용법
  - [x] `LottoRank`
    - [x] 로또 랭크 검증
  - [x] `View`
    - [x] 도메인 의존 제거
    - [x] input, output으로 변경

+)

- [ ] `Symbol iterator` 에 대한 공부
- [ ] `Object.defineProperty` 에 대한 공부
