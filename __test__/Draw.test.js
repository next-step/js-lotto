import { drawItem, drawUniqueItems } from "../src/js/util/Draw";

describe("뽑기 테스트", () => {
  test("리스트에서 아이템을 뽑아서 리턴한다.", () => {
    //given
    const list = [1, 2, 3];

    //when
    const item = drawItem(list);

    //then
    expect(list).toContain(item);
  });

  test("리스트가 비어있으면 에러를 반환한다.", () => {
    //given
    const list = [];

    //when
    const whenEmptyList = () => drawItem(list);

    //then
    expect(whenEmptyList).toThrow();
  });

  test("리스트에서 중복되지 않는 아이템을 원하는 만큼 뽑는다.", () => {
    //given
    const list = [1, 2, 3];
    const amount = 2;

    //when
    const items = drawUniqueItems(list, amount);

    //then
    items.forEach((e) => expect(list).toContain(e));
  });

  test("리스트의 크기보다 뽑을 아이템 수가 많다면 에러를 반환한다.", () => {
    //given
    const list = [1, 2, 3];
    const amount = 4;

    //when
    const whenTooManyAmount = () => drawUniqueItems(list, amount);

    //then
    expect(whenTooManyAmount).toThrow();
  });
});
