import LottoNumber from "../domain/LottoNumber.js";

export default class OutOfRangeWinningNumberException extends Error {
    constructor() {
        super(`보너스 번호는 ${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이로 입력해야합니다.`)
    }
}