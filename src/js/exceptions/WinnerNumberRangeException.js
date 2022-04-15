import WinningNumbers from "../domain/WinningNumbers";

export default class WinnerNumberRangeException {
    constructor() {
        super(`당첨 번호는 ${WinningNumbers.WINNER_MIN_NUMBER} ~ ${WinningNumbers.WINNER_MAX_NUMBER} 사이로 입력해야합니다.`);
    }
}