import { $ } from "../../shared/consts.js"

export const tagsVisibleWhenValidationPasses = () => {
  [$('#purchased-lottos'), $('#lotto-winning-numbers-form')].map(tag => {
    if (tag.style.display === "block") tag.style.display = 'none'
  })
}
