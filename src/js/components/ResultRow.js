import Component from '../core/Component.js'

export class ResultRow extends Component {
	constructor() {
		super()
	}

	template() {
		return /*html*/ `
      <tr class="text-center">
        <td class="p-3">3개</td>
        <td class="p-3">5,000</td>
        <td class="p-3">n개</td>
      </tr>
		`
	}
}
