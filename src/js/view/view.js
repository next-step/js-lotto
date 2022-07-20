
const $lottoTicketList = document.querySelector('.lotto-ticket-list')
const $lottoCountLabel = document.querySelector('.lotto-count-label')
const $lottoToggleBtn = document.querySelector('.lotto-numbers-toggle-button')
const $lottoHidden = document.querySelector('.lotto-hidden')
const $lottoTickets = document.getElementById('lotto-ticket-list');
let $lottoNums = document.getElementsByClassName('lotto-numbers');

export const displayLottoLabel = lottoCntLabel => {
	$lottoCountLabel.innerText = `총${lottoCntLabel}개의 복권을 구입했습니다.`
}

export const lottoHidden = isHidden => {
	$lottoHidden.hidden = isHidden
}

export const displayToggleBtn = state => {
	debugger
	if(state.lottoToggle) {
		setHiddenNumber(true)
	} else {
		setHiddenNumber(false)
	}
	
}
export const removeAllLottoTickets = () => {
	while($lottoTickets.hasChildNodes()) {
		$lottoTickets.removeChild($lottoTickets.firstChild);
	}
	
}
export const resetToggleBtn = () => {
	$lottoToggleBtn.checked = false;
}

export const generateLottoTicket = (lottoNums) => {
	const $icon = document.createElement('li');
	$icon.classList = 'mx-1 text-2xl';
	$icon.innerText = '🎟️';
	const $lottoNums = document.createElement('span');
	$lottoNums.classList = 'lotto-numbers hidden-number'
	$lottoNums.innerText = Array.from(lottoNums).join(',');
	// $lottoNums.setAttribute('hidden', true)

	$icon.appendChild($lottoNums)
	$lottoTickets.appendChild($icon)
	
	return $lottoTickets;
}

const setHiddenNumber = (hidden) => {
	Array.from($lottoNums).map(lottoNum => {
		if(!hidden) {
			lottoNum.classList.remove('hidden-number')
		}else {
			lottoNum.classList.add('hidden-number')
		}
	})
	
}