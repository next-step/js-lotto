
const $lottoTicketList = document.querySelector('.lotto-ticket-list')
const $lottoCountLabel = document.querySelector('.lotto-count-label')
const $lottoToggleBtn = document.querySelector('.lotto-numbers-toggle-button')
const $lottoHidden = document.querySelector('.lotto-hidden')

export const displayLottoLabel = lottoCntLabel => {
	$lottoCountLabel.innerText = `총${lottoCntLabel}개의 복권을 구입했습니다.`
}

export const lottoHidden = isHidden => {
	$lottoHidden.hidden = isHidden
}

export const displayToggleBtn = state => {
	//lottoToggle = false일때 보여주고
	//lottoToggle = true일떄 hidden
}


