/**
 * 사용자 임의의 메시지를 전송한다.
 * @param {string} message 출력할 메시지 *기본 값: 공백("")
 */
export const printMessage = (message = '') => {
  console.log(message);
};

/**
 * 메시지 리스트를 순회하며 메시지를 출력한다.
 * @param {array} messageList 순회 할 메시지 리스트
 * @param {boolean} withLineBreak 메시지 요소 사이에 공백을 추가할지 여부
 */
export const printMessageList = (messageList, withLineBreak = true) => {
  messageList.forEach((item) => {
    if (withLineBreak) {
      printMessage();
    }

    printMessage(item);
  });
};
