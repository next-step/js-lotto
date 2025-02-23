class RenderPage {

    static LOTTO_CONTENT_ID = "lottos";
    static LOTTO_COUNT_CONTENT_ID =  "lottoCount";
    static MODAL_PAGE_ID = "modal";
    static TABLE_BODY = "table tbody";
    static RATE_OF_RETURN_CONTENT_ID = "rateOfReturn";
    static BONUS_NUMBER_CONTENT_ID = "bonusNumber";

    renderLottoList(lottoMachine) {
        const lottos = document.getElementById(RenderPage.LOTTO_CONTENT_ID);

        document.getElementById(RenderPage.LOTTO_COUNT_CONTENT_ID).textContent = "총" + lottoMachine.lottoNum + "개을 구입하였습니다.";

        lottoMachine.lottosValue.forEach(lotto => {
            const li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.textContent = lotto.join(', ');
            lottos.appendChild(li);
        });
    }

    openModal(lottoConfirmation, money) {
        const modal = document.getElementById(RenderPage.MODAL_PAGE_ID);

        const tbody = modal.querySelector(RenderPage.TABLE_BODY);

        tbody.innerHTML = '';

        const rows = [
            { count: 3, prize: 5000, value: lottoConfirmation.lottoResults.get(3) || 0 },
            { count: 4, prize: 50000, value: lottoConfirmation.lottoResults.get(4) || 0 },
            { count: 5, prize: 1500000, value: lottoConfirmation.lottoResults.get(5) || 0 },
            { count: "5+보너스볼", prize: 30000000, value: lottoConfirmation.lottoResults.get(6) || 0 },
            { count: 6, prize: 3000000000, value: lottoConfirmation.lottoResults.get(7) || 0 }
        ];

        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${row.count}개</td>
            <td>${row.prize.toLocaleString()}</td>
            <td>${row.value}개</td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById(RenderPage.RATE_OF_RETURN_CONTENT_ID).textContent = "당신의 총 수익률은 " + lottoConfirmation.calculateRateOfReturn(money) + "% 입니다.";

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
        document.getElementById(RenderPage.BONUS_NUMBER_CONTENT_ID).value = '';
    }
}

export default RenderPage;