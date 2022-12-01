import Subject from './utils/Subject.js';

export const subject = new Subject();

const template = `    
<div class="d-flex justify-center mt-5">
	<div class="w-100" id="target">
		<lotto-header></lotto-header>
		<purchase-price></purchase-price>
		<purchase-tickets> </purchase-tickets>
		<winning-number></winning-number>
		<winning-result></winning-result>
	</div>
	</div>
</div>
`;

document.querySelector('#app').insertAdjacentHTML('afterbegin', template);
