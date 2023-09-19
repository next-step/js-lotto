const Lotto = require("../lotto");
const { tableBody, myModal, } = require("../utils/selector");

const ModalView = {
    updateTable() {
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        Lotto.prize.forEach(function (item) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="p-3">${item.rank}</td>
            <td class="p-3">${item.text}</td>
            <td class="p-3">${item.count}</td>
          `;
            tableBody.appendChild(row);
        });
    },
    showMessage(message) {
        alert(message);
    },
    showModal() {
        myModal.classList.remove('displayNone');
        myModal.classList.add('displayShow');
    },
    closeModal(){
        myModal.classList.remove('displayShow');
        myModal.classList.add('displayNone');
    },
    clearModal(){
        this.closeModal();
        tableBody.innerHTML = '';
    }
}
module.exports = ModalView;
