const lottoTemplate = (lotto) => {
  return (
    `
      <span class="mx-1 text-4xl">🎟️ </span>
      <span class="lotto-detail" style="display: none;">${lotto}</span>
    `
  )
}

export default lottoTemplate;