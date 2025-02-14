# JEST

- JEST를 사용하며, 알게된 내용 정리

## JEST Math.random 모킹 방법 - 출처: ChatGPT

- 맞는 방법인지는 검증이 더욱 필요해 보입니다.

`Math.random()`을 포함한 **특정 함수**를 모킹하고자 할 때, 해당 함수에서 사용하는 `Math.random()`을 모킹하는 방법을 살펴보겠습니다. 예를 들어, `Math.random()`을 사용한 `generateRandomNumber` 함수와 같은 경우, `Math.random()`을 모킹하면서 그 함수도 모킹하려면 어떻게 해야 할지 보여드릴게요.

### 예시 코드: `generateRandomNumber` 함수

```javascript
// generateRandomNumber는 Math.random()을 이용해 숫자를 생성합니다.
function generateRandomNumber() {
  return Math.random() * 100; // 0과 100 사이의 숫자 반환
}
```

### `generateRandomNumber` 함수를 포함한 모킹 예시:

#### 방법 1: `jest.spyOn()`을 사용하여 `Math.random()`과 `generateRandomNumber` 함수 모두 모킹하기

```javascript
describe("generateRandomNumber", () => {
  let randomSpy;
  let generateRandomNumberSpy;

  beforeAll(() => {
    // Math.random을 spy하고 모킹
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

    // generateRandomNumber 함수도 모킹 (필요한 경우)
    generateRandomNumberSpy = jest
      .spyOn(global, "generateRandomNumber")
      .mockImplementation(() => 42);
  });

  afterAll(() => {
    // 테스트가 끝난 후, 원래 상태로 복원
    randomSpy.mockRestore();
    generateRandomNumberSpy.mockRestore();
  });

  test("should return 0.5 * 100 when Math.random is mocked", () => {
    const result = generateRandomNumber(); // 0.5 * 100 = 50
    expect(result).toBe(50); // 0.5 * 100 = 50이 반환되어야 함
  });

  test("should return 42 when generateRandomNumber is mocked", () => {
    const result = generateRandomNumber(); // 모킹된 값 42 반환
    expect(result).toBe(42); // 모킹된 값 42이 반환되어야 함
  });
});
```

### 설명:

1. **`jest.spyOn(Math, 'random')`**: `Math.random()`을 모킹하여 항상 `0.5`를 반환하도록 설정합니다. 이렇게 하면 `generateRandomNumber()` 함수가 `Math.random()`을 호출할 때마다 `0.5`를 반환하도록 할 수 있습니다.
2. **`jest.spyOn(global, 'generateRandomNumber')`**: `generateRandomNumber` 함수 자체도 모킹할 수 있습니다. 예를 들어, 특정 조건 하에 이 함수가 `42`를 반환하도록 설정할 수 있습니다. 이 경우, `generateRandomNumber`의 구현을 임의로 변경하여 테스트할 수 있습니다.

3. **`mockRestore()`**: `afterAll()`에서 `mockRestore()`를 호출하여 `Math.random()`과 `generateRandomNumber` 함수를 원래 상태로 복원합니다. 이렇게 하면 다른 테스트나 코드에서 영향을 받지 않게 됩니다.

### 방법 2: 특정 함수 내부의 `Math.random`만 모킹하기

만약 `generateRandomNumber` 함수를 모킹하지 않고, `Math.random`만 모킹하고 싶다면, 다음과 같이 할 수 있습니다:

```javascript
describe("generateRandomNumber", () => {
  let randomSpy;

  beforeAll(() => {
    // Math.random을 spy하고 모킹
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    // 테스트가 끝난 후, 원래 상태로 복원
    randomSpy.mockRestore();
  });

  test("should return 50 when Math.random is mocked", () => {
    const result = generateRandomNumber(); // 0.5 * 100 = 50
    expect(result).toBe(50); // 0.5 * 100 = 50이 반환되어야 함
  });
});
```

이 방법에서는 `generateRandomNumber` 함수 자체를 모킹하지 않고, `Math.random`만 모킹합니다. 이 경우, `generateRandomNumber`의 원래 동작이 그대로 유지됩니다.

### 결론:

- **`jest.spyOn()`**을 사용하면 특정 함수(예: `Math.random` 또는 다른 함수)만 모킹하고, 다른 부분은 그대로 두면서 테스트할 수 있습니다.
- 모킹이 끝난 후 **`mockRestore()`**를 호출하여 원래 상태로 복원하여 다른 테스트에 영향을 주지 않도록 할 수 있습니다.
- 전역 객체나 함수 자체를 모킹하는 것이 아니라, 특정 함수만 모킹하려면 `jest.spyOn()`을 사용하는 것이 안전하고 효과적인 방법입니다.

---

## 비동기 JEST 처리

- https://dev.to/darkmavis1980/how-to-test-an-async-function-to-throw-an-exception-in-jest-3a90

- https://jestjs.io/docs/asynchronous#resolves-rejects

- https://github.com/jestjs/jest/issues/5538#issuecomment-461013424

  - 최대한 공식문서를 참조하여 해결한다


---

## 스펙과 테스트를 먼저 하나하나 정의하고, 구현을 하는 방식 

- 의미 있는 방법론 && 훈련 방식

- 하나의 동작을 기준으로 테스트하기에 용이한 함수를 구현하다보면, 자연스레 좋은 코드를 고민하게 됨 

## 해당 함수에만 관심을 두어야 함

- 관련있는 모듈은 어떻게 해결할 수 있었을까?


- 필요하다면 mock을 해야 함 (가급적 side-effect를 분리하는 방식으로 고민하자)

- 기존 모듈 mocking은 우선 순위를 낮게 고려해보자 
