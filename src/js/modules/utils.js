const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function getRandomIntInclusive(min = 1, max = 45) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function getLottoNumbers() {
  const lottoSet = new Set()
  while(lottoSet.size < 6) {
    lottoSet.add(getRandomIntInclusive(1, 45))
  }
  return Array.from(lottoSet).sort((a, b) => a-b)
}

export {$, $$, getLottoNumbers}
