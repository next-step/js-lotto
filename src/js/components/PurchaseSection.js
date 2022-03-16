class PurchaseSection {
  render() {
    return `
			<section class="mt-9">
				<div class="d-flex">
					<label class="mb-2 d-inline-block">
						구입할 금액을 입력해주세요.
					</label>
					<div class="flex-auto d-flex justify-end pr-1">
						<label class="switch">
							<input type="checkbox" class="lotto-numbers-toggle-button" />
							<span class="text-base font-normal">번호보기</span>
						</label>
					</div>
				</div>
				<div class="d-flex flex-wrap">
					<span class="mx-1 text-4xl">🎟️ </span>
					<span class="mx-1 text-4xl">🎟️ </span>
					<span class="mx-1 text-4xl">🎟️ </span>
					<span class="mx-1 text-4xl">🎟️ </span>
					<span class="mx-1 text-4xl">🎟️ </span>
				</div>
			</section>
		`;
  }
}

export default PurchaseSection;
