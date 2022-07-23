const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getDrawNumber = (max, array) => {
  const randomNumber = getRandomInt(max);
  return array.splice(randomNumber, 1);
};

export const getObjectConvertArrayToHtmlText = (array) => {
  const title = `<div>총 ${array.length}개를 구매하였습니다.</div>`;
  const [show, hide] = array.reduce(
    ([show, hide], item) => {
      show.push(`<div>🎟️${item}</div>`);
      hide.push(`<div>🎟️</div>`);
      return [show, hide];
    },
    [[], []]
  );

  return { title, show: show.join(''), hide: hide.join('') };
};
