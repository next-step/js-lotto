export default class DuplicateBonusNumberException extends Error {
    constructor() {
        super(`보너스 번호가 당첨 번호와 중복됩니다.`);
    }
}