import  * as elements from "./Elements.js";

class RenderPage {

    renderLottoList(lottoMachine) {
        const lottos = elements.getLottosElements();

        lottoMachine.lottos.forEach(lotto => {
            const li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.textContent = lotto.join(', ');
            lottos.appendChild(li);
        });

        elements.getLottoCount().textContent = "총" + lottoMachine.lottoNum + "개을 구입하였습니다.";
    }

    openModal(lottoConfirmation) {
        const modal = elements.getModalElements();

        const tbody = modal.querySelector("table tbody");

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

        elements.getRateOfReturnElements().textContent = "당신의 총 수익률은 " + lottoConfirmation.totalPrize + "% 입니다.";

        modal.style.display = "block";
    }

    closeModal() {
        const modal = elements.getModalElements();
        modal.style.display = "none";
    }

    clearInput() {
        elements.getLottosElements().innerHTML = '';
        elements.getLottoCount().innerHTML = '';
        elements.getWinningNumber().forEach(input => {
            input.value = '';
        });
        elements.getBonusNumElements().value = '';
    }
}

export default RenderPage;