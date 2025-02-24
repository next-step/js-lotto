class RenderPage {

    static LOTTO_CONTENT_ID = "lottos";
    static LOTTO_COUNT_CONTENT_ID =  "lottoCount";
    static MODAL_PAGE_ID = "modal";
    static TABLE_BODY = "table tbody";
    static RATE_OF_RETURN_CONTENT_ID = "rateOfReturn";
    static BONUS_NUMBER_CONTENT_ID = "bonusNumber";
    static MONEY_INPUT_ID = "money";

    renderLottoList(lottoMachine) {
        const lottos = document.getElementById(RenderPage.LOTTO_CONTENT_ID);

        document.getElementById(RenderPage.LOTTO_COUNT_CONTENT_ID).textContent = "총 " + lottoMachine.lottoNumber + "개를 구입하였습니다.";

        lottoMachine.lottosValue.forEach(lotto => {
            const li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.textContent = lotto.join(', ');
            lottos.appendChild(li);
        });
    }

    openModal(lottoResultItem) {
        const modal = document.getElementById(RenderPage.MODAL_PAGE_ID);
        const tbody = modal.querySelector(RenderPage.TABLE_BODY);

        tbody.innerHTML = '';

        lottoResultItem.items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${item.count}개</td>
            <td>${item.prize.toLocaleString()}</td>
            <td>${item.value}개</td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById(RenderPage.RATE_OF_RETURN_CONTENT_ID).textContent = "당신의 총 수익률은 " + lottoResultItem.rateOfReturn + "% 입니다.";

        modal.style.display = "block";
    }

    closeModal() {
        const modal = document.getElementById(RenderPage.MODAL_PAGE_ID);
        modal.style.display = "none";
    }

    clearInput() {
        document.getElementById(RenderPage.LOTTO_CONTENT_ID).innerHTML = '';
        document.getElementById(RenderPage.LOTTO_COUNT_CONTENT_ID).innerHTML = '';
        document.querySelectorAll(".winning-numbers-container input[type='number']").forEach(input => {
            input.value = '';
        });
        document.getElementById(RenderPage.BONUS_NUMBER_CONTENT_ID).value = "";
        document.getElementById(RenderPage.MONEY_INPUT_ID).value = "";
        
    }
}

export default RenderPage;