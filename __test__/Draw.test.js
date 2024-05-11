import { drawItem, drawNotDuplicatedItems } from "../src/js/util/Draw";

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

    //when
    const items = drawNotDuplicatedItems(list, list.length);

    //then
    expect(items.sort()).toStrictEqual(list);
  });

  test("이미 중복이 있는 리스트라면 에러를 반환한다.", () => {
    //given
    const duplicatedList = [1, 1, 2];

    //when
    const whenDuplicatedList = () =>
      drawNotDuplicatedItems(duplicatedList, duplicatedList.length);

    //then
    expect(whenDuplicatedList).toThrow();
  });
});
