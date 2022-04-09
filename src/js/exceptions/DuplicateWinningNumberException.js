export default class DuplicationWinningNumberException extends Error {
    constructor() {
        super(`중복되는 당첨번호가 존재합니다.`);
    }
}