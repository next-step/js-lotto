export default class WinnerNumberLengthException extends Error {
    constructor() {
        super("입력되지 않은 당첨 번호가 존재합니다.");
    }
}
