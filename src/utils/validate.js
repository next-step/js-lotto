const LottoValidator = {
    amountValidate(amount){
        if (isNaN(amount) || amount <= 0) {
            throw new Error("유효하지 않은 입력입니다. 1 이상의 숫자를 입력해주세요.")
        }
        return amount
    },
    
}
module.exports = LottoValidator;