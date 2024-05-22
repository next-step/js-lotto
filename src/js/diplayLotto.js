export function displayLottoTickets(machine) {
    const lottoNumbersDiv = document.querySelector('.lotto-numbers');
    lottoNumbersDiv.innerHTML = ''; // 기존 티켓을 지우고 새로 시작
    const divItem = machine.getLottos().map((lotto) => `<div>🎟️ <span>${lotto} </span></div>`);
    lottoNumbersDiv.innerHTML = divItem.join('');
}

export function resetLottoTickets() {
    const lottoNumbersDiv = document.querySelector('.lotto-numbers');
    lottoNumbersDiv.style.display = 'none';
}
