export function getBonusNumber() {
    const bonusInput = document.querySelector('.bonus-number');
    return bonusInput.value;
}

export function rsetBonusNumber() {
    const bonusInput = document.querySelector('.bonus-number');
    bonusInput.value = '';
}
