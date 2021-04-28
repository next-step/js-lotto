import { $, $$ } from "./utils.js"
import { resetHTML } from "./resetHTML.js"
import { getResult } from "./generator.js"
import { renderModal, renderNumbers, renderResult } from "./render.js"

const resetEvent = () => {
    $("#reset").addEventListener("click", function() {
        $("#app").innerHTML = resetHTML
        SubmitEvent();
    })
}

const SubmitEvent = () => {
    $('.btn').addEventListener("click", () => handleSubmitEvent($('#price').value))
    $('#price').addEventListener("keydown", (e) => {e.key==="Enter" ? handleSubmitEvent($('#price').value) : ""})
}

const ToggleEvent = () => {
    $('.lotto-numbers-toggle-button').addEventListener("click", function(){
        $("#lotto-icons").classList.toggle("flex-col")
        Object.values($$(".lotto-detail")).map(function(v){
            v.toggleAttribute("hidden");
        })
    })
}

const ShowResultEvent = () => {
    const $showResultButton = $('.open-result-modal-button')
    const $modalClose = $('.modal-close')
    const $modal = $('.modal')

    const onModalShow = () => {
        $modal.classList.add('open')
    }

    const onModalClose = () => {
        $modal.classList.remove('open')
    }

    $showResultButton.addEventListener('click', function() {
        renderModal(getResult())
        onModalShow()
    })
    $modalClose.addEventListener('click', onModalClose)
}

const handleSubmitEvent = (price) => {
    if( 0 > price || 100000 < price ) return alert("1,000 ~ 100,000 사이의 금액을 입력해주세요.")
    if( price === "" ) return alert("금액을 입력해주세요")
    if( price % 1000 !== 0 ) return alert("1,000원 단위로 입력해주세요")
    renderNumbers(price / 1000);
    renderResult();
}

export { SubmitEvent,ToggleEvent, ShowResultEvent, resetEvent }
