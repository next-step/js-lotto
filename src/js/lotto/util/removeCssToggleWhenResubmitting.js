import { $ } from "../../shared/consts.js";

const $toggle = $('.lotto-numbers-toggle-button');
const $ticketContainer = $('ul[data-ticket]')
export const removeCssToggleWhenResubmitting = () => {
  if ($toggle) {
    $toggle.checked = false
    $ticketContainer.classList.remove('flex-col')
  }
}
