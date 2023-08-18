import RuntimeError from "../src/js/RuntimeError";
it("RuntimeError 에러 메시지 반환 테스트", () => {
  const message = "RuntimeError 메시지";
  const error = new RuntimeError(message);
  expect(error.getMessage()).toBe(message);
});
