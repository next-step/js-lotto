export default class NotExistBonusNumberException extends Error {
    constructor() {
        super("보너스 당첨 번호가 입력되지 않았습니다.");
    }
}